
import React from 'react';
import OnlineServices from '../components/OnlineServices';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const ServicesPage = ({ onNavigate }: ServicesPageProps) => {
  return (
    <div className="min-h-screen">
      <OnlineServices onNavigate={onNavigate} />
    </div>
  );
};

export default ServicesPage;