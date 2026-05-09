<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class FaqController extends Controller
{
    /**
     * Bütün FAQ-ları göstər
     */
    public function index(): JsonResponse
    {
        $faqs = Faq::orderBy('sort_order')->get();
        return FaqResource::collection($faqs);
    }

    /**
     * Yeni FAQ yarat
     */
    public function store(Request $request): JsonResponse
    {
        Cache::forget('landing_page_data');
        $validator = Validator::make($request->all(), [
            'question' => 'required|string|max:255',
            'question_en' => 'nullable|string|max:255',
            'answer' => 'required|string',
            'answer_en' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $faq = Faq::create($validator->validated());

        return (new FaqResource($faq))->response()->setStatusCode(201);
    }

    /**
     * Tək FAQ-ı göstər
     */
    public function show(string $id): JsonResponse
    {
        $faq = Faq::findOrFail($id);
        return new FaqResource($faq);
    }

    /**
     * FAQ-ı yenilə
     */
    public function update(Request $request, string $id): JsonResponse
    {
        Cache::forget('landing_page_data');
        $faq = Faq::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'question' => 'sometimes|string|max:255',
            'question_en' => 'nullable|string|max:255',
            'answer' => 'sometimes|string',
            'answer_en' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $faq->update($validator->validated());

        return new FaqResource($faq);
    }

    /**
     * FAQ-ı sil
     */
    public function destroy(string $id): JsonResponse
    {
        Cache::forget('landing_page_data');
        $faq = Faq::findOrFail($id);
        $faq->delete();

        return response()->json(['message' => 'FAQ silindi'], 200);
    }
}
