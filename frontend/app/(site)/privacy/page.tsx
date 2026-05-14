'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-sm text-gray-400 mb-10">Last updated: May 2026</p>

            <p className="text-gray-600 leading-relaxed mb-10">
              As Finmaster Academy, we place special importance on the privacy of our users and the protection of their personal data.
              This Privacy Policy explains how the information you provide while using our platform is collected, used, and protected.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Data Collected</h2>
              <p className="text-gray-600 leading-relaxed mb-3">When you use our platform, the following information may be collected:</p>
              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                <li>First and last name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Educational and registration information</li>
                <li>Certificate information</li>
                <li>Payment and transaction information</li>
                <li>Technical information related to site usage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Purpose of Data Use</h2>
              <p className="text-gray-600 leading-relaxed mb-3">Collected data is used for the following purposes:</p>
              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                <li>Provision of educational services</li>
                <li>Registration and student management</li>
                <li>Preparation and verification of certificates</li>
                <li>User support and communication</li>
                <li>Platform development</li>
                <li>Security and system monitoring</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Data Protection</h2>
              <p className="text-gray-600 leading-relaxed">
                Finmaster Academy applies modern technical and administrative measures to ensure the security of user data.
                Personal data is protected against unauthorized access, modification, and sharing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Third-Party Sharing</h2>
              <p className="text-gray-600 leading-relaxed">
                Users' personal data is not shared with third parties without their consent.
                It may only be provided to official authorities when required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Cookie technology may be used to improve the efficiency of the website and enhance the user experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. User Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-3">Users have the following rights:</p>
              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                <li>Access to personal data</li>
                <li>Updating data</li>
                <li>Requesting deletion of data</li>
                <li>Opting out of marketing notifications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Certificate Verification System</h2>
              <p className="text-gray-600 leading-relaxed">
                Certificates issued by Finmaster Academy can be verified via a unique ID system and QR code.
                Certificate information is used solely for verification purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Contact</h2>
              <p className="text-gray-600 leading-relaxed mb-2">For questions regarding the privacy policy, you can contact us:</p>
              <p className="text-gray-700 font-semibold">Finmaster Academy</p>
              <p className="text-gray-600">
                <a href="mailto:info@finmasteracademy.az" className="text-[#0A4D2C] hover:underline">info@finmasteracademy.az</a>
              </p>
              <p className="text-gray-600">+994 10 226 00 21</p>
              <p className="text-gray-500 text-sm mt-4">
                Finmaster Academy reserves the right to update this Privacy Policy without prior notice.
              </p>
            </section>
          </div>
        ) : (
          <div className="prose max-w-none">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Hüquqi</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gizlilik Siyasəti</h1>
            <p className="text-sm text-gray-400 mb-10">Son yenilənmə: May 2026</p>

            <p className="text-gray-600 leading-relaxed mb-10">
              Finmaster Akademiyası olaraq istifadəçilərimizin məxfiliyinə və şəxsi məlumatlarının qorunmasına xüsusi önəm veririk.
              Bu Gizlilik siyasəti, platformamızdan istifadə zamanı təqdim etdiyiniz məlumatların necə toplandığını, istifadə edildiyini
              və qorunduğunu izah edir.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Toplanan Məlumatlar</h2>
              <p className="text-gray-600 leading-relaxed mb-3">Platformamızdan istifadə etdiyiniz zaman aşağıdakı məlumatlar toplana bilər:</p>
              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                <li>Ad və soyad</li>
                <li>Telefon nömrəsi</li>
                <li>E-poçt ünvanı</li>
                <li>Təhsil və qeydiyyat məlumatları</li>
                <li>Sertifikat məlumatları</li>
                <li>Ödəniş və tranzaksiya məlumatları</li>
                <li>Sayt istifadəsi ilə bağlı texniki məlumatlar</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Məlumatların İstifadə Məqsədi</h2>
              <p className="text-gray-600 leading-relaxed mb-3">Toplanan məlumatlar aşağıdakı məqsədlərlə istifadə olunur:</p>
              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                <li>Təhsil xidmətlərinin təqdim edilməsi</li>
                <li>Qeydiyyat və tələbə idarəetməsi</li>
                <li>Sertifikatların hazırlanması və doğrulanması</li>
                <li>İstifadəçi dəstəyi və əlaqə</li>
                <li>Platformanın inkişaf etdirilməsi</li>
                <li>Təhlükəsizlik və sistem nəzarəti</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Məlumatların Qorunması</h2>
              <p className="text-gray-600 leading-relaxed">
                Finmaster Akademiyası istifadəçi məlumatlarının təhlükəsizliyini təmin etmək üçün müasir texniki və inzibati tədbirlər
                tətbiq edir. Şəxsi məlumatlar icazəsiz giriş, dəyişiklik və paylaşılmaya qarşı qorunur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Üçüncü Tərəflərlə Paylaşım</h2>
              <p className="text-gray-600 leading-relaxed">
                İstifadəçilərin şəxsi məlumatları onların razılığı olmadan üçüncü tərəflərlə paylaşılmır.
                Yalnız qanunvericiliyin tələb etdiyi hallarda rəsmi qurumlara təqdim edilə bilər.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Cookie Faylları</h2>
              <p className="text-gray-600 leading-relaxed">
                Saytın daha effektiv işləməsi və istifadəçi təcrübəsinin yaxşılaşdırılması məqsədilə "cookie" texnologiyasından istifadə oluna bilər.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. İstifadəçi Hüquqları</h2>
              <p className="text-gray-600 leading-relaxed mb-3">İstifadəçilər aşağıdakı hüquqlara malikdir:</p>
              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                <li>Şəxsi məlumatlarına baxış</li>
                <li>Məlumatların yenilənməsi</li>
                <li>Məlumatların silinməsini tələb etmək</li>
                <li>Marketinq bildirişlərindən imtina etmək</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Sertifikat Doğrulama Sistemi</h2>
              <p className="text-gray-600 leading-relaxed">
                Finmaster Akademiyası tərəfindən təqdim edilən sertifikatlar xüsusi ID sistemi və QR kod vasitəsilə doğrulana bilər.
                Sertifikat məlumatları yalnız doğrulama məqsədilə istifadə olunur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Əlaqə</h2>
              <p className="text-gray-600 leading-relaxed mb-2">Gizlilik siyasəti ilə bağlı suallarınız üçün bizimlə əlaqə saxlaya bilərsiniz:</p>
              <p className="text-gray-700 font-semibold">Finmaster Akademiyası</p>
              <p className="text-gray-600">
                <a href="mailto:info@finmasteracademy.az" className="text-[#0A4D2C] hover:underline">info@finmasteracademy.az</a>
              </p>
              <p className="text-gray-600">+994 10 226 00 21</p>
              <p className="text-gray-500 text-sm mt-4">
                Finmaster Akademiyası bu Gizlilik siyasətini əvvəlcədən xəbərdarlıq etmədən yeniləmək hüququnu özündə saxlayır.
              </p>
            </section>
          </div>
        )}

      </div>
    </div>
  );
}
