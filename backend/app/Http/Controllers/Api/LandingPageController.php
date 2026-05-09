<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Course;
use App\Models\Faq;
use App\Models\HeroSection;
use App\Models\SectionSetting;
use App\Models\SiteSetting;
use App\Models\TeacherInfo;
use App\Models\Video;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class LandingPageController extends Controller
{
    /**
     * Landing page məlumatlarını qaytarır
     * Bütün public məlumatlar bir sorğuda gəlir
     */
    public function index(): JsonResponse
    {
        $data = Cache::remember('landing_page_data', 300, function () {
            // Get section visibility settings
            $sectionSettings = SectionSetting::pluck('is_visible', 'section_key')->toArray();

            return [
                'hero' => $this->getSectionData('hero', $sectionSettings, function() {
                    return HeroSection::where('is_active', true)
                        ->orderBy('sort_order')
                        ->get();
                }),

                'teacher' => $this->getSectionData('teacher', $sectionSettings, function() {
                    return TeacherInfo::orderBy('created_at')->get();
                }),

                'courses' => $this->getSectionData('courses', $sectionSettings, function() {
                    return Course::where('is_active', true)
                        ->orderBy('sort_order')
                        ->get();
                }),

                'videos' => $this->getSectionData('videos', $sectionSettings, function() {
                    return Video::where('is_active', true)
                        ->orderBy('sort_order')
                        ->with('course:id,name')
                        ->get();
                }),

                'faqs' => $this->getSectionData('faq', $sectionSettings, function() {
                    return Faq::where('is_active', true)
                        ->orderBy('sort_order')
                        ->get();
                }),

                'contacts' => $this->getSectionData('contact', $sectionSettings, function() {
                    return Contact::orderBy('sort_order')->get();
                }),

                'settings' => $this->formatSettings(),
                'section_visibility' => $sectionSettings,
            ];
        });

        return response()->json($data);
    }

    /**
     * Get section data only if section is visible
     */
    private function getSectionData(string $sectionKey, array $sectionSettings, callable $callback)
    {
        // If section is not visible, return appropriate empty data
        if (!isset($sectionSettings[$sectionKey]) || !$sectionSettings[$sectionKey]) {
            return [];
        }

        return $callback();
    }

    /**
     * Site settings-i key-value formatında qaytarır
     */
    private function formatSettings(): array
    {
        $settings = SiteSetting::all();
        $formatted = [];

        foreach ($settings as $setting) {
            $formatted[$setting->key] = $setting->value;
        }

        return $formatted;
    }
}
