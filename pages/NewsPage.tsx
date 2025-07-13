
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { CalendarIcon } from '../components/Icons';
import { useLanguage } from '../contexts/LanguageContext';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-4xl md:text-5xl font-bold text-center text-on-background mb-16 pt-8">{children}</h1>
);

interface NewsArticleProps {
    date: string;
    title: string;
    content: React.ReactNode;
}

const NewsArticle = ({ date, title, content }: NewsArticleProps) => (
    <article className="bg-surface p-8 rounded-lg border border-border-color">
        <div className="flex items-center text-on-surface text-sm mb-3">
            <CalendarIcon className="w-5 h-5 mr-2 text-accent" />
            <span>{date}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-on-background mb-4">{title}</h2>
        <div className="text-on-surface leading-relaxed space-y-4">
            {content}
        </div>
    </article>
);


const NewsPage = () => {
    const { translations } = useLanguage();
    
    const newsItems = translations.news.articles.map(article => ({
      ...article,
      content: (
        <>
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </>
      )
    }));

    return (
        <div className="bg-background py-20 md:py-28 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <SectionTitle><span className="text-accent">{translations.news.title}</span></SectionTitle>
                    <div className="space-y-12">
                        {newsItems.map((item, index) => (
                            <NewsArticle key={index} {...item} />
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default NewsPage;