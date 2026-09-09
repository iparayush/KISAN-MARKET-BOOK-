import React from 'react';
import { Language, FarmerProfile, AuthUser } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  onChangeLanguage?: (lang: Language) => void;
  farmer: FarmerProfile;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
  onOpenHelpline: () => void;
  onOpenProfile: () => void;
  isVoiceActive: boolean;
  onToggleVoice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onChangeLanguage,
  farmer,
  currentUser,
  onLogout,
  onOpenHelpline,
  onOpenProfile,
  isVoiceActive,
  onToggleVoice,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-safe bg-[#faf8ff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
      {/* Indian National Tricolor Strip */}
      <div className="w-full flex h-1">
        <div className="w-1/3 bg-[#FF9933]" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-[#138808]" />
      </div>

      <div className="h-20 max-w-5xl mx-auto px-4 flex items-center justify-between gap-2">
        {/* Logo & Portal Brand */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={onOpenProfile}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary-container/10 p-1">
            <img
              alt="KisanProcure Emblem"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XptYHln5JukRlSLgfYNn-5e-bMjHlFVatCjC3T0veSqbZjB658G7-yBi1X5wY2hdmjmDfaM4at6Imaby8o69WOoG7XzvNg-OMwX3dqLwqQD4GDXe5CJszGl4TNqgfkpyezGyNS4fWUA59P5dFBpWv7iJrPfiOTaCMp40e-ucWk4wfUIfu8Ju5TFgQmsvb6C0ZGVyIcoNOgLCOV8bkpLlBRDE3MEc1rYdNtzAfv9m4eHJqT7onRfZf_bS0"
              onError={(e) => {
                // Fallback SVG leaf if offline
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-lg text-primary tracking-tight font-extrabold leading-none">
                KisanProcure
              </span>
              {currentUser && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono uppercase hidden sm:inline ${
                    currentUser.role === 'admin'
                      ? 'bg-slate-800 text-white'
                      : currentUser.role === 'operator'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {currentUser.role === 'admin'
                    ? 'DoCA प्रशासन'
                    : currentUser.role === 'operator'
                    ? language === 'hi'
                      ? 'केंद्र ऑपरेटर'
                      : language === 'mr'
                      ? 'काटा ऑपरेटर'
                      : 'APMC Operator'
                    : language === 'hi'
                    ? 'किसान'
                    : language === 'mr'
                    ? 'शेतकरी'
                    : 'Farmer'}
                </span>
              )}
            </div>
            <span className="text-[11px] text-on-surface-variant leading-tight font-medium">
              {language === 'hi'
                ? 'राष्ट्रीय कृषि खरीद पोर्टल'
                : language === 'mr'
                ? 'राष्ट्रीय शेती खरेदी पोर्टल'
                : 'National Agri-Procurement Portal'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Audio / Voice Guidance Toggle */}
          <button
            onClick={onToggleVoice}
            title={language === 'hi' ? 'आवाज सहायक' : language === 'mr' ? 'आवाज सहाय्यक' : 'Voice Assistant'}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
              isVoiceActive
                ? 'bg-primary text-on-primary shadow-sm scale-105'
                : 'bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
              {isVoiceActive ? 'volume_up' : 'volume_mute'}
            </span>
          </button>

          {/* 3-Language Selector: Marathi | Hindi | English */}
          <div className="h-9 p-0.5 rounded-full bg-surface-container flex items-center border border-outline-variant/30 shadow-2xs">
            <button
              onClick={() => (onChangeLanguage ? onChangeLanguage('mr') : onToggleLanguage())}
              className={`px-2 py-1 rounded-full text-[11px] font-bold transition-all ${
                language === 'mr'
                  ? 'bg-primary text-on-primary shadow-2xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="मराठी (Marathi)"
            >
              म
            </button>
            <button
              onClick={() => (onChangeLanguage ? onChangeLanguage('hi') : onToggleLanguage())}
              className={`px-2 py-1 rounded-full text-[11px] font-bold transition-all ${
                language === 'hi'
                  ? 'bg-primary text-on-primary shadow-2xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="हिंदी (Hindi)"
            >
              हिं
            </button>
            <button
              onClick={() => (onChangeLanguage ? onChangeLanguage('en') : onToggleLanguage())}
              className={`px-2 py-1 rounded-full text-[11px] font-bold transition-all ${
                language === 'en'
                  ? 'bg-primary text-on-primary shadow-2xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Emergency Kisan Helpline */}
          <button
            onClick={onOpenHelpline}
            aria-label="Emergency Kisan Helpline"
            title={language === 'hi' ? 'किसान सहायता केंद्र' : language === 'mr' ? 'शेतकरी मदत कक्ष' : 'Farmer Helpline'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center hover:bg-error hover:text-on-error active:scale-95 transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">call</span>
          </button>

          {/* Farmer Profile Avatar */}
          <button
            onClick={onOpenProfile}
            title={currentUser ? (language === 'hi' ? currentUser.nameHi || currentUser.nameMr : currentUser.nameMr) : farmer.nameMr}
            className="relative flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary active:scale-95 transition-transform"
          >
            <img
              alt={currentUser ? currentUser.nameMr : farmer.nameMr}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-1 ring-outline-variant"
              src={currentUser?.avatarUrl || farmer.avatarUrl}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface" />
          </button>

          {/* Quick Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              title={language === 'hi' ? 'लॉगआउट / खाता बदलें' : language === 'mr' ? 'लॉगआउट / खाते बदला' : 'Logout / Switch Account'}
              className="h-9 px-2 rounded-xl bg-surface-container hover:bg-red-50 hover:text-red-700 text-on-surface-variant flex items-center gap-1 text-xs font-bold transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span className="hidden md:inline">
                {language === 'hi' ? 'लॉगआउट' : language === 'mr' ? 'लॉगआउट' : 'Logout'}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
