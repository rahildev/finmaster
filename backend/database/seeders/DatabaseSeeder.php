<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\Course;
use App\Models\Faq;
use App\Models\HeroSection;
use App\Models\SiteSetting;
use App\Models\TeacherInfo;
use App\Models\Video;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Finmaster Academy - Test məlumatları ilə database-i doldurur
     */
    public function run(): void
    {
        // Site Settings
        $this->seedSiteSettings();

        // Hero Sections
        $this->seedHeroSections();

        // Teacher Info
        $this->seedTeacherInfo();

        // Courses
        $courses = $this->seedCourses();

        // Videos
        $this->seedVideos($courses);

        // FAQs
        $this->seedFaqs();

        // Contacts
        $this->seedContacts();

        echo "✅ Database seeding tamamlandı!\n";
    }

    private function seedSiteSettings(): void
    {
        SiteSetting::create([
            'key' => 'site_name',
            'value' => 'Finmaster Academy',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'site_description',
            'value' => 'Mühasibatlıq və maliyyə tədrisi üzrə peşəkar təhsil platforması',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'logo_url',
            'value' => '/storage/brand/finmaster-logo.png',
            'type' => 'image',
        ]);

        SiteSetting::create([
            'key' => 'favicon_url',
            'value' => '/storage/brand/finmaster-icon.png',
            'type' => 'image',
        ]);

        SiteSetting::create([
            'key' => 'primary_color',
            'value' => '#0A4D2C',
            'type' => 'text',
        ]);

        SiteSetting::create([
            'key' => 'accent_color',
            'value' => '#6AB04E',
            'type' => 'text',
        ]);
    }

    private function seedHeroSections(): void
    {
        HeroSection::create([
            'title' => 'Mühasibatlıq və Maliyyə Təhsili',
            'subtitle' => 'Peşəkar mühasib olmaq üçün lazım olan bütün biliklər bir platformada',
            'btn_text' => 'Kurslara Bax',
            'btn_link' => '#courses',
            'sort_order' => 1,
            'is_active' => true,
        ]);
    }

    private function seedTeacherInfo(): void
    {
        TeacherInfo::create([
            'name' => 'Nigar Əliyeva',
            'title' => 'Baş Müəllim və Mühasib-Auditor',
            'bio' => 'Mühasibatlıq sahəsində 15+ illik təcrübə. ACCA sertifikatlı mühasib və auditor.',
            'experience' => '15+ il mühasibatlıq və audit təcrübəsi. Beynəlxalq şirkətlərdə maliyyə direktoru vəzifələrində çalışıb.',
            'achievements' => 'ACCA sertifikatı, 500+ tələbə hazırladı, 20+ şirkətə audit xidməti göstərdi',
        ]);
    }

    private function seedCourses(): array
    {
        $course1 = Course::create([
            'name' => 'Mühasibatlığa Giriş',
            'description' => 'Mühasibatlığın əsas prinsipləri və fundamental konsepsiyaları. Başlanğıc səviyyə üçün ideal.',
            'duration' => '8 həftə',
            'price' => 299.00,
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $course2 = Course::create([
            'name' => 'İlkin Mühasibat Uçotu',
            'description' => 'Debet-kredit qaydası, jurnal yazıları, balanş tərtibatı və maliyyə hesabatları.',
            'duration' => '12 həftə',
            'price' => 499.00,
            'sort_order' => 2,
            'is_active' => true,
        ]);

        $course3 = Course::create([
            'name' => 'Vergi Mühasibatı',
            'description' => 'Azərbaycanda vergi sistemi, ƏDV, gəlir vergisi və digər vergilərin hesablanması.',
            'duration' => '10 həftə',
            'price' => 599.00,
            'sort_order' => 3,
            'is_active' => true,
        ]);

        $course4 = Course::create([
            'name' => '1C: Müəssisə Proqramı',
            'description' => '1C proqramında mühasibat uçotu, hesabatların hazırlanması və avtomatlaşdırma.',
            'duration' => '6 həftə',
            'price' => 399.00,
            'sort_order' => 4,
            'is_active' => true,
        ]);

        return [$course1, $course2, $course3, $course4];
    }

    private function seedVideos(array $courses): void
    {
        Video::create([
            'title' => 'Mühasibatlıq nədir?',
            'description' => 'Mühasibatlığın əsas anlayışları və vacibliyi haqqında giriş videosu.',
            'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            'course_id' => $courses[0]->id,
            'sort_order' => 1,
            'is_active' => true,
        ]);

        Video::create([
            'title' => 'Debet və Kredit anlayışları',
            'description' => 'Mühasibatlıqda debet və kredit qaydalarının izahı.',
            'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            'course_id' => $courses[1]->id,
            'sort_order' => 2,
            'is_active' => true,
        ]);

        Video::create([
            'title' => 'ƏDV hesablanması',
            'description' => 'Azərbaycanda ƏDV vergisinin hesablanması və ödənilməsi.',
            'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            'course_id' => $courses[2]->id,
            'sort_order' => 3,
            'is_active' => true,
        ]);

        Video::create([
            'title' => '1C proqramına giriş',
            'description' => '1C proqramının interfeysi və əsas funksiyaları.',
            'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            'course_id' => $courses[3]->id,
            'sort_order' => 4,
            'is_active' => true,
        ]);
    }

    private function seedFaqs(): void
    {
        Faq::create([
            'question' => 'Kurslara qeydiyyat necə həyata keçirilir?',
            'answer' => 'Kurslara qeydiyyat üçün bizimlə əlaqə saxlayın. WhatsApp və ya telefon vasitəsilə qeydiyyatınızı tamamlaya bilərsiniz.',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        Faq::create([
            'question' => 'Dərslərin formatı necədir?',
            'answer' => 'Dərslər həm onlayn, həm də oflayn formatda təqdim olunur. Onlayn dərslər canlı və ya yazılmış video formatında ola bilər.',
            'sort_order' => 2,
            'is_active' => true,
        ]);

        Faq::create([
            'question' => 'Kursu bitirdikdən sonra sertifikat veriləcəkmi?',
            'answer' => 'Bəli, kursu uğurla başa vuran hər bir iştirakçıya sertifikat təqdim olunur.',
            'sort_order' => 3,
            'is_active' => true,
        ]);

        Faq::create([
            'question' => 'Ödəniş üsulları hansılardır?',
            'answer' => 'Ödəniş bank köçürməsi, nağd və ya onlayn ödəniş sistemi vasitəsilə həyata keçirilə bilər.',
            'sort_order' => 4,
            'is_active' => true,
        ]);

        Faq::create([
            'question' => 'Kurslar başlanğıc səviyyədən başlayırmı?',
            'answer' => 'Bəli, bizim kurslarımız başlanğıc səviyyədən başlayır və tədricən daha mürəkkəb mövzulara keçid edir.',
            'sort_order' => 5,
            'is_active' => true,
        ]);
    }

    private function seedContacts(): void
    {
        Contact::create([
            'type' => 'phone',
            'label' => 'Telefon',
            'value' => '+994 50 123 45 67',
            'icon' => 'phone',
            'sort_order' => 1,
        ]);

        Contact::create([
            'type' => 'email',
            'label' => 'Email',
            'value' => 'info@finmaster.academy',
            'icon' => 'envelope',
            'sort_order' => 2,
        ]);

        Contact::create([
            'type' => 'whatsapp',
            'label' => 'WhatsApp',
            'value' => '+994 50 123 45 67',
            'icon' => 'whatsapp',
            'sort_order' => 3,
        ]);

        Contact::create([
            'type' => 'instagram',
            'label' => 'Instagram',
            'value' => '@finmaster.academy',
            'icon' => 'instagram',
            'sort_order' => 4,
        ]);
    }
}
