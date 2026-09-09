import React from 'react';
import { UserRole, Language, AuthUser } from '../types';

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
      ? (language === 'mr' ? 'शेतकरी पोर्टल' : 'Farmer Portal')
      : currentRole === 'operator'
      ? (language === 'mr' ? 'केंद्र ऑपरेटर' : 'Centre Desk')
      : (language === 'mr' ? 'DoCA प्रशासन' : 'Govt Admin');

  return (
    <div className="w-full bg-surface-container-high/90 backdrop-blur-md border-b border-outline-variant/30 py-1.5 px-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* SIH Hackathon & Role Indicator */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="px-2 py-0.5 rounded-md bg-primary text-on-primary font-mono font-black text-[10px] tracking-wider shadow-xs">
            SIH 2026 #26032
          </span>
          <span className="text-on-surface-variant font-medium text-[11px] hidden sm:inline">
            {language === 'mr'
              ? 'ग्राहक व्यवहार व सार्वजनिक वितरण मंत्रालय (DoCA)'
              : 'Dept of Consumer Affairs (DoCA)'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold text-[11px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              {currentRole === 'farmer' ? 'agriculture' : currentRole === 'operator' ? 'point_of_sale' : 'admin_panel_settings'}
            </span>
            <span>{roleLabel}</span>
            {currentRole === 'farmer' && (
              <span className="font-mono text-[10px] opacity-85">({tokenNumber})</span>
            )}
          </span>
          {currentUser && (
            <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-800 font-bold text-[10px] hidden md:inline">
              ● {currentUser.nameMr}
            </span>
          )}
        </div>

        {/* Non-Smartphone Tools & Logout */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenInclusiveAccess}
            title={language === 'mr' ? 'बिना स्मार्टफोन सुविधा' : 'Non-Smartphone Access'}
            className="text-[11px] font-bold text-primary flex items-center gap-1 hover:underline py-0.5 px-1.5 rounded bg-primary/10"
          >
            <span className="material-symbols-outlined text-[14px]">phone_iphone</span>
            <span>{language === 'mr' ? 'SMS / IVR' : 'SMS • IVR'}</span>
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              title={language === 'mr' ? 'लॉगआउट करा' : 'Sign out'}
              className="text-[11px] font-bold text-slate-600 hover:text-red-700 flex items-center gap-0.5 py-0.5 px-1.5 rounded hover:bg-red-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">logout</span>
              <span>{language === 'mr' ? 'लॉगआउट' : 'Logout'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
