import { HeroSection } from '../HeroSection';
import { ProjectSection } from '../ProjectSection';
import { AboutSection } from '../AboutSection';
import { SolutionsSection } from '../SolutionsSection';

interface HomePageProps {
  onReportAnimal: () => void;
}

export function HomePage({ onReportAnimal }: HomePageProps) {
  const handleVejaFinal = () => {
    document.getElementById('projeto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <HeroSection onVejaFinal={handleVejaFinal} />
      <ProjectSection />
      <AboutSection />
      <SolutionsSection />
    </>
  );
}
