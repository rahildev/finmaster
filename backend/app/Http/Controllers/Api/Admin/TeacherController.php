<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeacherInfo;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TeacherController extends Controller
{
    use HandlesImageUpload;

    /**
     * Müəllim məlumatını göstər (adətən 1 ədəd olur)
     */
    public function index(): JsonResponse
    {
        $teacher = TeacherInfo::first();
        return response()->json($teacher);
    }

    /**
     * Müəllim məlumatı yarat
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'experience' => 'nullable|string',
            'achievements' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('photo')) {
            $data['photo_url'] = $this->uploadImage($request->file('photo'), 'teacher');
            unset($data['photo']);
        }

        $teacher = TeacherInfo::create($data);

        return response()->json($teacher, 201);
    }

    /**
     * Tək müəllim məlumatını göstər
     */
    public function show(string $id): JsonResponse
    {
        $teacher = TeacherInfo::findOrFail($id);
        return response()->json($teacher);
    }

    /**
     * Müəllim məlumatını yenilə
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $teacher = TeacherInfo::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'title' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'experience' => 'nullable|string',
            'achievements' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('photo')) {
            $this->deleteImage($teacher->photo_url);
            $data['photo_url'] = $this->uploadImage($request->file('photo'), 'teacher');
            unset($data['photo']);
        }

        $teacher->update($data);

        return response()->json($teacher);
    }

    /**
     * Müəllim məlumatını sil
     */
    public function destroy(string $id): JsonResponse
    {
        $teacher = TeacherInfo::findOrFail($id);
        $this->deleteImage($teacher->photo_url);
        $teacher->delete();

        return response()->json(['message' => 'Müəllim məlumatı silindi'], 200);
    }
}
