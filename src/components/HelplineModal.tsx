import React from 'react';
import { Language } from '../types';

interface HelplineModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const HelplineModal: React.FC<HelplineModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const contacts = [
    {
      titleMr: 'राष्ट्रीय किसान कॉल सेंटर (Toll-Free)',
      titleEn: 'Kisan Call Centre (Toll-Free)',
      number: '18001801551',
      display: '1800-180-1551',
      descMr: '२४/७ कृषी व हमीभाव शासकीय सहाय्य',
      descEn: '24/7 National Agri & MSP Support',
      icon: 'support_agent',
    },
    {
      titleMr: 'नाशिक APMC नियंत्रण कक्ष',
      titleEn: 'Nashik APMC Control Room',
      number: '02532512991',
      display: '0253-2512991',
      descMr: 'गेट ३ व वजन काटा चौकशी',
      descEn: 'Gate 3 & Weighbridge Desk',
      icon: 'storefront',
    },
    {
      titleMr: 'गुणवत्ता व ओलावा तपासणी अधिकारी',
      titleEn: 'Quality & Moisture Officer',
      number: '9422281902',
      display: '+91 94222 81902',
      descMr: 'डॉ. व्ही. पाटील (प्रतवारी वाद निवारण)',
      descEn: 'Dr. V. Patil (Grading Grievance)',
      icon: 'verified',
    },
    {
      titleMr: 'शेतकरी DBT पेमेंट हेल्पलाईन',
      titleEn: 'DBT Bank Payment Support',
      number: '18002334526',
      display: '1800-233-4526',
      descMr: 'बँक ऑफ महाराष्ट्र थेट निधी मदत',
      descEn: 'Bank of Maharashtra Direct Fund Desk',
      icon: 'payments',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md p-5 border border-outline-variant/40 shadow-xl flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">call</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-on-surface">
                {language === 'mr' ? 'शेतकरी मदत व संपर्क कक्ष' : 'Farmer Support & Helplines'}
              </h2>
              <span className="text-[11px] text-on-surface-variant">
                {language === 'mr' ? 'तात्काळ संपर्क व तक्रार निवारण' : 'Immediate Assistance & Grievance'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col space-y-2.5">
          {contacts.map((c, i) => (
            <div
              key={i}
              className="p-3 rounded-xl border border-outline-variant/30 bg-surface-container-low flex items-center justify-between hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">{c.icon}</span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-on-surface">
                    {language === 'mr' ? c.titleMr : c.titleEn}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">
                    {language === 'mr' ? c.descMr : c.descEn}
                  </p>
                  <span className="text-xs font-mono font-bold text-primary block mt-0.5">
                    {c.display}
                  </span>
                </div>
              </div>

              <a
                href={`tel:${c.number}`}
                className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container shadow-xs active:scale-95 transition-all flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">phone</span>
              </a>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high"
        >
          {language === 'mr' ? 'बंद करा' : 'Close'}
        </button>
      </div>
    </div>
  );
};
