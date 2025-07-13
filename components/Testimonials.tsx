
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { StarIcon } from './Icons';

interface TestimonialCardProps {
    name: string;
    role: string;
    avatar: string;
    text: string;
}

const TestimonialCard = ({ name, role, avatar, text }: TestimonialCardProps) => (
    <div className="bg-surface rounded-xl border border-border-color p-6 h-full flex flex-col transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
        <div className="flex items-center mb-4">
            <img src={avatar} alt={name} className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-accent" />
            <div>
                <h4 className="font-bold text-on-background text-lg">{name}</h4>
                <p className="text-on-surface text-sm">{role}</p>
                <p className="text-accent text-xs font-bold mt-1">Verified Professional</p>
            </div>
        </div>
        <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
            ))}
        </div>
        <p className="text-on-surface leading-relaxed text-sm flex-grow">{text}</p>
    </div>
);

const Testimonials = () => {
  const { translations } = useLanguage();

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <div className="flex justify-center mb-4 space-x-1">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-6 h-6 text-accent" />)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-accent mb-4">
                {translations.testimonials.title}
            </h2>
            <p className="text-lg text-center text-on-surface max-w-3xl mx-auto mb-16">
                {translations.testimonials.subtitle}
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {translations.testimonials.reviews.map((review, index) => (
                <TestimonialCard key={index} {...review} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;