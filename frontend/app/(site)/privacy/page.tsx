'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="font-inter text-sm text-gray-400 mb-10">Last updated: May 2026</p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Who We Are</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Finmaster Academy is an online accounting and finance education platform operating in Azerbaijan. We can be reached at <a href="mailto:info@finmasteracademy.az" className="text-[#0A4D2C] hover:underline">info@finmasteracademy.az</a>.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. What Data We Collect</h2>
              <p className="font-inter text-gray-600 leading-relaxed mb-3">When you register or use our platform, we may collect:</p>
              <ul className="font-inter text-gray-600 space-y-1 list-disc list-inside">
                <li>Full name and username</li>
                <li>Email address</li>
                <li>Password (stored encrypted)</li>
                <li>Language preference (via cookies)</li>
                <li>Session information (login tokens)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. How We Use Your Data</h2>
              <ul className="font-inter text-gray-600 space-y-1 list-disc list-inside">
                <li>To create and manage your account</li>
                <li>To provide access to courses and videos</li>
                <li>To send important notifications about your account</li>
                <li>To improve our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Cookies</h2>
              <p className="font-inter text-gray-600 leading-relaxed">We use cookies to remember your language preference and keep you logged in. No third-party tracking cookies are used.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Data Sharing</h2>
              <p className="font-inter text-gray-600 leading-relaxed">We do not sell or share your personal data with third parties. Your data is stored securely on our servers.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Your Rights</h2>
              <p className="font-inter text-gray-600 leading-relaxed">You may request access to, correction, or deletion of your personal data at any time by contacting us at <a href="mailto:info@finmasteracademy.az" className="text-[#0A4D2C] hover:underline">info@finmasteracademy.az</a>.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Contact</h2>
              <p className="font-inter text-gray-600 leading-relaxed">For any privacy-related questions, please contact us at <a href="mailto:info@finmasteracademy.az" className="text-[#0A4D2C] hover:underline">info@finmasteracademy.az</a>.</p>
            </section>
          </div>
        ) : (
          <div className="prose max-w-none">
            <p className="font-inter text-xs text-gray-400 mb-2 uppercase tracking-widest">Hüquqi</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Məxfilik Siyasəti</h1>
            <p className="font-inter text-sm text-gray-400 mb-10">Son yenilənmə: May 2026</p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Biz kimik</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Finmaster Academy, Azərbaycanda fəaliyyət göstərən onlayn mühasibatlıq və maliyyə təhsil platformasıdır. Bizimlə <a href="mailto:info@finmasteracademy.az" className="text-[#0A4D2C] hover:underline">info@finmasteracademy.az</a> ünvanı ilə əlaqə saxlaya bilərsiniz.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Hansı məlumatları toplayırıq</h2>
              <p className="font-inter text-gray-600 leading-relaxed mb-3">Qeydiyyatdan keçdikdə və ya platformadan istifadə etdikdə aşağıdakı məlumatları toplaya bilərik:</p>
              <ul className="font-inter text-gray-600 space-y-1 list-disc list-inside">
                <li>Ad, soyad və istifadəçi adı</li>
                <li>E-poçt ünvanı</li>
                <li>Şifrə (şifrələnmiş şəkildə saxlanılır)</li>
                <li>Dil seçimi (kukilər vasitəsilə)</li>
                <li>Sessiya məlumatları (giriş tokenləri)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Məlumatlarınızdan necə istifadə edirik</h2>
              <ul className="font-inter text-gray-600 space-y-1 list-disc list-inside">
                <li>Hesabınızı yaratmaq və idarə etmək üçün</li>
                <li>Kurslara və videolara giriş təmin etmək üçün</li>
                <li>Hesabınızla bağlı vacib bildirişlər göndərmək üçün</li>
                <li>Platformamızı inkişaf etdirmək üçün</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Kukilər</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Dil seçiminizi yadda saxlamaq və sizin daxil olmuş vəziyyətinizi qorumaq üçün kukilərdən istifadə edirik. Üçüncü tərəf izləmə kukilərindən istifadə edilmir.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Məlumatların paylaşılması</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Şəxsi məlumatlarınızı üçüncü tərəflərə satmır və ya paylaşmırıq. Məlumatlarınız təhlükəsiz serverlərimizdə saxlanılır.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Hüquqlarınız</h2>
              <p className="font-inter text-gray-600 leading-relaxed">İstənilən vaxt şəxsi məlumatlarınıza giriş, düzəliş və ya silinməsini tələb edə bilərsiniz. Bunun üçün <a href="mailto:info@finmasteracademy.az" className="text-[#0A4D2C] hover:underline">info@finmasteracademy.az</a> ünvanına müraciət edin.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Əlaqə</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Məxfiliklə bağlı suallarınız üçün <a href="mailto:info@finmasteracademy.az" className="text-[#0A4D2C] hover:underline">info@finmasteracademy.az</a> ünvanı ilə bizimlə əlaqə saxlayın.</p>
            </section>
          </div>
        )}

      </div>
    </div>
  );
}
