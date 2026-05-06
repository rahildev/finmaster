'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Certificate() {
  const { language } = useLanguage();
  const [certId, setCertId] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Doğrulama məntiqi sonradan əlavə ediləcək
  };

  return (
    <section id="certificate" className="bg-background border-t border-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Sol — mətn */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#0A4D2C] uppercase mb-4">
              {language === 'en' ? 'Verifiable Certificate' : 'Doğrulana Bilən Sertifikat'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {language === 'en'
                ? 'Your education is confirmed, your future gains value.'
                : 'Təhsiliniz təsdiqlənir, gələcəyiniz dəyər qazanır.'}
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              {language === 'en'
                ? 'Every graduate receives a digital certificate with a unique ID and QR verification.'
                : 'Hər məzuna unikal ID və QR doğrulama ilə rəqəmsal sertifikat təqdim olunur.'}
            </p>
          </div>

          {/* Sağ — doğrulama formu + QR */}
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-5">
                {language === 'en' ? 'Verify Certificate' : 'Sertifikatı Doğrulayın'}
              </h3>
              <form onSubmit={handleVerify} className="flex gap-3">
                <input
                  type="text"
                  value={certId}
                  onChange={e => setCertId(e.target.value)}
                  placeholder="Certificate ID"
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0A4D2C] focus:ring-1 focus:ring-[#0A4D2C] bg-white"
                />
                <button
                  type="submit"
                  className="bg-[#0A4D2C] text-white font-semibold px-6 py-3 rounded-lg text-sm hover:bg-[#0c5e35] transition-colors whitespace-nowrap"
                >
                  {language === 'en' ? 'Verify' : 'Doğrula'}
                </button>
              </form>
            </div>
            <div className="shrink-0 w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center mt-10">
              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h7v7H3V3zm1 1v5h5V4H4zm1 1h3v3H5V5zM3 14h7v7H3v-7zm1 1v5h5v-5H4zm1 1h3v3H5v-3zM14 3h7v7h-7V3zm1 1v5h5V4h-5zm1 1h3v3h-3V5zM14 14h2v2h-2v-2zm3 0h2v2h-2v-2zm-3 3h2v2h-2v-2zm3 0h2v2h-2v-2zm-6-3h2v2h-2v-2zm0 3h2v2h-2v-2z"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
