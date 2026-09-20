import React from 'react';
import { UserRole, Language, AuthUser } from '../types';
import { t } from '../utils/i18n';

interface RoleSwitchBannerProps {
  currentRole: UserRole;
  onSelectRole?: (role: UserRole) => void;
  language: Language;
  onOpenInclusiveAccess: () => void;
  tokenNumber: string;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const RoleSwitchBanner: React.FC<RoleSwitchBannerProps> = ({
  currentRole,
  language,
  onOpenInclusiveAccess,
  tokenNumber,
  currentUser,
  onLogout,
}) => {
  const roleLabel =
    currentRole === 'farmer'
      ? t(language, 'शेतकरी पोर्टल', 'किसान पोर्टल', 'Farmer Portal')
      : currentRole === 'operator'
      ? t(language, 'केंद्र ऑपरेटर', 'केंद्र ऑपरेटर', 'Centre Desk')
      : t(language, 'DoCA प्रशासन', 'DoCA प्रशासन', 'Govt Admin');

  const currentUserName =
    language === 'hi'
      ? currentUser?.nameHi || currentUser?.nameMr
      : language === 'mr'
      ? currentUser?.nameMr
      : currentUser?.nameEn;

  return (
    <div className="w-full bg-surface-container-high/90 backdrop-blur-md border-b border-outline-variant/30 py-1 sm:py-1.5 px-2.5 sm:px-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
        {/* SIH Hackathon & Role Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs min-w-0 overflow-hidden">
          <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-primary text-on-primary font-mono font-black text-[9px] sm:text-[10px] tracking-wider shadow-xs flex-shrink-0">
            SIH 2026
          </span>
          <span className="text-on-surface-variant font-medium text-[11px] hidden sm:inline truncate">
            {t(
              language,
              'ग्राहक व्यवहार व सार्वजनिक वितरण मंत्रालय (DoCA)',
              'उपभोक्ता मामले व सार्वजनिक वितरण मंत्रालय (DoCA)',
              'Dept of Consumer Affairs (DoCA)'
            )}
          </span>
          <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold text-[10px] sm:text-[11px] flex items-center gap-1 flex-shrink-0">
            <span className="material-symbols-outlined text-[13px] sm:text-[14px]">
              {currentRole === 'farmer' ? 'agriculture' : currentRole === 'operator' ? 'point_of_sale' : 'admin_panel_settings'}
            </span>
            <span>{roleLabel}</span>
            {currentRole === 'farmer' && (
              <span className="font-mono text-[9px] sm:text-[10px] opacity-85">({tokenNumber})</span>
            )}
          </span>
          {currentUser && currentUserName && (
            <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-800 font-bold text-[10px] hidden md:inline truncate">
              ● {currentUserName}
            </span>
          )}
        </div>

        {/* Non-Smartphone Tools & Logout */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={onOpenInclusiveAccess}
            title={t(language, 'बिना स्मार्टफोन सुविधा', 'गैर-स्मार्टफोन सुविधा', 'Non-Smartphone Access')}
            className="text-[10px] sm:text-[11px] font-bold text-primary flex items-center gap-1 hover:underline py-0.5 px-1.5 rounded bg-primary/10"
          >
            <span className="material-symbols-outlined text-[13px] sm:text-[14px]">phone_iphone</span>
            <span>{t(language, 'SMS / IVR', 'SMS / IVR', 'SMS • IVR')}</span>
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              title={t(language, 'लॉगआउट करा', 'लॉग आउट करें', 'Sign out')}
              className="text-[11px] font-bold text-slate-600 hover:text-red-700 flex items-center gap-0.5 py-0.5 px-1.5 rounded hover:bg-red-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">logout</span>
              <span>{t(language, 'लॉगआउट', 'लॉग आउट', 'Logout')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
