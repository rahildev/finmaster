<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SectionSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SectionSettingController extends Controller
{
    /**
     * Get all section settings
     */
    public function index(): JsonResponse
    {
        $sections = SectionSetting::orderBy('sort_order')->get();
        return response()->json($sections);
    }

    /**
     * Update section visibility
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $section = SectionSetting::findOrFail($id);

        $validated = $request->validate([
            'is_visible' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $section->update($validated);

        return response()->json($section);
    }

    /**
     * Toggle visibility for a section
     */
    public function toggleVisibility(Request $request, string $id): JsonResponse
    {
        $section = SectionSetting::findOrFail($id);
        $section->is_visible = !$section->is_visible;
        $section->save();

        return response()->json([
            'message' => 'Section visibility updated',
            'section' => $section,
        ]);
    }
}
