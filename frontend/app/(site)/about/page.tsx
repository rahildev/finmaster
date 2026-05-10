import AboutSection from '@/components/AboutSection';

export const metadata = {
  title: 'Haqqımızda | FinMaster Academy',
};

export const revalidate = 60;

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutSection />
    </div>
  );
}
