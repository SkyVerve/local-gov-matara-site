
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1517264104255-29dae278686e?q=80&w=2070&auto=format&fit=crop',
    alt: 'Matara District coastal view with a bridge to a small island'
  },
  {
    url: 'https://images.unsplash.com/photo-1586552493096-a495914a7837?q=80&w=2070&auto=format&fit=crop',
    alt: 'Galle Fort, a historical landmark near Matara'
  },
  {
    url: 'https://images.unsplash.com/photo-1614701956138-16e6d376d8dd?q=80&w=2070&auto=format&fit=crop',
    alt: 'A modern government building, representing local administration'
  },
  {
    url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2000&auto=format&fit=crop',
    alt: 'Lush green tea plantations in the hills of Sri Lanka'
  },
  {
    url: 'https://images.unsplash.com/photo-1580674287411-934c4458f38a?q=80&w=2070&auto=format&fit=crop',
    alt: 'Coastal train line running along the southern coast of Sri Lanka'
  },
  {
    url: 'https://images.unsplash.com/photo-1622312154424-219803531c3c?q=80&w=2070&auto=format&fit=crop',
    alt: 'A serene beach scene in southern Sri Lanka at sunset'
  }
];

const Hero = () => {
    const { translations } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        }; // Cleanup interval on component unmount
    }, []);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <section id="home" className="relative h-[calc(100vh-80px)] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${image.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        aria-label={image.alt}
                        role="img"
                    ></div>
                ))}
            </div>
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className={`relative z-20 text-center px-4 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6 text-white">
                    {translations.hero.title}
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl font-light mb-8 text-gray-200">
                    {translations.hero.subtitle}
                </p>
            </div>
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentIndex === index ? 'bg-accent scale-125' : 'bg-gray-700 hover:bg-gray-500'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </section>
    );
};

export default Hero;