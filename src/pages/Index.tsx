import CustomCursor from '@/components/CustomCursor';
import GoToTop from '@/components/GoToTop';
import ModernHero from '@/components/ModernHero';
import ModernAbout from '@/components/ModernAbout';
import ModernSkills from '@/components/ModernSkills';
import ModernExperience from '@/components/ModernExperience';
import ModernEducation from '@/components/ModernEducation';
import ModernProjects from '@/components/ModernProjects';
import ModernContact from '@/components/ModernContact';
import SectionDivider from '@/components/SectionDivider';

const Index = () => {
  return (
    <>
      <CustomCursor />
      <GoToTop />
      <div className="min-h-screen bg-paper">
        <ModernHero />
        <SectionDivider variant="light" />
        <ModernAbout />
        <SectionDivider variant="to-dark" />
        <ModernSkills />
        <SectionDivider variant="to-light" />
        <ModernExperience />
        <SectionDivider variant="to-dark" />
        <ModernEducation />
        <SectionDivider variant="to-light" />
        <ModernProjects />
        <SectionDivider variant="light" />
        <ModernContact />
      </div>
    </>
  );
};

export default Index;
