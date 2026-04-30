<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
    /**
     * Bütün ayarları göstər
     */
    public function index(): JsonResponse
    {
        $settings = SiteSetting::all();
        return response()->json($settings);
    }

    /**
     * Yeni ayar yarat
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'key' => 'required|string|unique:site_settings,key',
            'value' => 'nullable|string',
            'type' => 'nullable|string|in:text,image,json',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $setting = SiteSetting::create($validator->validated());

        return response()->json($setting, 201);
    }

    /**
     * Tək ayarı göstər
     */
    public function show(string $id): JsonResponse
    {
        $setting = SiteSetting::findOrFail($id);
        return response()->json($setting);
    }

    /**
     * Ayarı yenilə
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $setting = SiteSetting::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'key' => 'sometimes|string|unique:site_settings,key,' . $id,
            'value' => 'nullable|string',
            'type' => 'nullable|string|in:text,image,json',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $setting->update($validator->validated());

        return response()->json($setting);
    }

    /**
     * Ayarı sil
     */
    public function destroy(string $id): JsonResponse
    {
        $setting = SiteSetting::findOrFail($id);
        $setting->delete();

        return response()->json(['message' => 'Ayar silindi'], 200);
    }
}
