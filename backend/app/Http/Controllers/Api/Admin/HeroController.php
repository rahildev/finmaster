<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class HeroController extends Controller
{
    use HandlesImageUpload;

    /**
     * Bütün hero seksiyalarını göstər
     */
    public function index(): JsonResponse
    {
        $heroes = HeroSection::orderBy('sort_order')->get();
        return response()->json($heroes);
    }

    /**
     * Yeni hero seksiyası yarat
     */
    public function store(Request $request): JsonResponse
    {
        Cache::forget('landing_page_data');
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string',
            'subtitle_en' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'image_mobile' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'btn_text' => 'nullable|string|max:255',
            'btn_text_en' => 'nullable|string|max:255',
            'btn_link' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('image')) {
            $data['image_url'] = $this->uploadImage($request->file('image'), 'hero');
            unset($data['image']);
        }

        if ($request->hasFile('image_mobile')) {
            $data['image_url_mobile'] = $this->uploadImage($request->file('image_mobile'), 'hero');
            unset($data['image_mobile']);
        }

        $hero = HeroSection::create($data);

        return response()->json($hero, 201);
    }

    /**
     * Tək hero seksiyasını göstər
     */
    public function show(string $id): JsonResponse
    {
        $hero = HeroSection::findOrFail($id);
        return response()->json($hero);
    }

    /**
     * Hero seksiyasını yenilə
     */
    public function update(Request $request, string $id): JsonResponse
    {
        Cache::forget('landing_page_data');
        $hero = HeroSection::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string',
            'subtitle_en' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'image_mobile' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'btn_text' => 'nullable|string|max:255',
            'btn_text_en' => 'nullable|string|max:255',
            'btn_link' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('image')) {
            $this->deleteImage($hero->image_url);
            $data['image_url'] = $this->uploadImage($request->file('image'), 'hero');
            unset($data['image']);
        } elseif ($request->has('delete_image') && $request->input('delete_image') === '1') {
            $this->deleteImage($hero->image_url);
            $data['image_url'] = null;
        }

        if ($request->hasFile('image_mobile')) {
            $this->deleteImage($hero->image_url_mobile);
            $data['image_url_mobile'] = $this->uploadImage($request->file('image_mobile'), 'hero');
            unset($data['image_mobile']);
        } elseif ($request->has('delete_image_mobile') && $request->input('delete_image_mobile') === '1') {
            $this->deleteImage($hero->image_url_mobile);
            $data['image_url_mobile'] = null;
        }

        $hero->update($data);

        return response()->json($hero);
    }

    /**
     * Hero seksiyasını sil
     */
    public function destroy(string $id): JsonResponse
    {
        Cache::forget('landing_page_data');
        $hero = HeroSection::findOrFail($id);
        $this->deleteImage($hero->image_url);
        $this->deleteImage($hero->image_url_mobile);
        $hero->delete();

        return response()->json(['message' => 'Hero seksiyası silindi'], 200);
    }
}
