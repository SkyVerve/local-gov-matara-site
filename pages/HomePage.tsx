
import React from 'react';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import OnlineServices from '../components/OnlineServices';
import Lamis from '../components/Lamis';
import InnovationLab from '../components/InnovationLab';
import Testimonials from '../components/Testimonials';
import Structure from '../components/Structure';
import Downloads from '../components/Downloads';
import LatestNews from '../components/LatestNews';
import Faq from '../components/Faq';
import ContactUs from '../components/ContactUs';
import AnimatedSection from '../components/AnimatedSection';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <>
      <Hero />
      <AnimatedSection>
        <AboutUs onNavigate={onNavigate} />
      </AnimatedSection>
      <AnimatedSection>
        <OnlineServices onNavigate={onNavigate} />
      </AnimatedSection>
      <AnimatedSection>
        <Lamis />
      </AnimatedSection>
      <AnimatedSection>
        <InnovationLab onNavigate={onNavigate} />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      <AnimatedSection>
        <Structure onNavigate={onNavigate} />
      </AnimatedSection>
      <AnimatedSection>
        <LatestNews onNavigate={onNavigate} />
      </AnimatedSection>
      <AnimatedSection>
        <Downloads onNavigate={onNavigate} />
      </AnimatedSection>
      <AnimatedSection>
        <Faq />
      </AnimatedSection>
      <AnimatedSection>
        <ContactUs />
      </AnimatedSection>
    </>
  );
};

export default HomePage;