<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    use HandlesImageUpload;

    /**
     * Bütün kursları göstər
     */
    public function index(): JsonResponse
    {
        $courses = Course::orderBy('sort_order')->get();
        return response()->json($courses);
    }

    /**
     * Yeni kurs yarat
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('image')) {
            $data['image_url'] = $this->uploadImage($request->file('image'), 'courses');
            unset($data['image']);
        }

        $course = Course::create($data);

        return response()->json($course, 201);
    }

    /**
     * Tək kursu göstər
     */
    public function show(string $id): JsonResponse
    {
        $course = Course::with('videos')->findOrFail($id);
        return response()->json($course);
    }

    /**
     * Kursu yenilə
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $course = Course::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('image')) {
            $this->deleteImage($course->image_url);
            $data['image_url'] = $this->uploadImage($request->file('image'), 'courses');
            unset($data['image']);
        }

        $course->update($data);

        return response()->json($course);
    }

    /**
     * Kursu sil
     */
    public function destroy(string $id): JsonResponse
    {
        $course = Course::findOrFail($id);
        $this->deleteImage($course->image_url);
        $course->delete();

        return response()->json(['message' => 'Kurs silindi'], 200);
    }
}
