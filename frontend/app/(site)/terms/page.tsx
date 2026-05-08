'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function TermsPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-background min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">

        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8 font-inter">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {language === 'en' ? 'Back to Home' : 'Ana Səhifə'}
        </Link>

        {language === 'en' ? (
          <div className="prose max-w-none">
            <p className="font-inter text-xs text-gray-400 mb-2 uppercase tracking-widest">Legal</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use</h1>
            <p className="font-inter text-sm text-gray-400 mb-10">Last updated: May 2026</p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p className="font-inter text-gray-600 leading-relaxed">By accessing and using Finmaster Academy, you agree to these Terms of Use. If you do not agree, please do not use our platform.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. About the Service</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Finmaster Academy provides online accounting and finance education through video courses, programs, and learning materials. Access to certain content may require registration.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. User Accounts</h2>
              <ul className="font-inter text-gray-600 space-y-1 list-disc list-inside">
                <li>You must provide accurate information when registering</li>
                <li>You are responsible for keeping your password secure</li>
                <li>You may not share your account with others</li>
                <li>We reserve the right to suspend accounts that violate these terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Intellectual Property</h2>
              <p className="font-inter text-gray-600 leading-relaxed">All content on Finmaster Academy — including videos, course materials, texts, and logos — is the property of Finmaster Academy. You may not copy, reproduce, or distribute our content without written permission.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Acceptable Use</h2>
              <ul className="font-inter text-gray-600 space-y-1 list-disc list-inside">
                <li>Use the platform only for lawful purposes</li>
                <li>Do not attempt to gain unauthorized access to any part of the platform</li>
                <li>Do not share course content with third parties</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Limitation of Liability</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Finmaster Academy provides educational content in good faith but does not guarantee specific career or financial outcomes. We are not liable for any decisions made based on our course content.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Changes to Terms</h2>
              <p className="font-inter text-gray-600 leading-relaxed">We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Contact</h2>
              <p className="font-inter text-gray-600 leading-relaxed">For any questions about these terms, contact us at <a href="mailto:info@finmasteracademy.az" className="text-[#0A4D2C] hover:underline">info@finmasteracademy.az</a>.</p>
            </section>
          </div>
        ) : (
          <div className="prose max-w-none">
            <p className="font-inter text-xs text-gray-400 mb-2 uppercase tracking-widest">Hüquqi</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">İstifadə Şərtləri</h1>
            <p className="font-inter text-sm text-gray-400 mb-10">Son yenilənmə: May 2026</p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Şərtlərin qəbulu</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Finmaster Academy-yə daxil olaraq və platformadan istifadə edərək bu İstifadə Şərtlərini qəbul etmiş olursunuz. Razı deyilsinizsə, platformadan istifadə etməyin.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Xidmət haqqında</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Finmaster Academy video kurslar, proqramlar və öyrənmə materialları vasitəsilə onlayn mühasibatlıq və maliyyə təhsili təqdim edir. Bəzi məzmuna giriş üçün qeydiyyat tələb oluna bilər.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. İstifadəçi hesabları</h2>
              <ul className="font-inter text-gray-600 space-y-1 list-disc list-inside">
                <li>Qeydiyyat zamanı dəqiq məlumat verməlisiniz</li>
                <li>Şifrənizin təhlükəsizliyini qorumaq sizin məsuliyyətinizdədir</li>
                <li>Hesabınızı başqaları ilə paylaşmaq olmaz</li>
                <li>Bu şərtləri pozan hesabları dayandırmaq hüququnu özümüzdə saxlayırıq</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Əqli mülkiyyət</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Finmaster Academy-dəki bütün məzmun — videolar, kurs materialları, mətnlər və loqolar — Finmaster Academy-nin mülkiyyətidir. Yazılı icazə olmadan məzmunumuzu kopyalamaq, çoxaltmaq və ya yaymaq qadağandır.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Qəbul edilən istifadə</h2>
              <ul className="font-inter text-gray-600 space-y-1 list-disc list-inside">
                <li>Platformadan yalnız qanuni məqsədlər üçün istifadə edin</li>
                <li>Platformanın hər hansı hissəsinə icazəsiz giriş əldə etməyə cəhd etməyin</li>
                <li>Kurs məzmununu üçüncü tərəflərlə paylaşmayın</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Məsuliyyətin məhdudlaşdırılması</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Finmaster Academy təhsil məzmununu vicdanla təqdim edir, lakin konkret karyera və ya maliyyə nəticələrinə zəmanət vermir. Kurs məzmununa əsasən qəbul edilən qərarlar üçün məsuliyyət daşımırıq.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Şərtlərdə dəyişikliklər</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Bu şərtləri vaxtaşırı yeniləyə bilərik. Dəyişikliklərdən sonra platformadan istifadənizi davam etdirməyiniz yeni şərtləri qəbul etdiyiniz kimi qəbul edilir.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Əlaqə</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Bu şərtlərlə bağlı suallarınız üçün <a href="mailto:info@finmasteracademy.az" className="text-[#0A4D2C] hover:underline">info@finmasteracademy.az</a> ünvanı ilə bizimlə əlaqə saxlayın.</p>
            </section>
          </div>
        )}

      </div>
    </div>
  );
}
