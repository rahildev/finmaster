<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('faqs')->truncate();

        $faqs = [
            [
                'question'    => 'Finmaster Akademiyasının fəaliyyəti istiqaməti nədir?',
                'question_en' => 'What is the direction of Finmaster Academy\'s activity?',
                'answer'      => 'Finmaster Akademiyası mühasibat uçotu və maliyyə sahəsində praktiki və sistemli təhsil təqdim edən akademik platformadır.',
                'answer_en'   => 'Finmaster Academy is an academic platform providing practical and systematic education in the field of accounting and finance.',
            ],
            [
                'question'    => 'Finmaster Akademiyasını fərqli edən nədir?',
                'question_en' => 'What makes Finmaster Academy different?',
                'answer'      => 'Akademiya nəzəriyyəni praktik təcrübə ilə birləşdirərək real iş mühitinə uyğun təhsil modeli təqdim edir.',
                'answer_en'   => 'The Academy combines theory with practical experience to offer an educational model tailored to the real work environment.',
            ],
            [
                'question'    => 'Akademiyaya qeydiyyat necə aparılır?',
                'question_en' => 'How is registration at the Academy carried out?',
                'answer'      => 'Qeydiyyat prosesi sayt üzərindən müvafiq blank doldurulmaqla və ya lazımı sənədlərin fiziki təqdim olunması ilə başlayır. Akademiyanın təlim qaydaları ilə tam tanış olduqdan sonra müvafiq müqavilənin imzalanması ilə tamamlanır.',
                'answer_en'   => 'The registration process begins by filling out the relevant form on the website or by physically submitting the required documents. It is completed by signing the appropriate agreement after becoming fully acquainted with the Academy\'s training rules.',
            ],
            [
                'question'    => 'Təlimlər kimlər üçün uyğundur?',
                'question_en' => 'Who are the trainings suitable for?',
                'answer'      => 'Başlanğıc səviyyədən peşəkar inkişaf mərhələsinə qədər mühasibat uçotunu öyrənmək istəyən hər kəs üçün uyğundur.',
                'answer_en'   => 'Suitable for anyone who wants to learn accounting, from beginner level to the stage of professional development.',
            ],
            [
                'question'    => 'Təlimlər praktik yönümlüdür?',
                'question_en' => 'Are the trainings practically oriented?',
                'answer'      => 'Bəli. Tədris prosesi real sənədlər, praktik nümunələr və iş həyatı üzərindən qurulmaqdadır.',
                'answer_en'   => 'Yes. The teaching process is built on real documents, practical examples and work life.',
            ],
            [
                'question'    => 'Dərslər hansı formatda keçirilir?',
                'question_en' => 'In what format are the lessons held?',
                'answer'      => 'Dərslər əyani formatda keçirilir və eyni zamanda onlayn qoşularaq iştirak etmək mümkündür.',
                'answer_en'   => 'Lessons are held in face-to-face format and it is also possible to participate by joining online.',
            ],
            [
                'question'    => 'Təlimlərin müddəti nə qədərdir?',
                'question_en' => 'What is the duration of the trainings?',
                'answer'      => 'Bu müddət Akademiyanın təqdim etdiyi təhsil proqramının növündən asılı olaraq dəyişir. Ətraflı məlumat Akademiyanın saytında, proqramlar bölməsində təqdim olunmaqdadır.',
                'answer_en'   => 'This duration varies depending on the type of educational program offered by the Academy. Detailed information is available on the Academy\'s website in the programs section.',
            ],
            [
                'question'    => 'Təlimlərdə mentor dəstəyi varmı?',
                'question_en' => 'Is there mentor support in the trainings?',
                'answer'      => 'Bəli. Tələbələr təlim müddətində keçirilən dərslərin mövzularına aid suallarını yönləndirə və müvafiq dəstəyi ala bilərlər.',
                'answer_en'   => 'Yes. Students can direct their questions related to the topics of lessons held during the training period and receive the relevant support.',
            ],
            [
                'question'    => 'Təlim sonunda tələbə sertifikat ilə təmin olunurmu?',
                'question_en' => 'Is the student provided with a certificate upon completion of training?',
                'answer'      => 'Bəli. Proqramın sonunda yoxlama imtahanlarının toplam nəticəsi, minimal qiymətləndirmə balından yuxarı olan hər bir iştirakçıya, toplanmış bal üzrə müvafiq olaraq, Finmaster Akademiyasının intervallaşdırılmış dərəcə sertifikatı təqdim olunur.',
                'answer_en'   => 'Yes. At the end of the program, every participant whose total result in the assessment exams is above the minimum evaluation score is awarded Finmaster Academy\'s graded degree certificate, corresponding to their accumulated score.',
            ],
            [
                'question'    => 'Sertifikatın doğruluğu necə müəyyən olunur?',
                'question_en' => 'How is the authenticity of the certificate determined?',
                'answer'      => 'Hər bir sertifikat xüsusi İdentifikasiya (İD) kodu və QR kod ilə təmin olunmuşdur və istər saytın müvafiq bölməsində İD daxil etməklə, istərsə də QR kodu mobil cihaz ilə skan edərək doğrulama mümkündür.',
                'answer_en'   => 'Each certificate is provided with a unique Identification (ID) code and QR code, and verification is possible either by entering the ID in the relevant section of the website or by scanning the QR code with a mobile device.',
            ],
        ];

        foreach ($faqs as $i => $data) {
            DB::table('faqs')->insert([
                'question'    => $data['question'],
                'question_en' => $data['question_en'],
                'answer'      => $data['answer'],
                'answer_en'   => $data['answer_en'],
                'sort_order'  => $i + 1,
                'is_active'   => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
        }
    }

    public function down(): void
    {
        DB::table('faqs')->truncate();
    }
};
