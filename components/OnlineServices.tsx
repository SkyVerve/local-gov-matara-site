
import React from 'react';
import { DownloadIcon, ComplaintIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-center text-on-background mb-12">{children}</h2>
);

const ActionButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button type="button" onClick={onClick} className="mt-auto inline-block bg-accent text-accent-text font-bold py-2 px-6 rounded-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-accent">
        {children}
    </button>
);

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText?: string;
    onNavigate?: () => void;
}

const ServiceCard = ({ icon, title, description, buttonText, onNavigate }: ServiceCardProps) => (
    <div className="bg-background rounded-xl border border-border-color hover:border-accent hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out p-8 flex flex-col items-center text-center">
        <div className="bg-surface rounded-full p-5 mb-6">
            {icon}
        </div>
        <h3 className="text-2xl font-semibold text-on-background mb-3">{title}</h3>
        <p className="text-on-surface leading-relaxed mb-6 flex-grow">{description}</p>
        {buttonText && onNavigate && <ActionButton onClick={onNavigate}>{buttonText}</ActionButton>}
    </div>
);

interface OnlineServicesProps {
  onNavigate?: (page: string) => void;
}

const OnlineServices = ({ onNavigate }: OnlineServicesProps) => {
    const { translations } = useLanguage();
    
    const services = [
        {
            icon: <ComplaintIcon className="w-10 h-10 text-accent" />,
            title: translations.services.cards[0].title,
            description: translations.services.cards[0].description,
            buttonText: translations.services.cards[0].buttonText,
            page: 'contact',
        },
        {
            icon: <DownloadIcon className="w-10 h-10 text-accent" />,
            title: translations.services.cards[1].title,
            description: translations.services.cards[1].description,
            buttonText: translations.services.cards[1].buttonText,
            page: 'downloads',
        }
    ];

    return (
        <section id="services" className="py-20 md:py-28 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle><span className="text-accent">{translations.services.title}</span></SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {services.map((service, index) => (
                        <ServiceCard 
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            buttonText={service.buttonText}
                            onNavigate={onNavigate ? () => onNavigate(service.page) : undefined}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OnlineServices;