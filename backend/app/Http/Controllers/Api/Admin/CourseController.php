<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
        return CourseResource::collection($courses);
    }

    /**
     * Yeni kurs yarat
     */
    public function store(Request $request): JsonResponse
    {
        Cache::forget('landing_page_data');
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'heading' => 'nullable|string|max:500',
            'heading_en' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'duration' => 'nullable|string|max:255',
            'duration_en' => 'nullable|string|max:255',
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

        if ($request->has('page_content')) {
            $data['page_content'] = json_decode($request->input('page_content'), true);
        }
        if ($request->has('page_content_en')) {
            $data['page_content_en'] = json_decode($request->input('page_content_en'), true);
        }

        $course = Course::create($data);

        return (new CourseResource($course))->response()->setStatusCode(201);
    }

    /**
     * Tək kursu göstər
     */
    public function show(string $id): JsonResponse
    {
        $course = Course::with('videos')->findOrFail($id);
        return new CourseResource($course);
    }

    /**
     * Kursu yenilə
     */
    public function update(Request $request, string $id): JsonResponse
    {
        Cache::forget('landing_page_data');
        $course = Course::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'name_en' => 'sometimes|string|max:255',
            'heading' => 'nullable|string|max:500',
            'heading_en' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'duration' => 'nullable|string|max:255',
            'duration_en' => 'nullable|string|max:255',
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
        } elseif ($request->has('delete_image') && $request->input('delete_image') === '1') {
            $this->deleteImage($course->image_url);
            $data['image_url'] = null;
        }

        if ($request->has('page_content')) {
            $data['page_content'] = json_decode($request->input('page_content'), true);
        }
        if ($request->has('page_content_en')) {
            $data['page_content_en'] = json_decode($request->input('page_content_en'), true);
        }

        $course->update($data);

        return new CourseResource($course);
    }

    /**
     * Kursu sil
     */
    public function destroy(string $id): JsonResponse
    {
        Cache::forget('landing_page_data');
        $course = Course::findOrFail($id);
        $this->deleteImage($course->image_url);
        $course->delete();

        return response()->json(['message' => 'Kurs silindi'], 200);
    }
}
