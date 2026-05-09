<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SectionSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SectionSettingController extends Controller
{
    public function index(): JsonResponse
    {
        $sections = Cache::remember('admin_section_settings', 300, fn() =>
            SectionSetting::orderBy('sort_order')->get()
        );
        return response()->json($sections);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $section = SectionSetting::findOrFail($id);

        $section->update($request->validate([
            'is_visible' => 'boolean',
            'sort_order' => 'integer',
        ]));

        Cache::forget('admin_section_settings');
        Cache::forget('landing_page_data');

        return response()->json($section);
    }

    public function toggleVisibility(Request $request, string $id): JsonResponse
    {
        $section = SectionSetting::findOrFail($id);
        $section->is_visible = !$section->is_visible;
        $section->save();

        Cache::forget('admin_section_settings');
        Cache::forget('landing_page_data');

        return response()->json([
            'message' => 'Section visibility updated',
            'section' => $section,
        ]);
    }
}
