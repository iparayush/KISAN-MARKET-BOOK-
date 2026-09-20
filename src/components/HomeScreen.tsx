import React from 'react';
import {
  FarmerProfile,
  ActiveToken,
  RegisteredCrop,
  Language,
  ScreenTab,
  AuthUser,
} from '../types';

interface HomeScreenProps {
  farmer: FarmerProfile;
  currentUser?: AuthUser | null;
  token: ActiveToken;
  crops: RegisteredCrop[];
  language: Language;
  onNavigate: (tab: ScreenTab) => void;
  onOpenCropRegister: () => void;
  onOpenMandiFinder: () => void;
  onOpenDirections: () => void;
  onOpenNotifications: () => void;
  onOpenGatePass: () => void;
  onOpenWeatherDetails: () => void;
  onOpenAllCrops: () => void;
  onOpenInclusiveAccess: () => void;
  isVoiceActive: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  farmer,
  currentUser,
  token,
  crops,
  language,
  onNavigate,
  onOpenCropRegister,
  onOpenMandiFinder,
  onOpenDirections,
  onOpenNotifications,
  onOpenGatePass,
  onOpenWeatherDetails,
  onOpenAllCrops,
  onOpenInclusiveAccess,
}) => {
  const currentCrop = crops[0] || {
    nameMr: 'सोयाबीन (Soybean)',
    nameEn: 'Soybean',
    gradeMr: "दर्जा 'अ'",
    gradeEn: "Grade 'A'",
    weightQtl: 48.5,
    scheduledTimeMr: 'आज, ११:१५ AM',
    scheduledTimeEn: 'Today, 11:15 AM',
    mspRatePerQtl: 4892,
    expectedTotalAmount: 237262,
    moisturePercent: 11.8,
    maxMoistureAllowed: 12.0,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyv675iEzzD4n4UQHufnmN4MFm8vaY1LaFB_4961SAu4O4XAlOeU_nEkf3cZKG0ltSwiNWLLta2o2iljyhaYsq1KHaezbkkbCbEqtkIVNJrG7X7QVwjCqQ2vnUexkPbHbQu1ulaEl34pkHgpaHBXiKg-0S3UGuQPTJN9mI1-gH2it5NWVHJMzH8VbVubNZ3djdCFpkxr4Zu4eLFPo5F_cb9k1eLs7itPveydmfeSGneRc4uWOGJ__C',
  };

  const displayName = currentUser
    ? (language === 'mr' ? currentUser.nameMr : currentUser.nameEn)
    : (language === 'mr' ? farmer.nameMr : farmer.nameEn);
  const displayId = currentUser?.id || farmer.id;
  const displayInitial = currentUser ? currentUser.nameMr.charAt(0) : farmer.initial;

  return (
    <div className="flex flex-col w-full space-y-4 max-w-xl mx-auto pb-6">
      {/* Top Farmer Welcome & Verification Header */}
      <section
        id="farmer-profile-card"
        className="flex items-center justify-between bg-surface-container rounded-xl p-3 shadow-xs border border-outline-variant/30"
      >
        <div className="flex items-center space-x-2.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed text-xl font-bold shadow-inner font-headline">
            <span>{displayInitial}</span>
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs">
              <span
                className="material-symbols-outlined text-[11px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <h1 className="text-base font-bold text-on-surface">
                {language === 'mr' ? `नमस्कार, ${displayName}` : `Namaskar, ${displayName}`}
              </h1>
              <span className="text-base animate-bounce">👋</span>
            </div>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className="text-xs bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded font-mono font-medium">
                ID: {displayId}
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs text-primary font-bold">
                {language === 'mr' ? 'प्रमाणित शेतकरी' : 'Certified Farmer'}
              </span>
            </div>
          </div>
        </div>

        <button
          id="btn-notifications"
          onClick={onOpenNotifications}
          aria-label="Notifications"
          className="relative w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-[22px]">notifications_active</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface" />
        </button>
      </section>

      {/* Weather & Operational Advisory Ticker */}
      <div
        id="weather-advisory-ticker"
        onClick={onOpenWeatherDetails}
        className="cursor-pointer flex items-center space-x-2 bg-secondary-fixed text-on-secondary-fixed p-2.5 rounded-lg shadow-xs hover:opacity-95 transition-opacity"
      >
        <span
          className="material-symbols-outlined text-secondary flex-shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          wb_sunny
        </span>
        <p className="text-xs flex-1 truncate font-medium">
          <span className="font-bold">
            {language === 'mr' ? 'आजचे हवामान:' : "Today's Weather:"}
          </span>{' '}
          {language === 'mr'
            ? 'स्वच्छ ऊन (31°C) | नाशिक केंद्र आज दुपारी 5 वाजेपर्यंत सुरू'
            : 'Sunny (31°C) | Nashik Mandi open till 5:00 PM today'}
        </p>
        <span className="material-symbols-outlined text-[18px] text-secondary flex-shrink-0">
          info
        </span>
      </div>

      {/* 3-Second Rule Active Token Hero Card */}
      <div
        id="active-token-hero-card"
        className="relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/40 flex flex-col"
      >
        {/* Hub Header Banner */}
        <div className="bg-primary-container text-on-primary-container px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 min-w-0">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              storefront
            </span>
            <span className="text-xs md:text-sm font-bold truncate">
              {language === 'mr' ? token.mandiNameMr : token.mandiNameEn}
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-on-primary-container/20 text-on-primary-container font-bold flex-shrink-0">
            {language === 'mr' ? token.gateNumber : 'Gate No. 3'}
          </span>
        </div>

        <div className="p-4 flex flex-col space-y-3">
          {/* Token Numeral & Visual Highlight */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-on-surface-variant font-bold tracking-wider uppercase">
                {language === 'mr' ? 'तुमचा टोकन क्रमांक' : 'Your Token Number'}
              </span>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-headline text-3xl font-extrabold text-primary tracking-tight">
                  {token.tokenNumber}
                </span>
                <span className="text-xs text-primary font-semibold">
                  ({language === 'mr' ? 'आजचा स्लॉट' : "Today's Slot"})
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end text-right">
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold">
                  {language === 'mr' ? `सुरू टोकन: ${token.currentTokenServing}` : `Now Serving: ${token.currentTokenServing}`}
                </span>
              </div>
              <span className="text-[11px] text-on-surface-variant mt-1 font-medium">
                {language === 'mr'
                  ? `${token.farmersAhead} शेतकरी पुढे आहेत`
                  : `${token.farmersAhead} farmers ahead in queue`}
              </span>
            </div>
          </div>

          {/* Live Waiting Telemetry Bar */}
          <div className="bg-surface-container-low rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-on-surface-variant">
                  {language === 'mr' ? 'अपेक्षित प्रतीक्षा वेळ' : 'Estimated Wait Time'}
                </span>
                <span className="text-sm font-bold text-on-surface">
                  {language === 'mr'
                    ? `${token.expectedWaitMin} मिनिटे (${token.expectedWaitMin} min)`
                    : `${token.expectedWaitMin} Minutes`}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1 bg-surface-container-lowest px-2 py-1 rounded shadow-xs border border-outline-variant/30">
              <span
                className="material-symbols-outlined text-primary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                scale
              </span>
              <span className="text-xs text-on-surface font-semibold">
                {language === 'mr' ? token.weighbridgeNumber : 'Scale #2'}
              </span>
            </div>
          </div>

          {/* Centre Operational State Indicator */}
          <div className="flex items-center space-x-2 bg-primary-fixed/30 text-on-primary-fixed p-2 rounded-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 animate-ping" />
            <p className="text-xs font-semibold truncate">
              {language === 'mr' ? token.centerStatusMr : token.centerStatusEn}
            </p>
          </div>

          {/* Action Buttons Pair */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              id="btn-view-live-queue"
              onClick={() => onNavigate('live-queue')}
              className="h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center space-x-1.5 text-sm font-bold shadow-sm hover:bg-primary-container active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">speed</span>
              <span>{language === 'mr' ? 'थेट रांग पहा' : 'Live Queue'}</span>
            </button>

            <button
              id="btn-view-directions"
              onClick={onOpenDirections}
              className="h-11 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center space-x-1.5 text-sm font-bold hover:bg-surface-variant active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">directions</span>
              <span>{language === 'mr' ? 'दिशा मार्ग' : 'Directions'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Registered Crops & Today's Intake Section */}
      <section id="registered-crop-section" className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-on-surface flex items-center space-x-1.5">
            <span className="material-symbols-outlined text-primary text-[22px]">agriculture</span>
            <span>{language === 'mr' ? 'नोंदणीकृत पीक तपशील' : 'Registered Crop Details'}</span>
          </h2>
          <button
            onClick={onOpenAllCrops}
            className="text-xs text-primary font-bold hover:underline"
          >
            {language === 'mr' ? `सर्व पहा (${crops.length})` : `View All (${crops.length})`}
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/40 flex flex-col space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <img
                className="w-14 h-14 rounded-xl object-cover shadow-xs border border-outline-variant/30"
                alt="Soybean crop"
                src={currentCrop.imageUrl}
              />
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm md:text-base font-bold text-on-surface">
                    {language === 'mr' ? currentCrop.nameMr : currentCrop.nameEn}
                  </span>
                  <span className="text-[10px] bg-primary-fixed text-on-primary-fixed px-1.5 py-0.5 rounded font-bold">
                    {language === 'mr' ? currentCrop.gradeMr : currentCrop.gradeEn}
                  </span>
                </div>
                <span className="text-xs text-on-surface-variant font-medium mt-0.5">
                  {language === 'mr'
                    ? `वजन: ${currentCrop.weightQtl} क्विंटल (${currentCrop.weightQtl} Qtl)`
                    : `Weight: ${currentCrop.weightQtl} Quintals`}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded font-bold">
                {language === 'mr' ? currentCrop.scheduledTimeMr : currentCrop.scheduledTimeEn}
              </span>
              <span className="text-[10px] text-on-surface-variant mt-0.5 font-medium">
                {language === 'mr' ? 'नियोजित वेळ' : 'Scheduled Slot'}
              </span>
            </div>
          </div>

          {/* Financial Metrics & MSP Assurance */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col">
              <span className="text-[11px] text-on-surface-variant">
                {language === 'mr' ? 'हमीभाव (MSP Rate)' : 'Govt MSP Rate'}
              </span>
              <span className="text-sm md:text-base font-bold text-on-surface">
                ₹{currentCrop.mspRatePerQtl.toLocaleString('en-IN')}{' '}
                <span className="text-[10px] font-normal text-on-surface-variant">/क्विंटल</span>
              </span>
            </div>

            <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col">
              <span className="text-[11px] text-on-surface-variant">
                {language === 'mr' ? 'अपेक्षित एकूण रक्कम' : 'Expected Amount'}
              </span>
              <span className="text-sm md:text-base font-bold text-primary">
                ₹{currentCrop.expectedTotalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Moisture Tolerance Bar */}
          <div className="pt-1 flex flex-col space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-on-surface-variant">
                {language === 'mr' ? 'ओलावा मर्यादा (Moisture Check): ' : 'Moisture Check: '}
                <span className="font-bold text-on-surface">{currentCrop.moisturePercent}%</span>
              </span>
              <span className="text-primary font-bold">
                {language === 'mr'
                  ? `स्वीकार्य (कमाल ${currentCrop.maxMoistureAllowed}%)`
                  : `Passed (Max ${currentCrop.maxMoistureAllowed}%)`}
              </span>
            </div>
            <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden flex">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(currentCrop.moisturePercent / currentCrop.maxMoistureAllowed) * 100 * 0.8}%`,
                }}
              />
            </div>
          </div>

          {/* Direct link to view e-Pass */}
          <button
            onClick={onOpenGatePass}
            className="w-full py-1.5 text-center text-xs text-primary font-semibold hover:bg-surface-container-low rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
            <span>{language === 'mr' ? 'गेट पास व क्यूआर कोड पहा' : 'View Gate Pass & QR Code'}</span>
          </button>
        </div>
      </section>

      {/* Quick Action Grid (2x2 Thumb-friendly Touch Elements) */}
      <section id="quick-services-grid" className="flex flex-col space-y-2">
        <h2 className="text-base font-bold text-on-surface flex items-center space-x-1.5">
          <span className="material-symbols-outlined text-primary text-[22px]">apps</span>
          <span>{language === 'mr' ? 'जलद सेवा पर्याय' : 'Quick Actions'}</span>
        </h2>

        <div className="grid grid-cols-2 gap-2.5">
          {/* 1. Book Smart Slot */}
          <button
            id="btn-quick-book-slot"
            onClick={() => onNavigate('book-slot')}
            className="bg-surface-container-lowest hover:bg-surface-container p-3 rounded-2xl shadow-xs border border-outline-variant/30 flex flex-col text-left active:scale-98 transition-all min-h-[110px] justify-between group"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">calendar_add_on</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-bold">
                {language === 'mr' ? 'AI मदत' : 'AI Smart'}
              </span>
            </div>
            <div className="mt-2 flex flex-col">
              <span className="text-sm font-bold text-on-surface">
                {language === 'mr' ? 'स्लॉट बुक करा' : 'Book Mandi Slot'}
              </span>
              <span className="text-xs text-on-surface-variant">
                {language === 'mr' ? 'स्मार्ट वेळ निवड' : 'Avoid queue rush'}
              </span>
            </div>
          </button>

          {/* 2. Register Crop */}
          <button
            id="btn-quick-register-crop"
            onClick={onOpenCropRegister}
            className="bg-surface-container-lowest hover:bg-surface-container p-3 rounded-2xl shadow-xs border border-outline-variant/30 flex flex-col text-left active:scale-98 transition-all min-h-[110px] justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">add_task</span>
            </div>
            <div className="mt-2 flex flex-col">
              <span className="text-sm font-bold text-on-surface">
                {language === 'mr' ? 'नवीन पीक नोंदणी' : 'Register Crop'}
              </span>
              <span className="text-xs text-on-surface-variant">
                {language === 'mr' ? 'हंगामी नोंद करा' : 'Link 7/12 land record'}
              </span>
            </div>
          </button>

          {/* 3. Find Mandi Hub */}
          <button
            id="btn-quick-find-mandi"
            onClick={onOpenMandiFinder}
            className="bg-surface-container-lowest hover:bg-surface-container p-3 rounded-2xl shadow-xs border border-outline-variant/30 flex flex-col text-left active:scale-98 transition-all min-h-[110px] justify-between group"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">pin_drop</span>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
            </div>
            <div className="mt-2 flex flex-col">
              <span className="text-sm font-bold text-on-surface">
                {language === 'mr' ? 'खरेदी केंद्र शोधा' : 'Find Mandi Hub'}
              </span>
              <span className="text-xs text-on-surface-variant">
                {language === 'mr' ? 'थेट गर्दी नकाशा' : 'Live crowd radar'}
              </span>
            </div>
          </button>

          {/* 4. Payment & DBT Status */}
          <button
            id="btn-quick-payments"
            onClick={() => onNavigate('payments')}
            className="bg-surface-container-lowest hover:bg-surface-container p-3 rounded-2xl shadow-xs border border-outline-variant/30 flex flex-col text-left active:scale-98 transition-all min-h-[110px] justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">payments</span>
            </div>
            <div className="mt-2 flex flex-col">
              <span className="text-sm font-bold text-on-surface">
                {language === 'mr' ? 'पेमेंट स्थिती' : 'DBT Payments'}
              </span>
              <span className="text-xs text-primary font-bold">
                {language === 'mr' ? '₹१,८२,४०० जमा DBT' : '₹1,82,400 Credited'}
              </span>
            </div>
          </button>

          {/* 5. Grievances & Redressal (FR-21) */}
          <button
            id="btn-quick-grievance"
            onClick={() => onNavigate('grievance')}
            className="bg-surface-container-lowest hover:bg-surface-container p-3 rounded-2xl shadow-xs border border-outline-variant/30 flex flex-col text-left active:scale-98 transition-all min-h-[110px] justify-between group"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-800 font-bold">
                24h SLA
              </span>
            </div>
            <div className="mt-2 flex flex-col">
              <span className="text-sm font-bold text-on-surface">
                {language === 'mr' ? 'तक्रार निवारण' : 'Grievance Desk'}
              </span>
              <span className="text-xs text-on-surface-variant">
                {language === 'mr' ? 'काटा/पेमेंट मदत कक्ष' : 'File issue / appeal'}
              </span>
            </div>
          </button>

          {/* 6. Non-Smartphone Access (FR-20) */}
          <button
            id="btn-quick-inclusive-access"
            onClick={onOpenInclusiveAccess}
            className="bg-surface-container-lowest hover:bg-surface-container p-3 rounded-2xl shadow-xs border border-outline-variant/30 flex flex-col text-left active:scale-98 transition-all min-h-[110px] justify-between group"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[24px]">cell_tower</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                2G/SMS
              </span>
            </div>
            <div className="mt-2 flex flex-col">
              <span className="text-sm font-bold text-on-surface">
                {language === 'mr' ? 'SMS / IVR / किऑस्क' : 'SMS • IVR • Kiosk'}
              </span>
              <span className="text-xs text-on-surface-variant">
                {language === 'mr' ? 'बिना इंटरनेट शेतकरी' : 'Non-smartphone tool'}
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Visual Live Mandi Traffic Snippet */}
      <section
        id="mandi-live-traffic-card"
        onClick={onOpenMandiFinder}
        className="cursor-pointer bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/40 flex flex-col space-y-2 hover:border-primary/40 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">traffic</span>
            <span className="text-sm font-bold text-on-surface">
              {language === 'mr' ? 'नाशिक केंद्र थेट स्थिती' : 'Nashik Mandi Live Traffic'}
            </span>
          </div>
          <span className="text-xs text-primary font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {language === 'mr' ? 'कमी गर्दी (Low Traffic)' : 'Low Traffic'}
          </span>
        </div>

        <div className="relative w-full h-32 rounded-xl overflow-hidden shadow-inner border border-outline-variant/30">
          <img
            className="w-full h-full object-cover"
            alt="Nashik APMC Mandi"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoAu_xbRy16sS2l2QA-vayX-NFAD0C6vFs7lGkha7CpsOMMT9D272O4yBuaMoyWNl9OfNDesFswpedFPIT64vDIiFKRi0Lk-eE6XFAZYJmlYrg_oyUrlV__-pn6cWz0jDgQ4hqrtjlvt8VI2ndZFJDqb9PDapxbRNTKzpnyVj3S9QyeOJLWNuqIZD4CJKZzg62mHvddBbAIesgpxZ3n5YMMEhdWpqlGrVnSgM6ivsdhSczhAMouHLI"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/90 via-[#131b2e]/20 to-transparent flex items-end p-3 justify-between">
            <div className="flex items-center space-x-1.5 text-white">
              <span className="material-symbols-outlined text-[16px] text-green-400">check_circle</span>
              <span className="text-xs font-semibold">
                {language === 'mr' ? 'मुख्य प्रवेशद्वार: मोकळे' : 'Main Gate: Clear (No Queue)'}
              </span>
            </div>
            <span className="text-white bg-primary/95 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              {language === 'mr' ? 'सरासरी वेग: १२ मि/वाहन' : 'Avg: 12 min/truck'}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
