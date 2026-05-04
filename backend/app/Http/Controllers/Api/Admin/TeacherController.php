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
     * Bütün müəllimləri göstər
     */
    public function index(): JsonResponse
    {
        $teachers = TeacherInfo::orderBy('created_at', 'desc')->get();
        return response()->json($teachers);
    }

    /**
     * Müəllim məlumatı yarat
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'bio_en' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'experience' => 'nullable|string',
            'experience_en' => 'nullable|string',
            'achievements' => 'nullable|string',
            'achievements_en' => 'nullable|string',
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
            'title_en' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'bio_en' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'experience' => 'nullable|string',
            'experience_en' => 'nullable|string',
            'achievements' => 'nullable|string',
            'achievements_en' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('photo')) {
            $this->deleteImage($teacher->photo_url);
            $data['photo_url'] = $this->uploadImage($request->file('photo'), 'teacher');
            unset($data['photo']);
        } elseif ($request->has('delete_photo') && $request->input('delete_photo') === '1') {
            // Şəkili sil
            $this->deleteImage($teacher->photo_url);
            $data['photo_url'] = null;
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
