
import React from 'react';
import OrganizationalChart from '../components/OrganizationalChart';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../contexts/LanguageContext';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-4xl md:text-5xl font-bold text-center text-on-background mb-16 pt-8">{children}</h1>
);

const StructurePage = () => {
  const { translations } = useLanguage();
  return (
    <div className="bg-background py-20 md:py-28 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
                <SectionTitle><span className="text-accent">{translations.structure.title}</span></SectionTitle>
                <OrganizationalChart />
            </AnimatedSection>
        </div>
    </div>
  );
};

export default StructurePage;