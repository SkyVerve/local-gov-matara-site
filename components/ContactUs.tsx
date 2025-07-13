
import React from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-center text-on-background mb-12">{children}</h2>
);

interface ContactDetailProps {
    icon: React.ReactNode;
    title: string;
    lines: string[];
    isPhone?: boolean;
    isEmail?: boolean;
}

const ContactDetail = ({ icon, title, lines, isPhone, isEmail }: ContactDetailProps) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 bg-background rounded-full p-3 mt-1">
            {icon}
        </div>
        <div>
            <h4 className="text-xl font-semibold text-on-background">{title}</h4>
            {lines.map((line, index) => {
                if (isPhone) {
                    return (
                        <a href={`tel:${line.replace(/\s/g, '')}`} key={index} className="text-on-surface hover:text-accent transition-colors duration-200 block">
                           {line}
                       </a>
                    );
                }
                if (isEmail) {
                     return (
                        <a href={`mailto:${line}`} key={index} className="text-on-surface hover:text-accent transition-colors duration-200 block">
                           {line}
                       </a>
                    );
                }
                return (
                    <p key={index} className="text-on-surface">{line}</p>
                );
            })}
        </div>
    </div>
);

const ContactUs = () => {
    const { translations } = useLanguage();
    
    const contactIcons = [
        <MapPinIcon className="w-6 h-6 text-accent" />,
        <PhoneIcon className="w-6 h-6 text-accent" />,
        <MailIcon className="w-6 h-6 text-accent" />,
        <ClockIcon className="w-6 h-6 text-accent" />
    ];

    const contactDetails = translations.contact.details.map((detail, index) => ({
        icon: contactIcons[index],
        title: detail.title,
        lines: detail.lines,
    }));

    return (
        <section id="contact" className="py-20 md:py-28 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle><span className="text-accent">{translations.contact.title}</span></SectionTitle>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8 flex flex-col justify-center">
                        {contactDetails.map((detail, index) => (
                            <ContactDetail key={index} {...detail} isPhone={index === 1} isEmail={index === 2} />
                        ))}
                    </div>
                    <div className="bg-background rounded-lg border border-border-color overflow-hidden min-h-[450px]">
                         <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.9080781745244!2d80.53871182836239!3d5.952526836348737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae13f010041a72d%3A0x7059795c6978413b!2sAssistant%20Commissioner%20of%20Local%20Government%20Office%2C%20Matara!5e0!3m2!1sen!2slk"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map of Assistant Commissioner of Local Government Office, Matara"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;