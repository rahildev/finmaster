import Certificate from '@/components/Certificate';

export const metadata = {
  title: 'Sertifikasiya | FinMaster Academy',
  description: 'FinMaster Academy sertifikatınızı doğrulayın.',
};

export default function CertificationPage() {
  return (
    <div className="pt-16 min-h-screen bg-background">
      <Certificate />
    </div>
  );
}
