<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Course;
use App\Models\Faq;
use App\Models\HeroSection;
use App\Models\SiteSetting;
use App\Models\TeacherInfo;
use App\Models\Video;
use Illuminate\Http\JsonResponse;

class LandingPageController extends Controller
{
    /**
     * Landing page məlumatlarını qaytarır
     * Bütün public məlumatlar bir sorğuda gəlir
     */
    public function index(): JsonResponse
    {
        $data = [
            'hero' => HeroSection::where('is_active', true)
                ->orderBy('sort_order')
                ->get(),

            'teacher' => TeacherInfo::first(),

            'courses' => Course::where('is_active', true)
                ->orderBy('sort_order')
                ->get(),

            'videos' => Video::where('is_active', true)
                ->orderBy('sort_order')
                ->with('course:id,name')
                ->get(),

            'faqs' => Faq::where('is_active', true)
                ->orderBy('sort_order')
                ->get(),

            'contacts' => Contact::orderBy('sort_order')->get(),

            'settings' => $this->formatSettings(),
        ];

        return response()->json($data);
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
