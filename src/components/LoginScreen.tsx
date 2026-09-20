import React, { useState } from 'react';
import { Language, UserRole, AuthUser } from '../types';
import { INITIAL_FARMER } from '../data/mockData';
import { t } from '../utils/i18n';

interface LoginScreenProps {
  language: Language;
  onToggleLanguage: () => void;
  onChangeLanguage?: (lang: Language) => void;
  onLoginSuccess: (user: AuthUser) => void;
  onOpenHelpline: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  language,
  onToggleLanguage,
  onChangeLanguage,
  onLoginSuccess,
  onOpenHelpline,
}) => {
  const [activeTab, setActiveTab] = useState<UserRole>('farmer');

  // Farmer login state
  const [farmerLoginMode, setFarmerLoginMode] = useState<'mobile' | 'aadhaar'>('mobile');
  const [mobileNumber, setMobileNumber] = useState<string>('9822451092');
  const [aadhaarNumber, setAadhaarNumber] = useState<string>('7842-9901-4829');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');
  const [simulatedOtp, setSimulatedOtp] = useState<string>('482910');
  const [otpTimer, setOtpTimer] = useState<number>(45);

  // Operator login state
  const [operatorId, setOperatorId] = useState<string>('OPR-NSK-042');
  const [operatorPin, setOperatorPin] = useState<string>('2603');
  const [selectedMandi, setSelectedMandi] = useState<string>('nashik-main');

  // Admin login state
  const [adminId, setAdminId] = useState<string>('DOCA-HQ-9901');
  const [adminPassword, setAdminPassword] = useState<string>('admin@sih2026');
  const [captchaInput, setCaptchaInput] = useState<string>('7K9P');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handle send OTP
  const handleSendOtp = () => {
    if (mobileNumber.trim().length < 10) {
      setErrorMessage(
        t(
          language,
          'कृपया वैध १० अंकी मोबाईल क्रमांक प्रविष्ट करा',
          'कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें',
          'Please enter a valid 10-digit mobile number'
        )
      );
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setSimulatedOtp('482910');
      setOtpTimer(45);
    }, 600);
  };

  // Farmer authentication submit
  const handleFarmerLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (farmerLoginMode === 'mobile') {
      if (!otpSent) {
        handleSendOtp();
        return;
      }
      if (otpCode.trim().length < 4) {
        setErrorMessage(
          t(
            language,
            'कृपया ४ ते ६ अंकी OTP टाका',
            'कृपया प्राप्त 4 से 6 अंकों का OTP दर्ज करें',
            'Please enter the OTP received'
          )
        );
        return;
      }
    } else {
      if (aadhaarNumber.replace(/\D/g, '').length < 12) {
        setErrorMessage(
          t(
            language,
            'कृपया वैध १२ अंकी आधार क्रमांक टाका',
            'कृपया वैध 12 अंकों का आधार नंबर दर्ज करें',
            'Please enter valid 12-digit Aadhaar'
          )
        );
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: AuthUser = {
        id: INITIAL_FARMER.id,
        role: 'farmer',
        nameMr: INITIAL_FARMER.nameMr,
        nameHi: 'रमेश पाटिल',
        nameEn: INITIAL_FARMER.nameEn,
        identifier: farmerLoginMode === 'mobile' ? `+91 ${mobileNumber}` : aadhaarNumber,
        phone: INITIAL_FARMER.phone,
        avatarUrl: INITIAL_FARMER.avatarUrl,
        centreNameMr: 'नाशिक कृषी उत्पन्न बाजार समिती (APMC)',
        centreNameHi: 'नासिक कृषि उपज मंडी समिति (APMC)',
        centreNameEn: 'Nashik APMC Agricultural Market',
        tokenNumber: '#027',
        loginTime: new Date().toLocaleTimeString(),
      };
      onLoginSuccess(user);
    }, 750);
  };

  // Operator authentication submit
  const handleOperatorLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!operatorId.trim() || !operatorPin.trim()) {
      setErrorMessage(
        t(
          language,
          'कृपया ऑपरेटर आयडी व पिन प्रविष्ट करा',
          'कृपया ऑपरेटर आईडी व पिन दर्ज करें',
          'Please enter Operator ID and PIN'
        )
      );
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: AuthUser = {
        id: operatorId,
        role: 'operator',
        nameMr: 'विशाल जाधव (काटा ऑपरेटर)',
        nameHi: 'विशाल जाधव (कांटा ऑपरेटर)',
        nameEn: 'Vishal Jadhav (Weighbridge Operator)',
        identifier: operatorId,
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB3n52i_4zXJjZf3-z_wQZ3R-1i4oX2l-tE3m1Q?auto=format&fit=crop&w=120&h=120',
        centreId: selectedMandi,
        centreNameMr: 'नाशिक कृषी उत्पन्न बाजार समिती (APMC) - काटा क्र. २',
        centreNameHi: 'नासिक कृषि उपज मंडी समिति (APMC) - कांटा क्र. २',
        centreNameEn: 'Nashik APMC Market - Weighbridge #2',
        designationMr: 'वरिष्ठ वजन काटा व प्रतवारी ऑपरेटर',
        designationHi: 'वरिष्ठ धर्मकांटा व ग्रेडिंग ऑपरेटर',
        designationEn: 'Senior Weighbridge & Grading Officer',
        loginTime: new Date().toLocaleTimeString(),
      };
      onLoginSuccess(user);
    }, 600);
  };

  // Admin authentication submit
  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!adminId.trim() || !adminPassword.trim()) {
      setErrorMessage(
        t(
          language,
          'कृपया अधिकारी आयडी व पासवर्ड प्रविष्ट करा',
          'कृपया अधिकारी आईडी व पासवर्ड दर्ज करें',
          'Please enter Officer ID and Password'
        )
      );
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: AuthUser = {
        id: adminId,
        role: 'admin',
        nameMr: 'डॉ. आनंद सावंत (भा.प्र.से.)',
        nameHi: 'डॉ. आनंद सावंत (भा.प्र.से.)',
        nameEn: 'Dr. Anand Sawant (IAS)',
        identifier: adminId,
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCL3a2z_4mNxYf3_zAwQZ3R1i4oX2ltE3m1Q?auto=format&fit=crop&w=120&h=120',
        designationMr: 'संचालक, ग्राहक व्यवहार विभाग (DoCA)',
        designationHi: 'निदेशक, उपभोक्ता मामले विभाग (DoCA)',
        designationEn: 'Director, Dept of Consumer Affairs (DoCA)',
        loginTime: new Date().toLocaleTimeString(),
      };
      onLoginSuccess(user);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex flex-col justify-between selection:bg-primary selection:text-white">
      {/* Top Indian Tricolor Strip */}
      <div className="w-full flex h-1.5 fixed top-0 inset-x-0 z-50">
        <div className="w-1/3 bg-[#FF9933]" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-[#138808]" />
      </div>

      {/* Top Portal Navigation Bar */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-1.5 z-40 px-4 py-2.5 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center p-1.5 shadow-xs">
              <span className="material-symbols-outlined text-[26px] text-green-700">agriculture</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-slate-900 font-headline tracking-tight leading-tight">
                  KisanProcure
                </h1>
                <span className="px-1.5 py-0.2 rounded bg-green-100 text-green-800 text-[10px] font-bold font-mono">
                  SIH #26032
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {t(
                  language,
                  'ग्राहक व्यवहार विभाग (DoCA) • भारत सरकार',
                  'उपभोक्ता मामले विभाग (DoCA) • भारत सरकार',
                  'Dept of Consumer Affairs (DoCA) • Govt of India'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 3-Language Selector */}
            <div className="h-9 p-0.5 rounded-full bg-slate-100 flex items-center border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => (onChangeLanguage ? onChangeLanguage('mr') : onToggleLanguage())}
                className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'mr'
                    ? 'bg-green-700 text-white shadow-2xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                title="मराठी"
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => (onChangeLanguage ? onChangeLanguage('hi') : onToggleLanguage())}
                className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'hi'
                    ? 'bg-green-700 text-white shadow-2xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                title="हिंदी"
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => (onChangeLanguage ? onChangeLanguage('en') : onToggleLanguage())}
                className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-green-700 text-white shadow-2xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Helpline quick button */}
            <button
              onClick={onOpenHelpline}
              title={t(language, 'शेतकरी मदत कक्ष', 'किसान सहायता केंद्र', 'Farmer Helpline')}
              className="h-9 px-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1 transition-all border border-red-200"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span className="hidden sm:inline">1800-180-1551</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="flex-1 max-w-xl w-full mx-auto p-4 flex flex-col justify-center my-4 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col">
          {/* Header Banner */}
          <div className="p-6 bg-gradient-to-br from-[#0f281e] via-[#1b4332] to-[#2d6a4f] text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-black text-green-300 font-mono">
                  {t(
                    language,
                    'अधिकृत शासकीय खरेदी पोर्टल',
                    'आधिकारिक राष्ट्रीय खरीद पोर्टल',
                    'Official National MSP Portal'
                  )}
                </span>
                <h2 className="text-xl md:text-2xl font-black font-headline mt-1">
                  {t(language, 'प्रवेश करा / Login', 'लॉग इन करें / Login', 'Sign In to Portal')}
                </h2>
                <p className="text-xs text-green-100/90 mt-1 max-w-md leading-relaxed">
                  {t(
                    language,
                    'थेट हमीभाव खरेदी, डिजिटल वजन काटा रांग व थेट बँक जमा (DBT) ट्रॅकिंग',
                    'प्रत्यक्ष MSP खरीद, डिजिटल धर्मकांटा कतार व प्रत्यक्ष बैंक हस्तांतरण (DBT) ट्रैकिंग',
                    'Smart MSP Procurement, Live APMC Weighbridge Queue & Instant DBT Payouts'
                  )}
                </p>
              </div>
              <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner flex-shrink-0">
                <span className="material-symbols-outlined text-[28px] text-green-300">lock</span>
              </span>
            </div>
          </div>

          {/* 3 User Role Switch Tabs */}
          <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-bold p-1 gap-1">
            {/* Tab 1: Farmer */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('farmer');
                setErrorMessage('');
              }}
              className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                activeTab === 'farmer'
                  ? 'bg-white text-green-800 shadow-xs border border-slate-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-green-700">agriculture</span>
              <span>{t(language, 'शेतकरी प्रवेश', 'किसान प्रवेश', 'Farmer')}</span>
            </button>

            {/* Tab 2: APMC Operator */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('operator');
                setErrorMessage('');
              }}
              className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                activeTab === 'operator'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-emerald-700">point_of_sale</span>
              <span>{t(language, 'केंद्र ऑपरेटर', 'केंद्र ऑपरेटर', 'Centre Operator')}</span>
            </button>

            {/* Tab 3: DoCA Govt Admin */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setErrorMessage('');
              }}
              className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                activeTab === 'admin'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-slate-700">admin_panel_settings</span>
              <span>{t(language, 'DoCA प्रशासन', 'DoCA प्रशासन', 'Govt Admin')}</span>
            </button>
          </div>

          {/* Form Card Content */}
          <div className="p-6 flex flex-col space-y-5">
            {/* Error Notification Banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2 animate-shake">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* ================= TAB 1: FARMER LOGIN ================= */}
            {activeTab === 'farmer' && (
              <form onSubmit={handleFarmerLogin} className="flex flex-col space-y-4">
                {/* Mobile OTP vs Aadhaar Toggle */}
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setFarmerLoginMode('mobile')}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      farmerLoginMode === 'mobile'
                        ? 'bg-white text-green-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">smartphone</span>
                    <span>{t(language, 'मोबाईल OTP', 'मोबाइल OTP', 'Mobile OTP')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFarmerLoginMode('aadhaar')}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      farmerLoginMode === 'aadhaar'
                        ? 'bg-white text-green-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                    <span>{t(language, 'आधार KYC', 'आधार KYC', 'Aadhaar UID')}</span>
                  </button>
                </div>

                {/* Mobile Login Mode */}
                {farmerLoginMode === 'mobile' && (
                  <div className="flex flex-col space-y-3">
                    <label className="text-xs font-bold text-slate-700">
                      {t(language, 'नोंदणीकृत मोबाईल क्रमांक', 'पंजीकृत मोबाइल नंबर', 'Registered Mobile Number')}
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="h-12 px-3 rounded-xl bg-slate-100 border border-slate-300 flex items-center gap-1 text-xs font-bold text-slate-700 flex-shrink-0">
                        <span>🇮🇳 +91</span>
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="9822451092"
                        className="flex-1 h-12 px-4 rounded-xl border border-slate-300 focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white text-slate-900 text-sm font-mono font-bold tracking-wider outline-none transition-all"
                      />
                      {!otpSent && (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={isLoading}
                          className="h-12 px-4 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-bold flex-shrink-0 active:scale-95 transition-all shadow-xs"
                        >
                          {t(language, 'OTP मिळवा', 'OTP प्राप्त करें', 'Send OTP')}
                        </button>
                      )}
                    </div>

                    {/* OTP Received Section */}
                    {otpSent && (
                      <div className="bg-green-50/70 border border-green-200 p-3.5 rounded-2xl flex flex-col space-y-2.5 animate-fade-in">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-green-900 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-green-700">check_circle</span>
                            {t(language, 'OTP पाठवला गेला (+91 98224...)', 'OTP भेजा गया (+91 98224...)', 'OTP sent to mobile')}
                          </span>
                          <span className="font-mono text-slate-500">00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</span>
                        </div>

                        {/* Simulated OTP Helper Pill */}
                        <div className="bg-white p-2 rounded-xl border border-green-300 flex items-center justify-between">
                          <div className="text-[11px] text-slate-600">
                            <span>{t(language, 'चाचणी OTP कोड:', 'परीक्षण OTP कोड:', 'Demo OTP Code:')}</span>{' '}
                            <span className="font-mono font-black text-green-800 tracking-wider text-xs">
                              {simulatedOtp}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setOtpCode(simulatedOtp)}
                            className="px-2.5 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-[11px] font-bold active:scale-95 transition-all"
                          >
                            {t(language, 'ऑटो-भरा', 'स्वतः भरें', 'Auto-fill')}
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                            placeholder={t(language, '४ ते ६ अंकी OTP टाका', '4 से 6 अंकों का OTP दर्ज करें', 'Enter OTP')}
                            className="flex-1 h-11 px-3 rounded-xl border border-slate-300 focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white text-slate-900 text-sm font-mono font-bold tracking-widest text-center outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Aadhaar Login Mode */}
                {farmerLoginMode === 'aadhaar' && (
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-bold text-slate-700">
                      {t(language, 'शेतकऱ्याचा १२ अंकी आधार क्रमांक', 'किसान का 12 अंकों का आधार नंबर', 'Farmer 12-digit Aadhaar UID')}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        placeholder="7842-9901-4829"
                        className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white text-slate-900 text-sm font-mono font-bold tracking-wider outline-none"
                      />
                      <span className="absolute right-3 top-3 text-[11px] text-green-700 bg-green-100 px-2 py-0.5 rounded font-bold">
                        UIDAI
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {t(
                        language,
                        'आधार प्रमाणीकरणाने थेट बँक खात्यात (DBT) निधी जमा होण्यास मदत होते.',
                        'आधार प्रमाणीकरण से सीधे बैंक खाते में (DBT) भुगतान प्राप्त करने में मदद मिलती है।',
                        'Aadhaar authentication enables direct benefit transfer into bank accounts.'
                      )}
                    </p>
                  </div>
                )}

                {/* Login Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-green-700 hover:bg-green-800 text-white text-sm font-bold active:scale-98 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{t(language, 'पोर्टलवर प्रवेश करा', 'पोर्टल में प्रवेश करें', 'Verify & Sign In')}</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ================= TAB 2: APMC OPERATOR LOGIN ================= */}
            {activeTab === 'operator' && (
              <form onSubmit={handleOperatorLogin} className="flex flex-col space-y-4">
                <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-[20px]">verified_user</span>
                  <p>
                    {t(
                      language,
                      'वजन काटा, ओलावा तपासणी व जे-फॉर्म (J-Form) निर्मिती ऑपरेटर टर्मिनल.',
                      'धर्मकांटा, नमी जांच व जे-फॉर्म (J-Form) निर्माण ऑपरेटर टर्मिनल.',
                      'Authorized APMC terminal for electronic weighbridge & J-Form issuance.'
                    )}
                  </p>
                </div>

                {/* Mandi Selector */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {t(language, 'APMC खरेदी केंद्र निवडा', 'APMC खरीद केंद्र चुनें', 'Select APMC Centre')}
                  </label>
                  <select
                    value={selectedMandi}
                    onChange={(e) => setSelectedMandi(e.target.value)}
                    className="h-12 px-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 bg-white text-slate-900 text-xs font-bold outline-none"
                  >
                    <option value="nashik-main">नाशिक मुख्य APMC (Gate No. 3)</option>
                    <option value="dindori-sub">दिंडोरी उप-खरेदी केंद्र (Dindori)</option>
                    <option value="lasalgaon-apmc">लासलगाव कृषी बाजार (Lasalgaon)</option>
                    <option value="pimpalgaon-mandi">पिंपळगाव बसवंत मंडी</option>
                  </select>
                </div>

                {/* Operator ID */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {t(language, 'ऑपरेटर अधिकृत आयडी', 'ऑपरेटर स्टाफ आईडी', 'Operator Staff ID')}
                  </label>
                  <input
                    type="text"
                    value={operatorId}
                    onChange={(e) => setOperatorId(e.target.value)}
                    placeholder="OPR-NSK-042"
                    className="h-12 px-4 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 bg-white text-slate-900 text-xs font-mono font-bold outline-none"
                  />
                </div>

                {/* Operator 4-digit PIN */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {t(language, '४-अंकी सुरक्षा पिन (Terminal PIN)', '४-अंकीय सुरक्षा पिन (Terminal PIN)', '4-Digit Terminal PIN')}
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={operatorPin}
                    onChange={(e) => setOperatorPin(e.target.value)}
                    placeholder="••••"
                    className="h-12 px-4 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 bg-white text-slate-900 text-sm font-mono font-bold tracking-widest outline-none"
                  />
                </div>

                {/* Operator Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold active:scale-98 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{t(language, 'ऑपरेटर डेस्क सुरू करा', 'ऑपरेटर टर्मिनल शुरू करें', 'Open Operator Terminal')}</span>
                      <span className="material-symbols-outlined text-[18px]">terminal</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ================= TAB 3: DoCA GOVT ADMIN LOGIN ================= */}
            {activeTab === 'admin' && (
              <form onSubmit={handleAdminLogin} className="flex flex-col space-y-4">
                <div className="bg-slate-100 p-3 rounded-2xl border border-slate-300 text-xs text-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700 text-[20px]">shield</span>
                  <p>
                    {t(
                      language,
                      'DoCA राष्ट्रीय खरेदी नियंत्रण कक्ष • राज्य व जिल्हा समन्वय डॅशबोर्ड',
                      'DoCA केंद्रीय नियंत्रण कक्ष • राज्य व जिला समन्वय डैशबोर्ड',
                      'DoCA Central Command • National Procurement & Congestion Analytics'
                    )}
                  </p>
                </div>

                {/* Officer ID */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {t(language, 'शासकीय अधिकारी आयडी (SSO ID)', 'सरकारी अधिकारी आईडी (SSO ID)', 'DoCA Officer / NIC SSO ID')}
                  </label>
                  <input
                    type="text"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="DOCA-HQ-9901"
                    className="h-12 px-4 rounded-xl border border-slate-300 focus:border-slate-800 focus:ring-2 focus:ring-slate-200 bg-white text-slate-900 text-xs font-mono font-bold outline-none"
                  />
                </div>

                {/* Password with visibility toggle */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {t(language, 'सुरक्षित पासवर्ड', 'सुरक्षित पासवर्ड', 'Government Secure Password')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-slate-800 focus:ring-2 focus:ring-slate-200 bg-white text-slate-900 text-xs font-mono outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 text-xs font-bold"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* 2FA / Captcha confirmation */}
                <div className="flex items-center gap-2">
                  <div className="h-11 px-3 bg-slate-200 text-slate-800 font-mono font-bold text-sm tracking-widest flex items-center rounded-xl select-none line-through border border-slate-300">
                    7K9P
                  </div>
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder={t(language, 'कॅप्चा टाका', 'कैप्चा दर्ज करें', 'Enter Captcha')}
                    className="flex-1 h-11 px-3 rounded-xl border border-slate-300 text-xs font-mono font-bold outline-none uppercase"
                  />
                </div>

                {/* Admin Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold active:scale-98 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{t(language, 'कमांड सेंटरमध्ये प्रवेश करा', 'कमांड सेंटर में प्रवेश करें', 'Sign In as Officer')}</span>
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer Security Badges */}
          <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-around gap-3 text-center text-[10px] text-slate-500 font-bold">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-green-700">lock</span>
              <span>256-Bit SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-blue-700">account_balance</span>
              <span>PFMS DBT Integrated</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-amber-700">verified</span>
              <span>DoCA Certified</span>
            </div>
          </div>
        </div>

        {/* Live Portal Stats Ticker */}
        <div className="mt-4 p-3 rounded-2xl bg-white/80 backdrop-blur-xs border border-slate-200/80 shadow-xs flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span className="font-bold text-slate-800">
              {t(language, 'थेट खरेदी सत्र २०२६', 'लाइव खरीद सत्र 2026', 'Live Procurement Season 2026')}
            </span>
          </div>
          <span className="font-mono font-bold text-green-800">
            {t(language, '१,४८,२९०+ शेतकरी नोंदणीकृत', '1,48,290+ किसान पंजीकृत', '1,48,290+ Farmers Registered')}
          </span>
        </div>
      </main>

      {/* Official Government Footer */}
      <footer className="w-full bg-slate-900 text-slate-400 py-4 px-4 text-center text-[11px] border-t border-slate-800">
        <p>
          {t(
            language,
            '© २०२६ ग्राहक व्यवहार विभाग, अन्न आणि सार्वजनिक वितरण मंत्रालय, भारत सरकार',
            '© 2026 उपभोक्ता मामले विभाग, खाद्य और सार्वजनिक वितरण मंत्रालय, भारत सरकार',
            '© 2026 Department of Consumer Affairs, Ministry of Consumer Affairs, Food & Public Distribution, Govt of India'
          )}
        </p>
        <p className="text-[10px] text-slate-500 mt-1">
          Designed for Smart India Hackathon (SIH 2026) • Problem Statement #26032
        </p>
      </footer>
    </div>
  );
};
