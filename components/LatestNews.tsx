
import React from 'react';
import { CalendarIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center text-on-background mb-12">{children}</h2>
);

interface NewsCardProps {
  date: string;
  title: string;
  excerpt: string;
  onNavigate: () => void;
  readMoreText: string;
}

const NewsCard = ({ date, title, excerpt, onNavigate, readMoreText }: NewsCardProps) => (
  <div className="bg-surface rounded-xl border border-border-color hover:border-accent hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 flex flex-col">
    <div className="flex items-center text-on-surface text-sm mb-3">
      <CalendarIcon className="w-5 h-5 mr-2 text-accent" />
      <span>{date}</span>
    </div>
    <h3 className="text-xl font-semibold text-on-background mb-3 flex-grow">{title}</h3>
    <p className="text-on-surface leading-relaxed mb-6">{excerpt}</p>
    <a href="/news" onClick={(e) => { e.preventDefault(); onNavigate(); }} className="font-bold text-accent hover:underline mt-auto pt-2 self-start">{readMoreText} →</a>
  </div>
);

interface LatestNewsProps {
  onNavigate: (page: string) => void;
}

const LatestNews = ({ onNavigate }: LatestNewsProps) => {
    const { translations } = useLanguage();

    return (
        <section id="news" className="py-20 md:py-28 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle><span className="text-accent">{translations.latestNews.title}</span></SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {translations.latestNews.items.map((item, index) => (
                        <NewsCard key={index} {...item} onNavigate={() => onNavigate('news')} readMoreText={translations.latestNews.readMore} />
                    ))}
                </div>
                <div className="mt-16 text-center">
                    <button 
                      onClick={() => onNavigate('news')}
                      className="inline-block bg-accent text-accent-text font-bold py-3 px-8 rounded-lg text-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 active:scale-100">
                        {translations.latestNews.button}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;