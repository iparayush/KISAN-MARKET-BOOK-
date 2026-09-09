import React from 'react';
import { Language } from '../types';

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const WeatherModal: React.FC<WeatherModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md p-5 border border-outline-variant/40 shadow-xl flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-secondary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              wb_sunny
            </span>
            <div>
              <h2 className="text-base font-bold text-on-surface">
                {language === 'mr' ? 'कृषी हवामान सल्ला व केंद्र वेळ' : 'Agri Weather Advisory'}
              </h2>
              <span className="text-[11px] text-on-surface-variant">
                नाशिक विभाग • भारतीय हवामान खाते (IMD)
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

        {/* Current Weather Card */}
        <div className="bg-secondary-fixed text-on-secondary-fixed rounded-xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs uppercase font-bold opacity-80 block">आजचे हवामान (Nashik)</span>
            <span className="text-3xl font-headline font-extrabold">31°C</span>
            <span className="text-xs font-semibold block mt-0.5">स्वच्छ ऊन • धान्य वाळवणीस उत्तम</span>
          </div>
          <span className="material-symbols-outlined text-[48px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            sunny
          </span>
        </div>

        {/* Advisory Tips */}
        <div className="flex flex-col space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">
              check_circle
            </span>
            <p className="text-on-surface leading-relaxed">
              <strong>सोयाबीन ओलावा सल्ला:</strong> आज कडक ऊन असल्याने पिकातील ओलावा १२% च्या आत राहण्यास मदत होईल. खरेदी केंद्रावर माल आणण्यापूर्वी १ तास ताडपत्रीवर उन्हात पसरवा.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0">
              schedule
            </span>
            <p className="text-on-surface leading-relaxed">
              <strong>केंद्राची वेळ:</strong> नाशिक APMC केंद्र आज दुपारी ५:०० वाजेपर्यंत टोकनधारकांसाठी सुरू राहील. दुपारी २ ते ३ दरम्यान कमीत कमी गर्दी असते.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs"
        >
          {language === 'mr' ? 'समजले' : 'Close'}
        </button>
      </div>
    </div>
  );
};
