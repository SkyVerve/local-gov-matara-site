
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-center text-on-background mb-4">{children}</h2>
);

const SectionSubtitle = ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg text-center text-on-surface max-w-3xl mx-auto mb-12">{children}</p>
);


interface LabCardProps {
  title: string;
  description: string;
}

const LabCard = ({ title, description }: LabCardProps) => (
  <div className="bg-background rounded-xl border border-border-color hover:border-accent hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out p-8 h-full">
    <h3 className="text-2xl font-semibold text-on-background mb-3">{title}</h3>
    <p className="text-on-surface leading-relaxed">{description}</p>
  </div>
);

interface InnovationLabProps {
  onNavigate?: (page: string) => void;
}

const InnovationLab = ({ onNavigate }: InnovationLabProps) => {
    const { translations } = useLanguage();

    return (
        <section id="lab" className="py-20 md:py-28 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle><span className="text-accent">{translations.lab.title}</span></SectionTitle>
                <SectionSubtitle>
                    {translations.lab.subtitle}
                </SectionSubtitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {translations.lab.initiatives.map((item, index) => (
                        <LabCard key={index} title={item.title} description={item.description} />
                    ))}
                </div>
                {onNavigate && (
                  <div className="mt-16 text-center">
                      <button 
                        type="button"
                        onClick={() => onNavigate('lab')}
                        className="inline-block bg-accent text-accent-text font-bold py-3 px-8 rounded-lg text-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-accent">
                          {translations.lab.button}
                      </button>
                  </div>
                )}
            </div>
        </section>
    );
};

export default InnovationLab;