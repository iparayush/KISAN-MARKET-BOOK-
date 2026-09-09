import React from 'react';
import { FarmerProfile, Language, AuthUser } from '../types';

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
      ? language === 'mr'
        ? 'DoCA शासकीय अधिकारी'
        : 'DoCA Govt Official'
      : currentUser?.role === 'operator'
      ? language === 'mr'
        ? 'APMC केंद्र ऑपरेटर'
        : 'APMC Centre Operator'
      : language === 'mr'
      ? 'नोंदणीकृत शेतकरी'
      : 'Registered Farmer';

  const displayName = currentUser ? (language === 'mr' ? currentUser.nameMr : currentUser.nameEn) : farmer.nameMr;
  const displayId = currentUser?.id || farmer.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md p-5 border border-outline-variant/40 shadow-xl flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-on-surface">
              {language === 'mr' ? 'खाते प्रोफाइल (Account Profile)' : 'Account Profile'}
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
              {currentUser?.designationMr || (isFarmer ? farmer.nameEn : 'अधिकृत वापरकर्ता')}
            </span>
            <span className="text-xs font-mono font-bold text-primary mt-0.5">
              ID: {displayId}
            </span>
          </div>
        </div>

        {/* Status Chips */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20 flex flex-col">
            <span className="text-[10px] text-on-surface-variant">सुरक्षित प्रमाणीकरण</span>
            <span className="font-bold text-green-700 mt-0.5">● सक्रिय (Active Session)</span>
          </div>

          <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20 flex flex-col">
            <span className="text-[10px] text-on-surface-variant">लॉगिन वेळ (Login Time)</span>
            <span className="font-bold text-primary mt-0.5 font-mono">
              {currentUser?.loginTime || '१०:१५ AM'}
            </span>
          </div>
        </div>

        {/* Detailed Info List */}
        {isFarmer ? (
          <div className="flex flex-col space-y-2 text-xs divide-y divide-outline-variant/20">
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">गाव व तालुका:</span>
              <span className="font-semibold text-on-surface">{farmer.village}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">जिल्हा व राज्य:</span>
              <span className="font-semibold text-on-surface">{farmer.district}, {farmer.state}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">मोबाईल क्रमांक:</span>
              <span className="font-mono font-semibold text-on-surface">{farmer.phone}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">संलग्न बँक खाते:</span>
              <div className="text-right">
                <span className="font-semibold text-on-surface block">{farmer.bankName}</span>
                <span className="font-mono text-on-surface-variant">{farmer.bankAccount}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-2 text-xs divide-y divide-outline-variant/20">
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">खरेदी केंद्र / कार्यालय:</span>
              <span className="font-semibold text-on-surface text-right">
                {currentUser?.centreNameMr || 'ग्राहक व्यवहार विभाग (DoCA), नवी दिल्ली'}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">अधिकार पद:</span>
              <span className="font-semibold text-on-surface">
                {currentUser?.designationMr || 'अधिकृत नोडल अधिकारी'}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-on-surface-variant">सिस्टम ऍक्सेस स्तर:</span>
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
              <span>{language === 'mr' ? 'लॉगआउट करा' : 'Sign Out'}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs active:scale-95 transition-all"
          >
            {language === 'mr' ? 'बंद करा' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
