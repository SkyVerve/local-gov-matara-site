
import React from 'react';
import { TargetIcon, EyeIcon, UsersIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center text-on-background mb-12">{children}</h2>
);

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoCard = ({ icon, title, description }: InfoCardProps) => (
  <div className="bg-surface rounded-xl border border-border-color hover:border-accent hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 text-center flex flex-col items-center">
    <div className="bg-background rounded-full p-4 mb-6 inline-block">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-on-background mb-3">{title}</h3>
    <p className="text-on-surface leading-relaxed">{description}</p>
  </div>
);

interface AboutUsProps {
  onNavigate?: (page: string) => void;
}

const AboutUs = ({ onNavigate }: AboutUsProps) => {
    const { translations } = useLanguage();

    const cardData = [
        {
            icon: <TargetIcon className="w-10 h-10 text-accent" />,
            title: translations.about.cards[0].title,
            description: translations.about.cards[0].description,
        },
        {
            icon: <EyeIcon className="w-10 h-10 text-accent" />,
            title: translations.about.cards[1].title,
            description: translations.about.cards[1].description,
        },
        {
            icon: <UsersIcon className="w-10 h-10 text-accent" />,
            title: translations.about.cards[2].title,
            description: translations.about.cards[2].description,
        },
    ];

    return (
        <section id="about" className="py-20 md:py-28 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle><span className="text-accent">{translations.about.title}</span></SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cardData.map((card, index) => (
                        <InfoCard key={index} icon={card.icon} title={card.title} description={card.description} />
                    ))}
                </div>
                {onNavigate && (
                  <div className="mt-16 text-center">
                      <button 
                        type="button" 
                        onClick={() => onNavigate('about')}
                        className="inline-block bg-accent text-accent-text font-bold py-3 px-8 rounded-lg text-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-accent">
                          {translations.about.button}
                      </button>
                  </div>
                )}
            </div>
        </section>
    );
};

export default AboutUs;