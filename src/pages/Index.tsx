import CustomCursor from '@/components/CustomCursor';
import ThemeToggle from '@/components/ThemeToggle';
import ModernHero from '@/components/ModernHero';
import ModernAbout from '@/components/ModernAbout';
import ModernProjects from '@/components/ModernProjects';
import ModernContact from '@/components/ModernContact';

const Index = () => {
  return (
    <>
      <CustomCursor />
      <ThemeToggle />
      <div className="min-h-screen">
        <ModernHero />
        <ModernAbout />
        <ModernProjects />
        <ModernContact />
      </div>
    </>
  );
};

export default Index;
