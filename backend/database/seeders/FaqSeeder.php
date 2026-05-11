<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        Faq::truncate();

        $faqs = [
            [
                'question'    => 'Finmaster Academy nədir?',
                'question_en' => 'What is Finmaster Academy?',
                'answer'      => 'Finmaster Academy mühasibat və maliyyə sahəsində praktik və sistemli təhsil təqdim edən peşəkar bir akademik platformadır. Məqsədimiz sizə real iş həyatında nəticə verən bilik və bacarıqlar qazandırmaqdır.',
                'answer_en'   => 'Finmaster Academy is a professional academic platform providing practical and systematic education in accounting and finance. Our goal is to equip you with knowledge and skills that yield results in real professional life.',
            ],
            [
                'question'    => 'Təlimlər kimlər üçün uyğundur?',
                'question_en' => 'Who are the trainings suitable for?',
                'answer'      => 'Təlimlər mühasibatlığa yeni başlayanlar, sahəni dəyişmək istəyən mütəxəssislər, öz biliklərini yeniləmək istəyən fəaliyyətdə olan mühasiblər və mühasibatlığı peşə kimi seçmək istəyən gənclər üçün uyğundur.',
                'answer_en'   => 'The trainings are suitable for beginners in accounting, professionals looking to change fields, active accountants wishing to update their knowledge, and young people who want to choose accounting as a profession.',
            ],
            [
                'question'    => '"33 Addımda Mühasibat" proqramı nədir?',
                'question_en' => 'What is the "33 Steps to Accounting" program?',
                'answer'      => '"33 Addımda Mühasibat" — mühasibatlığın əsaslarından mürəkkəb maliyyə hesabatlarına qədər addım-addım keçid etməyə imkan verən strukturlu tədris proqramıdır. 33 modul ərzində siz nəzəriyyəni real sənədlər üzərindən praktik şəkildə öyrənirsiniz.',
                'answer_en'   => '"33 Steps to Accounting" is a structured curriculum that guides you step-by-step from the basics of accounting to complex financial statements. Across 33 modules, you learn theory through practical work on real documents.',
            ],
            [
                'question'    => 'Dərslər online keçirilir?',
                'question_en' => 'Are lessons held online?',
                'answer'      => 'Bəli, bütün dərslər tam online formatda keçirilir. Siz istənilən yerdən, istənilən vaxt əlverişli olan cihazınızdan dərslərə qoşula bilərsiniz.',
                'answer_en'   => 'Yes, all lessons are held in a fully online format. You can join from anywhere, at any time, using any device.',
            ],
            [
                'question'    => 'Təlimlər praktik yönümlüdür?',
                'question_en' => 'Are the trainings practically oriented?',
                'answer'      => 'Bəli, proqramımız 70% praktika, 30% nəzəriyyə prinsipinə əsaslanır. Hər mövzu real müəssisə sənədləri, canlı nümunələr və tapşırıqlar vasitəsilə öyrədilir.',
                'answer_en'   => 'Yes, our program is based on a 70% practice, 30% theory principle. Each topic is taught through real company documents, live examples, and exercises.',
            ],
            [
                'question'    => 'Təlim sonunda sertifikat verilir?',
                'question_en' => 'Is a certificate issued upon completion of training?',
                'answer'      => 'Bəli, proqramı uğurla tamamlayan hər iştirakçıya Finmaster Academy tərəfindən rəsmi sertifikat verilir. Sertifikat işə qəbul proseslərinə əhəmiyyətli dəstək olur.',
                'answer_en'   => 'Yes, every participant who successfully completes the program receives an official certificate from Finmaster Academy. The certificate provides significant support in hiring processes.',
            ],
            [
                'question'    => 'Sertifikat doğrulana bilir?',
                'question_en' => 'Can the certificate be verified?',
                'answer'      => 'Bəli, Finmaster Academy sertifikatları unikal ID kodu ilə təmin edilir. İşəgötürənlər bu kodu saytımız üzərindən yoxlayaraq sertifikatın həqiqiliyini təsdiq edə bilərlər.',
                'answer_en'   => 'Yes, Finmaster Academy certificates come with a unique ID code. Employers can verify the authenticity of the certificate by checking this code on our website.',
            ],
            [
                'question'    => 'Təlim müddəti nə qədərdir?',
                'question_en' => 'What is the duration of the training?',
                'answer'      => 'Proqramdan asılı olaraq təlim müddəti 1 aydan 4 aya qədər dəyişir. "33 Addımda Mühasibat" proqramı orta hesabla 3 ay ərzində tamamlanır.',
                'answer_en'   => 'Depending on the program, training duration ranges from 1 to 4 months. The "33 Steps to Accounting" program is completed in an average of 3 months.',
            ],
            [
                'question'    => 'Dərslərin videolarına sonradan baxmaq mümkündür?',
                'question_en' => 'Is it possible to watch lesson videos later?',
                'answer'      => 'Bəli, bütün dərs yazıları şəxsi kabinetinizə əlavə olunur. Proqram boyunca istənilən vaxt keçmiş dərslərə qayıda bilərsiniz.',
                'answer_en'   => 'Yes, all lesson recordings are added to your personal account. You can return to past lessons at any time throughout the program.',
            ],
            [
                'question'    => 'Təlimlərdə mentor dəstəyi varmı?',
                'question_en' => 'Is there mentor support in the trainings?',
                'answer'      => 'Bəli, hər iştirakçıya fərdi mentor dəstəyi təmin edilir. Suallarınızı istənilən vaxt mentora yönəldə, canlı seans ərzində müzakirə edə bilərsiniz.',
                'answer_en'   => 'Yes, individual mentor support is provided to each participant. You can forward your questions to a mentor at any time and discuss them during live sessions.',
            ],
            [
                'question'    => 'Qeydiyyat necə aparılır?',
                'question_en' => 'How is registration carried out?',
                'answer'      => 'Saytımızdakı əlaqə formasını doldurun və ya WhatsApp vasitəsilə bizimlə əlaqə saxlayın. Komandamız 24 saat ərzində sizinlə əlaqə quraraq qeydiyyat prosesini tamamlayacaq.',
                'answer_en'   => 'Fill out the contact form on our website or reach us via WhatsApp. Our team will contact you within 24 hours to complete the registration process.',
            ],
            [
                'question'    => 'Təlim ödənişi hissəli edilə bilər?',
                'question_en' => 'Can the training fee be paid in installments?',
                'answer'      => 'Bəli, rahat ödəniş seçimləri mövcuddur. Tam ödəniş endirimlə, 2 hissəli və ya 3 hissəli ödəniş variantlarından birini seçə bilərsiniz.',
                'answer_en'   => 'Yes, convenient payment options are available. You can choose from full payment with a discount, or 2 or 3 installment payment options.',
            ],
            [
                'question'    => 'Finmaster Academy-ni fərqli edən nədir?',
                'question_en' => 'What makes Finmaster Academy different?',
                'answer'      => 'Finmaster Academy-ni fərqli edən əsas amillər: real iş həyatına uyğun praktik tədris metodologiyası, peşəkar mentor dəstəyi, doğrulana bilən sertifikat proqramı və mühasibatlıq üzrə ixtisaslaşmış güclü icma.',
                'answer_en'   => 'The key factors that make Finmaster Academy different: practical teaching methodology aligned with real work life, professional mentor support, a verifiable certificate program, and a strong community specializing in accounting.',
            ],
        ];

        foreach ($faqs as $i => $data) {
            Faq::create([
                'question'    => $data['question'],
                'question_en' => $data['question_en'],
                'answer'      => $data['answer'],
                'answer_en'   => $data['answer_en'],
                'sort_order'  => $i + 1,
                'is_active'   => true,
            ]);
        }

        echo "✅ 13 FAQ əlavə edildi.\n";
    }
}
