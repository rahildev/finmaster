<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class VideoController extends Controller
{
    use HandlesImageUpload;

    /**
     * Bütün videoları göstər
     */
    public function index(): JsonResponse
    {
        $videos = Video::with('course:id,name')->orderBy('sort_order')->get();
        return VideoResource::collection($videos);
    }

    /**
     * Yeni video yarat
     */
    public function store(Request $request): JsonResponse
    {
        Cache::forget('landing_page_data');
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'video_url' => 'required|string|max:255',
            'video_type' => 'nullable|string|in:video,short',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'course_id' => 'nullable|exists:courses,id',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail_url'] = $this->uploadImage($request->file('thumbnail'), 'videos');
            unset($data['thumbnail']);
        }

        $video = Video::create($data);

        return (new VideoResource($video->load('course:id,name')))->response()->setStatusCode(201);
    }

    /**
     * Tək videonı göstər
     */
    public function show(string $id): JsonResponse
    {
        $video = Video::with('course:id,name')->findOrFail($id);
        return new VideoResource($video);
    }

    /**
     * Videonı yenilə
     */
    public function update(Request $request, string $id): JsonResponse
    {
        Cache::forget('landing_page_data');
        $video = Video::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_en' => 'nullable|string',
            'video_url' => 'sometimes|string|max:255',
            'video_type' => 'nullable|string|in:video,short',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'course_id' => 'nullable|exists:courses,id',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('thumbnail')) {
            $this->deleteImage($video->thumbnail_url);
            $data['thumbnail_url'] = $this->uploadImage($request->file('thumbnail'), 'videos');
            unset($data['thumbnail']);
        }

        $video->update($data);

        return new VideoResource($video->load('course:id,name'));
    }

    /**
     * Videonı sil
     */
    public function destroy(string $id): JsonResponse
    {
        Cache::forget('landing_page_data');
        $video = Video::findOrFail($id);
        $this->deleteImage($video->thumbnail_url);
        $video->delete();

        return response()->json(['message' => 'Video silindi'], 200);
    }
}
