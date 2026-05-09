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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class LandingPageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $data = Cache::remember('landing_page_data', 300, function () {
            $sectionSettings = SectionSetting::select(['section_key', 'is_visible'])
                ->pluck('is_visible', 'section_key')
                ->toArray();

            return [
                'hero' => $this->getSectionData('hero', $sectionSettings, function () {
                    return HeroSection::select([
                        'id','title','title_en','subtitle','subtitle_en',
                        'image_url','btn_text','btn_text_en','btn_link','sort_order','is_active',
                    ])->where('is_active', true)->orderBy('sort_order')->get();
                }),

                'teacher' => $this->getSectionData('teacher', $sectionSettings, function () {
                    return TeacherInfo::select([
                        'id','name','title','title_en','bio','bio_en','photo_url',
                        'experience','experience_en','achievements','achievements_en',
                    ])->orderBy('created_at')->get();
                }),

                'courses' => $this->getSectionData('courses', $sectionSettings, function () {
                    return Course::select([
                        'id','name','name_en','heading','heading_en',
                        'description','description_en','duration','duration_en',
                        'price','image_url','sort_order','is_active','page_content','page_content_en',
                    ])->where('is_active', true)->orderBy('sort_order')->get();
                }),

                'videos' => $this->getSectionData('videos', $sectionSettings, function () {
                    return Video::select([
                        'id','title','title_en','description','description_en',
                        'video_url','video_type','thumbnail_url','sort_order','is_active','course_id',
                    ])->where('is_active', true)->orderBy('sort_order')->with('course:id,name,name_en')->get();
                }),

                'faqs' => $this->getSectionData('faq', $sectionSettings, function () {
                    return Faq::select([
                        'id','question','question_en','answer','answer_en','sort_order','is_active',
                    ])->where('is_active', true)->orderBy('sort_order')->get();
                }),

                'contacts' => $this->getSectionData('contact', $sectionSettings, function () {
                    return Contact::select([
                        'id','type','label','label_en','value','icon','sort_order',
                    ])->orderBy('sort_order')->get();
                }),

                'settings' => $this->formatSettings(),
                'section_visibility' => $sectionSettings,
            ];
        });

        $response = response()->json($data);
        $etag = md5($response->getContent());
        $response->setEtag($etag);
        $response->headers->set('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=30');
        $response->isNotModified($request);

        return $response;
    }

    private function getSectionData(string $sectionKey, array $sectionSettings, callable $callback)
    {
        if (!isset($sectionSettings[$sectionKey]) || !$sectionSettings[$sectionKey]) {
            return [];
        }
        return $callback();
    }

    private function formatSettings(): array
    {
        $settings = SiteSetting::select(['key', 'value'])->get();
        $formatted = [];
        foreach ($settings as $setting) {
            $formatted[$setting->key] = $setting->value;
        }
        return $formatted;
    }
}
