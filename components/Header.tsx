
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GlobeIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
    onNavigate: (page: string) => void;
    currentPage: string;
}

const Header = ({ onNavigate, currentPage }: HeaderProps) => {
    const { language, setLanguage, translations } = useLanguage();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages: { [key: string]: string } = {
        en: 'English',
        si: 'Sinhala (සිංහල)',
        ta: 'Tamil (தமிழ்)'
    };
    
    const handleNavClick = useCallback((e: React.MouseEvent, page: string) => {
        e.preventDefault();
        onNavigate(page);
    }, [onNavigate]);

    const handleLangChange = (lang: string) => {
        setLanguage(lang as 'en' | 'si' | 'ta');
        setIsDropdownOpen(false);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);


    return (
        <header className="bg-background text-on-background shadow-lg sticky top-0 z-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-24 relative">
                    <nav className="flex items-end justify-center space-x-8">
                        {translations.header.nav.map((link) => {
                            const isActive = currentPage === link.page;
                            return (
                                <a
                                    key={link.page}
                                    href={`/${link.page === 'home' ? '' : link.page}`}
                                    onClick={(e) => handleNavClick(e, link.page)}
                                    className={`font-semibold text-base transition-colors duration-200 ${link.multiline ? 'text-center leading-tight' : ''} ${isActive ? 'text-on-background underline' : 'text-accent hover:text-on-background'}`}
                                >
                                    {link.multiline ? (
                                        link.name.split('\n').map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}
                                                {i < link.name.split('\n').length - 1 && <br />}
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        link.name
                                    )}
                                </a>
                            )
                        })}
                    </nav>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2" ref={dropdownRef}>
                         <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface transition-colors duration-300">
                            <GlobeIcon className="h-6 w-6" />
                            <span className="font-semibold text-base">{translations.langShort}</span>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg py-1 z-50 border border-border-color">
                                {Object.entries(languages).map(([code, name]) => (
                                     <a
                                        key={code}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLangChange(code);
                                        }}
                                        className={`block px-4 py-2 text-sm ${language === code ? 'bg-accent/20 text-accent font-bold' : 'text-on-surface'} hover:bg-background`}
                                    >
                                        {name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;