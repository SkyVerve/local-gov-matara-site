
import React from 'react';
import { DownloadIcon, FileTextIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center text-on-background mb-12">{children}</h2>
);

interface DownloadItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  buttonText: string;
}

const DownloadItem = ({ icon, title, description, fileType, fileSize, buttonText }: DownloadItemProps) => (
  <div className="bg-background p-6 rounded-lg border border-border-color flex items-center space-x-6 hover:border-accent hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out">
    <div className="flex-shrink-0 text-accent">
      {icon}
    </div>
    <div className="flex-grow">
      <h4 className="font-bold text-on-background text-lg mb-1">{title}</h4>
      <p className="text-on-surface text-sm">{description}</p>
    </div>
    <div className="text-right flex-shrink-0">
      <a 
        href={`/downloads/${title.toLowerCase().replace(/\s+/g, '-')}.pdf`}
        download
        className="inline-flex items-center justify-center bg-accent text-accent-text font-bold py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors duration-300 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-accent">
        <DownloadIcon className="w-5 h-5 mr-2" />
        {buttonText}
      </a>
      <p className="text-xs text-on-surface mt-2">{fileType} &bull; {fileSize}</p>
    </div>
  </div>
);

interface DownloadsProps {
  onNavigate?: (page: string) => void;
}

const Downloads = ({ onNavigate }: DownloadsProps) => {
    const { translations } = useLanguage();

    return (
        <section id="downloads" className="py-20 md:py-28 bg-surface">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle><span className="text-accent">{translations.downloads.title}</span></SectionTitle>
                <div className="space-y-6">
                    {translations.downloads.items.map((item, index) => 
                        <DownloadItem 
                            key={index}
                            icon={<FileTextIcon className="w-10 h-10" />}
                            {...item} 
                        />
                    )}
                </div>
                {onNavigate && (
                  <div className="mt-16 text-center">
                      <button 
                        type="button" 
                        onClick={() => onNavigate('downloads')}
                        className="inline-block bg-accent text-accent-text font-bold py-3 px-8 rounded-lg text-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-accent">
                          {translations.downloads.button}
                      </button>
                  </div>
                )}
            </div>
        </section>
    );
};

export default Downloads;