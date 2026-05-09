<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = Cache::remember('admin_site_settings', 300, fn() => SiteSetting::all());
        return response()->json($settings);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'key'   => 'required|string|unique:site_settings,key',
            'value' => 'nullable|string',
            'type'  => 'nullable|string|in:text,image,json',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $setting = SiteSetting::create($validator->validated());
        Cache::forget('admin_site_settings');
        Cache::forget('landing_page_data');

        return response()->json($setting, 201);
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(SiteSetting::findOrFail($id));
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $setting = SiteSetting::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'key'   => 'sometimes|string|unique:site_settings,key,' . $id,
            'value' => 'nullable|string',
            'type'  => 'nullable|string|in:text,image,json',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $setting->update($validator->validated());
        Cache::forget('admin_site_settings');
        Cache::forget('landing_page_data');

        return response()->json($setting);
    }

    public function destroy(string $id): JsonResponse
    {
        SiteSetting::findOrFail($id)->delete();
        Cache::forget('admin_site_settings');
        Cache::forget('landing_page_data');

        return response()->json(['message' => 'Ayar silindi'], 200);
    }
}
