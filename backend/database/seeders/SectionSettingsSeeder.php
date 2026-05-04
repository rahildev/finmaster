<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SectionSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = [
            ['section_key' => 'hero', 'section_name' => 'Hero Section', 'is_visible' => true, 'sort_order' => 1],
            ['section_key' => 'teacher', 'section_name' => 'Müəllim', 'is_visible' => true, 'sort_order' => 2],
            ['section_key' => 'courses', 'section_name' => 'Kurslar', 'is_visible' => true, 'sort_order' => 3],
            ['section_key' => 'videos', 'section_name' => 'Videolar', 'is_visible' => true, 'sort_order' => 4],
            ['section_key' => 'faq', 'section_name' => 'FAQ', 'is_visible' => true, 'sort_order' => 5],
            ['section_key' => 'contact', 'section_name' => 'Əlaqə', 'is_visible' => true, 'sort_order' => 6],
        ];

        foreach ($sections as $section) {
            DB::table('section_settings')->updateOrInsert(
                ['section_key' => $section['section_key']],
                $section
            );
        }
    }
}
