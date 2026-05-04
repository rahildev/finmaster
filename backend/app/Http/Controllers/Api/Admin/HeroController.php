<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string',
            'subtitle_en' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
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
        $hero = HeroSection::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string',
            'subtitle_en' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
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
        }

        $hero->update($data);

        return response()->json($hero);
    }

    /**
     * Hero seksiyasını sil
     */
    public function destroy(string $id): JsonResponse
    {
        $hero = HeroSection::findOrFail($id);
        $this->deleteImage($hero->image_url);
        $hero->delete();

        return response()->json(['message' => 'Hero seksiyası silindi'], 200);
    }
}
