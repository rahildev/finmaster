<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserPermission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Bütün istifadəçiləri göstər (super admin üçün)
     */
    public function index(): JsonResponse
    {
        $users = User::with('permissions')
            ->where('role', '!=', 'super_admin') // Super admin-i gizlət
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'role' => $user->role,
                    'permissions' => $user->getPermissionNames(),
                    'created_at' => $user->created_at,
                ];
            });

        return response()->json($users);
    }

    /**
     * Yeni istifadəçi yarat
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:50|unique:users,username|alpha_dash',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        // Permissions əlavə et
        if ($request->has('permissions')) {
            foreach ($request->permissions as $permission) {
                UserPermission::create([
                    'user_id' => $user->id,
                    'permission' => $permission,
                ]);
            }
        }

        $user->load('permissions');
        $user->permissions_list = $user->getPermissionNames();

        return response()->json($user, 201);
    }

    /**
     * İstifadəçini göstər
     */
    public function show(string $id): JsonResponse
    {
        $user = User::with('permissions')->findOrFail($id);

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
            'permissions' => $user->getPermissionNames(),
        ]);
    }

    /**
     * İstifadəçini yenilə
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);

        // Super admin-i redaktə etməyə icazə vermə
        if ($user->isSuperAdmin()) {
            return response()->json(['message' => 'Super admin redaktə edilə bilməz'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'username' => 'sometimes|string|max:50|unique:users,username,' . $id . '|alpha_dash',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update basic info
        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('username')) {
            $user->username = $request->username;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        // Update permissions
        if ($request->has('permissions')) {
            // Köhnə permissions-ları sil
            UserPermission::where('user_id', $user->id)->delete();

            // Yeni permissions əlavə et
            foreach ($request->permissions as $permission) {
                UserPermission::create([
                    'user_id' => $user->id,
                    'permission' => $permission,
                ]);
            }
        }

        $user->load('permissions');
        $user->permissions_list = $user->getPermissionNames();

        return response()->json($user);
    }

    /**
     * İstifadəçini sil
     */
    public function destroy(string $id): JsonResponse
    {
        $user = User::findOrFail($id);

        // Super admin-i silməyə icazə vermə
        if ($user->isSuperAdmin()) {
            return response()->json(['message' => 'Super admin silinə bilməz'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'İstifadəçi silindi'], 200);
    }

    /**
     * Mövcud permissions siyahısı
     */
    public function availablePermissions(): JsonResponse
    {
        return response()->json([
            [
                'key' => 'manage_hero',
                'label' => 'Hero Section',
                'icon' => '🎯',
            ],
            [
                'key' => 'manage_teachers',
                'label' => 'Müəllimlər',
                'icon' => '👨‍🏫',
            ],
            [
                'key' => 'manage_courses',
                'label' => 'Kurslar',
                'icon' => '📚',
            ],
            [
                'key' => 'manage_videos',
                'label' => 'Videolar',
                'icon' => '🎥',
            ],
            [
                'key' => 'manage_faqs',
                'label' => 'FAQ',
                'icon' => '❓',
            ],
            [
                'key' => 'manage_contacts',
                'label' => 'Əlaqə',
                'icon' => '📞',
            ],
        ]);
    }
}
