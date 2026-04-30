<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FaqController extends Controller
{
    /**
     * Bütün FAQ-ları göstər
     */
    public function index(): JsonResponse
    {
        $faqs = Faq::orderBy('sort_order')->get();
        return response()->json($faqs);
    }

    /**
     * Yeni FAQ yarat
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $faq = Faq::create($validator->validated());

        return response()->json($faq, 201);
    }

    /**
     * Tək FAQ-ı göstər
     */
    public function show(string $id): JsonResponse
    {
        $faq = Faq::findOrFail($id);
        return response()->json($faq);
    }

    /**
     * FAQ-ı yenilə
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $faq = Faq::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'question' => 'sometimes|string|max:255',
            'answer' => 'sometimes|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $faq->update($validator->validated());

        return response()->json($faq);
    }

    /**
     * FAQ-ı sil
     */
    public function destroy(string $id): JsonResponse
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();

        return response()->json(['message' => 'FAQ silindi'], 200);
    }
}
