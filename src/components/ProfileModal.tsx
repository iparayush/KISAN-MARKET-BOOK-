import React from 'react';
import { FarmerProfile, Language, AuthUser } from '../types';
import { t } from '../utils/i18n';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmer: FarmerProfile;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
  language: Language;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  farmer,
  currentUser,
  onLogout,
  language,
}) => {
  if (!isOpen) return null;

  const isFarmer = !currentUser || currentUser.role === 'farmer';
  const roleName =
    currentUser?.role === 'admin'
      ? t(language, 'DoCA शासकीय अधिकारी', 'DoCA सरकारी अधिकारी', 'DoCA Govt Official')
      : currentUser?.role === 'operator'
      ? t(language, 'APMC केंद्र ऑपरेटर', 'APMC केंद्र ऑपरेटर', 'APMC Centre Operator')
      : t(language, 'नोंदणीकृत शेतकरी', 'पंजीकृत किसान', 'Registered Farmer');

  const displayName = currentUser
    ? language === 'hi'
      ? currentUser.nameHi || currentUser.nameMr
      : language === 'mr'
      ? currentUser.nameMr
      : currentUser.nameEn
    : language === 'hi'
    ? 'रमेश पाटिल'
    : language === 'mr'
    ? farmer.nameMr
    : farmer.nameEn;

  const displayDesignation =
    currentUser?.role === 'admin'
      ? t(language, 'संचालक, ग्राहक व्यवहार विभाग (DoCA)', 'निदेशक, उपभोक्ता मामले विभाग (DoCA)', 'Director, Dept of Consumer Affairs (DoCA)')
      : currentUser?.role === 'operator'
      ? t(language, 'वरिष्ठ वजन काटा व प्रतवारी ऑपरेटर', 'वरिष्ठ धर्मकांटा व ग्रेडिंग ऑपरेटर', 'Senior Weighbridge & Grading Officer')
      : isFarmer
      ? (language === 'hi' ? 'सोयाबीन उत्पादक शेतकरी' : farmer.nameEn)
      : t(language, 'अधिकृत वापरकर्ता', 'अधिकृत उपयोगकर्ता', 'Authorized User');

  const displayId = currentUser?.id || farmer.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md p-5 border border-outline-variant/40 shadow-xl flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-on-surface">
              {t(language, 'खाते प्रोफाइल', 'खाता प्रोफ़ाइल', 'Account Profile')}
            </h2>
            <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
              {roleName}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            ✕
          </button>
        </div>

        {/* User Badge Hero */}
        <div className="flex items-center space-x-3.5 bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30">
          <img
            alt={displayName}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-primary"
            src={currentUser?.avatarUrl || farmer.avatarUrl}
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="text-base font-bold text-on-surface">{displayName}</span>
              <span
                className="material-symbols-outlined text-[18px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <span className="text-xs text-on-surface-variant">
              {displayDesignation}
            </span>
            <span className="text-xs font-mono font-bold text-primary mt-0.5">
              ID: {displayId}
            </span>
          </div>
        </div>

        {/* Status Chips */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20 flex flex-col">
            <span className="text-[10px] text-on-surface-variant">
              {t(language, 'सुरक्षित प्रमाणीकरण', 'सुरक्षित प्रमाणीकरण', 'Secure Auth')}
            </span>
            <span className="font-bold text-green-700 mt-0.5">
              ● {t(language, 'सक्रिय सत्र (Active)', 'सक्रिय सत्र (Active)', 'Active Session')}
            </span>
          </div>

          <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20 flex flex-col">
            <span className="text-[10px] text-on-surface-variant">
              {t(language, 'लॉगिन वेळ', 'लॉगिन समय', 'Login Time')}
            </span>
            <span className="font-bold text-primary mt-0.5 font-mono">
              {currentUser?.loginTime || '१०:१५ AM'}
            </span>
          </div>
        </div>

        {/* Detailed Info List */}
        {isFarmer ? (
          <div className="flex flex-col space-y-2 text-xs divide-y divide-outline-variant/20">
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">{t(language, 'गाव व तालुका:', 'गाँव व तहसील:', 'Village & Tehsil:')}</span>
              <span className="font-semibold text-on-surface">{farmer.village}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">{t(language, 'जिल्हा व राज्य:', 'जिला व राज्य:', 'District & State:')}</span>
              <span className="font-semibold text-on-surface">{farmer.district}, {farmer.state}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">{t(language, 'मोबाईल क्रमांक:', 'मोबाइल नंबर:', 'Mobile Number:')}</span>
              <span className="font-mono font-semibold text-on-surface">{farmer.phone}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">{t(language, 'संलग्न बँक खाते:', 'संबद्ध बैंक खाता:', 'Linked Bank Account:')}</span>
              <div className="text-right">
                <span className="font-semibold text-on-surface block">{farmer.bankName}</span>
                <span className="font-mono text-on-surface-variant">{farmer.bankAccount}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-2 text-xs divide-y divide-outline-variant/20">
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">{t(language, 'खरेदी केंद्र / कार्यालय:', 'खरीद केंद्र / कार्यालय:', 'Procurement Centre:')}</span>
              <span className="font-semibold text-on-surface text-right">
                {language === 'hi'
                  ? currentUser?.centreNameHi || currentUser?.centreNameMr || 'उपभोक्ता मामले विभाग (DoCA), नई दिल्ली'
                  : language === 'mr'
                  ? currentUser?.centreNameMr || 'ग्राहक व्यवहार विभाग (DoCA), नवी दिल्ली'
                  : currentUser?.centreNameEn || 'Dept of Consumer Affairs (DoCA), New Delhi'}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">{t(language, 'अधिकार पद:', 'पदनाम:', 'Designation:')}</span>
              <span className="font-semibold text-on-surface">
                {displayDesignation}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">{t(language, 'सिस्टम ऍक्सेस स्तर:', 'सिस्टम एक्सेस स्तर:', 'System Access Level:')}</span>
              <span className="font-mono font-bold text-green-700">Tier-1 Full Privilege</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          {onLogout && (
            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="flex-1 h-11 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>{t(language, 'लॉगआउट करा', 'लॉग आउट करें', 'Sign Out')}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs active:scale-95 transition-all"
          >
            {t(language, 'बंद करा', 'बंद करें', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
};
