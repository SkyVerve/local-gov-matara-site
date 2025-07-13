
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
    onNavigate: (page: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
    const { translations } = useLanguage();

    const handleNavClick = (e: React.MouseEvent, page: string) => {
        e.preventDefault();
        onNavigate(page);
    };
    
    return (
        <footer className="bg-surface text-on-surface">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-lg font-semibold text-on-background mb-4">{translations.footer.about.title}</h3>
                        <p className="text-sm">
                            {translations.footer.about.description}
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-on-background mb-4">{translations.footer.quickLinks.title}</h3>
                        <ul className="space-y-2 text-sm">
                            {translations.footer.quickLinks.links.map(link => (
                                <li key={link.page}><a href={`/${link.page}`} onClick={(e) => handleNavClick(e, link.page)} className="text-on-surface hover:text-accent transition-colors">{link.name}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Government Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-on-background mb-4">{translations.footer.govLinks.title}</h3>
                         <ul className="space-y-2 text-sm">
                             {translations.footer.govLinks.links.map((link, index) => (
                                <li key={index}><a href="#" onClick={(e) => e.preventDefault()} className="text-on-surface/50 cursor-not-allowed" title="Link not available yet">{link.name}</a></li>
                             ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-border-color pt-8 text-center text-sm text-gray-400">
                    <p>{translations.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;