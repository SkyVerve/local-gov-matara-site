
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import LamisPage from './pages/LamisPage';
import LabPage from './pages/LabPage';
import StructurePage from './pages/StructurePage';
import DownloadsPage from './pages/DownloadsPage';
import ContactPage from './pages/ContactPage';
import AiChatbot from './components/AiChatbot';
import SideNavButton from './components/SideNavButton';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent = () => {
  const { language } = useLanguage();

  const getPageFromPath = () => {
    const path = window.location.pathname;
    if (path === '/') return 'home';
    // Remove leading slash to get page name
    return path.substring(1);
  };

  const [page, setPage] = useState(getPageFromPath());

  const handleNavigate = useCallback((targetPage: string) => {
    setPage(targetPage);
    const path = targetPage === 'home' ? '/' : `/${targetPage}`;
    if (window.location.pathname !== path) {
        window.history.pushState({ page: targetPage }, '', path);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      setPage(event.state?.page || getPageFromPath());
    };

    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'lamis':
        return <LamisPage />;
      case 'lab':
        return <LabPage />;
      case 'structure':
        return <StructurePage />;
      case 'news':
        return <NewsPage />;
      case 'downloads':
        return <DownloadsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />; // Fallback to home for unknown paths
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={handleNavigate} currentPage={page} />
      <main className="flex-grow relative">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <AiChatbot />
      <SideNavButton />
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;