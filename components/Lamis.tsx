
import React from 'react';
import { DatabaseIcon, BarChartIcon, LockIcon, SmartphoneIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-on-background mb-12 text-center">{children}</h2>
);

interface FeatureChipProps {
    icon: React.ReactNode;
    text: string;
}

const FeatureChip = ({ icon, text }: FeatureChipProps) => (
    <div className="flex items-center space-x-3 bg-surface border border-border-color p-3 rounded-lg hover:border-accent hover:bg-gray-800 transition-colors duration-200">
        <div className="text-accent">
            {icon}
        </div>
        <span className="font-medium text-on-surface">{text}</span>
    </div>
);

const Lamis = () => {
    const { translations } = useLanguage();
    const features = [
        { icon: <DatabaseIcon className="w-6 h-6" />, text: translations.lamis.features[0] },
        { icon: <BarChartIcon className="w-6 h-6" />, text: translations.lamis.features[1] },
        { icon: <LockIcon className="w-6 h-6" />, text: translations.lamis.features[2] },
        { icon: <SmartphoneIcon className="w-6 h-6" />, text: translations.lamis.features[3] }
    ];

    return (
        <section id="lamis" className="py-20 md:py-28 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle><span className="text-accent">{translations.lamis.title}</span></SectionTitle>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex justify-center items-center">
                          <img 
                              src="https://i.postimg.cc/3wYg3A0b/lamis-logo-teal.png" 
                              alt="LAMIS Logo" 
                              className="max-w-sm w-full h-auto"
                          />
                    </div>
                    <div className="text-lg text-on-surface space-y-8">
                        <p>
                            {translations.lamis.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <FeatureChip key={index} {...feature} />
                            ))}
                        </div>
                          <div className="mt-8 text-center">
                               <a 
                                href="https://aclgmatara.sp.gov.lk/lamis/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-accent text-accent-text font-bold py-3 px-8 rounded-lg text-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-accent">
                                  {translations.lamis.button}
                              </a>
                          </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Lamis;