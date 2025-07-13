
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center text-on-background mb-12">{children}</h2>
);

interface StructureProps {
  onNavigate?: (page: string) => void;
}

const Structure = ({ onNavigate }: StructureProps) => {
  const { translations } = useLanguage();
  return (
    <section id="structure" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle><span className="text-accent">{translations.structure.title}</span></SectionTitle>
        <div className="text-center text-on-surface text-lg">
          <p>{translations.structure.line1}</p>
          <p className="mt-4">{translations.structure.line2}</p>
          {onNavigate && (
            <div className="mt-12">
                <button 
                  type="button" 
                  onClick={() => onNavigate('structure')}
                  className="inline-block bg-accent text-accent-text font-bold py-3 px-8 rounded-lg text-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-accent">
                  {translations.structure.button}
                </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Structure;