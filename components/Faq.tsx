
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PlusIcon } from './Icons';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => {
  return (
    <div className="border-b-2 border-surface">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-6 px-2 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className={`text-lg font-semibold ${isOpen ? 'text-accent' : 'text-on-background'}`}>{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45 text-accent' : 'text-on-surface'}`}>
          <PlusIcon className="w-6 h-6" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="text-on-surface pb-6 px-2">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const { translations } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
          {translations.faq.title}
        </h2>
        <p className="text-on-surface text-lg mb-12">
          {translations.faq.subtitle}
        </p>
        <div className="space-y-4">
          {translations.faq.questions.map((item, index) => (
            <FaqItem
              key={index}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;