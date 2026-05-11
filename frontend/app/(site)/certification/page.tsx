import Certificate from '@/components/Certificate';
import { getLandingPageData } from '@/lib/api';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sertifikasiya | FinMaster Academy',
  description: 'FinMaster Academy sertifikatınızı doğrulayın.',
};

export default async function CertificationPage() {
  try {
    const data = await getLandingPageData();
    if (data.section_visibility?.certification === false) return notFound();
  } catch {}

  return (
    <div className="pt-16 min-h-screen bg-background">
      <Certificate />
    </div>
  );
}
