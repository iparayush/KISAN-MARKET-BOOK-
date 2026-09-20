import React from 'react';
import { Language } from '../types';

interface VoiceAssistToastProps {
  isActive: boolean;
  messageMr: string;
  messageEn: string;
  language: Language;
  onClose: () => void;
}

export const VoiceAssistToast: React.FC<VoiceAssistToastProps> = ({
  isActive,
  messageMr,
  messageEn,
  language,
  onClose,
}) => {
  if (!isActive) return null;

  return (
    <div className="fixed top-24 inset-x-4 max-w-md mx-auto z-50 animate-bounce">
      <div className="bg-primary text-on-primary rounded-2xl p-3.5 shadow-xl border border-primary-container flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-primary-fixed tracking-wider">
              {language === 'mr' ? 'आवाज सहाय्यक (Voice Guidance)' : 'Voice Assistant'}
            </span>
            <p className="text-xs font-semibold leading-tight mt-0.5">
              {language === 'mr' ? messageMr : messageEn}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
