'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function TermsPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-background min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">

        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {language === 'en' ? 'Back to Home' : 'Ana Səhifə'}
        </Link>

        {language === 'en' ? (
          <div className="prose max-w-none">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Legal</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use</h1>
            <p className="text-sm text-gray-400 mb-10">Last updated: May 2026</p>

            <p className="text-gray-600 leading-relaxed mb-10">
              By accessing the Academy platform and using its services, you are deemed to have accepted the terms of use stated below.
              Please read these terms carefully before using the platform.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. General Rules</h2>
              <p className="text-gray-600 leading-relaxed">
                The Academy is an educational platform created to provide systematic, modern, and professional learning experience in the fields of
                accounting and finance. All users must comply with ethical and legal rules when using the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Registration and Account Security</h2>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>The user is responsible for ensuring the accuracy and currency of the information provided.</li>
                <li>The security of account credentials is the user's responsibility.</li>
                <li>Sharing your account with third parties is prohibited.</li>
                <li>If suspicious activity is detected, the platform may temporarily or permanently restrict the account.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Educational Materials and Copyrights</h2>
              <p className="text-gray-600 leading-relaxed mb-3">All content published on the platform, including:</p>
              <ul className="text-gray-600 space-y-1 list-disc list-inside mb-3">
                <li>Video lessons</li>
                <li>PDF materials</li>
                <li>Certificate designs</li>
                <li>Texts</li>
                <li>Visual elements</li>
                <li>Logos and brand materials</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                belongs to Finmaster Academy and is protected by copyright.
                Unauthorized copying, sharing, and commercial use is prohibited.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Certification Rules</h2>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Certificates are awarded only to participants whose total score on verification exams exceeds the minimum assessment threshold.</li>
                <li>
                  Each certificate is provided with a unique ID code and QR code. Verification is possible either by entering the ID in the
                  relevant section of the website or by scanning the QR code with a mobile device.
                </li>
                <li>Use of forged or altered certificates creates legal liability.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Payment and Refund</h2>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Payments for educational programs are considered active after registration confirmation.</li>
                <li>Finmaster Academy reserves the right to issue refunds in special circumstances.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Platform Usage Restrictions</h2>
              <p className="text-gray-600 leading-relaxed mb-3">The following are prohibited:</p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Interfering with the platform system;</li>
                <li>Attempting to obtain other users' data;</li>
                <li>Distributing educational materials without authorization;</li>
                <li>Taking actions that harm the operation of the platform.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                Although the Academy strives for uninterrupted operation of the platform, it does not bear full responsibility for
                delays arising from technical problems or third-party services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Right to Modify</h2>
              <p className="text-gray-600 leading-relaxed">
                The Academy reserves the right to update and modify the terms of use without prior notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">9. Contact</h2>
              <p className="text-gray-600 leading-relaxed mb-2">For questions regarding the terms of use, you can contact us:</p>
              <p className="text-gray-700 font-semibold">Finmaster Academy</p>
              <p className="text-gray-600">
                <a href="mailto:info@finmasteracademy.az" className="text-[#0A4D2C] hover:underline">info@finmasteracademy.az</a>
              </p>
              <p className="text-gray-600">+994 10 226 00 21</p>
            </section>
          </div>
        ) : (
          <div className="prose max-w-none">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Hüquqi</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">İstifadə Şərtləri</h1>
            <p className="text-sm text-gray-400 mb-10">Son yenilənmə: May 2026</p>

            <p className="text-gray-600 leading-relaxed mb-10">
              Akademiya platformasına daxil olmaqla və xidmətlərdən istifadə etməklə aşağıda qeyd olunan istifadə şərtlərini qəbul etmiş
              sayılırsınız. Zəhmət olmasa platformadan istifadə etməzdən əvvəl bu şərtləri diqqətlə oxuyun.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Ümumi Qaydalar</h2>
              <p className="text-gray-600 leading-relaxed">
                Akademiya mühasibat uçotu və maliyyə sahələrində sistemli, müasir və peşəkar öyrənmə təcrübəsini təmin etmək üçün yaradılmış
                təhsil platformasıdır. Platformadan istifadə zamanı bütün istifadəçilər etik və qanuni qaydalara riayət etməlidirlər.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Qeydiyyat və Hesab Təhlükəsizliyi</h2>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>İstifadəçi təqdim etdiyi məlumatların düzgün və aktual olmasına məsuliyyət daşıyır.</li>
                <li>Hesab məlumatlarının təhlükəsizliyi istifadəçinin məsuliyyətindədir.</li>
                <li>Hesabın üçüncü şəxslərlə paylaşılması qadağandır.</li>
                <li>Şübhəli fəaliyyət aşkarlandığı halda platforma hesabı müvəqqəti və ya daimi məhdudlaşdıra bilər.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Təhsil Materialları və Müəllif Hüquqları</h2>
              <p className="text-gray-600 leading-relaxed mb-3">Platformada yerləşdirilən bütün:</p>
              <ul className="text-gray-600 space-y-1 list-disc list-inside mb-3">
                <li>Video dərslər</li>
                <li>PDF materiallar</li>
                <li>Sertifikat dizaynları</li>
                <li>Mətnlər</li>
                <li>Vizual elementlər</li>
                <li>Loqolar və brend materialları</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Finmaster Akademiyasına məxsusdur və müəllif hüquqları ilə qorunur.
                İcazəsiz kopyalama, paylaşım və kommersiya məqsədli istifadə qadağandır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Sertifikatlaşdırma Qaydaları</h2>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Sertifikatlar yalnız yoxlama imtahanlarının toplam nəticəsi minimal qiymətləndirmə balından yuxarı olan iştirakçılara təqdim olunur.</li>
                <li>
                  Hər bir sertifikat xüsusi İdentifikasiya (İD) kodu və QR kod ilə təmin olunmuşdur və istər saytın müvafiq bölməsində
                  İD daxil etməklə, istərsə də QR kodu mobil cihaz ilə skan edərək doğrulama mümkündür.
                </li>
                <li>Saxta və ya dəyişdirilmiş sertifikat istifadəsi qanuni məsuliyyət yaradır.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Ödəniş və Geri Qaytarma</h2>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Təhsil proqramlarına edilən ödənişlər qeydiyyat təsdiqindən sonra aktiv hesab edilir.</li>
                <li>Finmaster Akademiyası xüsusi hallarda geri ödəniş qərarı vermək hüququnu saxlayır.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Platformadan İstifadə Məhdudiyyətləri</h2>
              <p className="text-gray-600 leading-relaxed mb-3">Aşağıdakı hallar qadağandır:</p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Platforma sisteminə müdaxilə etmək;</li>
                <li>Başqa istifadəçilərin məlumatlarını əldə etməyə çalışmaq;</li>
                <li>Təhsil materiallarını icazəsiz yaymaq;</li>
                <li>Platformanın fəaliyyətinə zərər verəcək hərəkətlər etmək.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Məsuliyyət Məhdudiyyəti</h2>
              <p className="text-gray-600 leading-relaxed">
                Akademiya platformanın fasiləsiz işləməsi üçün çalışsa da, texniki problemlər və ya üçüncü tərəf xidmətlərindən
                yaranan gecikmələrə görə tam məsuliyyət daşımır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Dəyişiklik Hüququ</h2>
              <p className="text-gray-600 leading-relaxed">
                Akademiya istifadə şərtlərini əvvəlcədən xəbərdarlıq etmədən yeniləmək və dəyişdirmək hüququnu özündə saxlayır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">9. Əlaqə</h2>
              <p className="text-gray-600 leading-relaxed mb-2">İstifadə şərtləri ilə bağlı suallarınız üçün bizimlə əlaqə saxlaya bilərsiniz:</p>
              <p className="text-gray-700 font-semibold">Finmaster Akademiyası</p>
              <p className="text-gray-600">
                <a href="mailto:info@finmasteracademy.az" className="text-[#0A4D2C] hover:underline">info@finmasteracademy.az</a>
              </p>
              <p className="text-gray-600">+994 10 226 00 21</p>
            </section>
          </div>
        )}

      </div>
    </div>
  );
}
