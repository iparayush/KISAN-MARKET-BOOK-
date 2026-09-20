import { useState } from 'react';
import {
  Language,
  ScreenTab,
  UserRole,
  ActiveToken,
  RegisteredCrop,
  PaymentRecord,
  QueueTokenItem,
  ProcurementStep,
  Grievance,
  AdminAlert,
  AuthUser,
} from './types';
import {
  INITIAL_FARMER,
  INITIAL_TOKEN,
  INITIAL_CROPS,
  INITIAL_PROCUREMENT_STEPS,
  PAYMENT_RECORDS,
  MANDI_CENTRES,
  INITIAL_QUEUE_TOKENS,
  INITIAL_GRIEVANCES,
  ADMIN_ALERTS,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { BookSlotScreen } from './components/BookSlotScreen';
import { LiveQueueScreen } from './components/LiveQueueScreen';
import { TrackingScreen } from './components/TrackingScreen';
import { PaymentsScreen } from './components/PaymentsScreen';
import { GrievanceScreen } from './components/GrievanceScreen';
import { CentreOperatorDashboard } from './components/CentreOperatorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { InclusiveAccessModal } from './components/InclusiveAccessModal';
import { CropRegisterModal } from './components/CropRegisterModal';
import { MandiFinderModal } from './components/MandiFinderModal';
import { GatePassModal } from './components/GatePassModal';
import { DirectionsModal } from './components/DirectionsModal';
import { HelplineModal } from './components/HelplineModal';
import { NotificationsModal } from './components/NotificationsModal';
import { JFormModal } from './components/JFormModal';
import { ProfileModal } from './components/ProfileModal';
import { WeatherModal } from './components/WeatherModal';
import { VoiceAssistToast } from './components/VoiceAssistToast';
import { LoginScreen } from './components/LoginScreen';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('kisanprocure_lang');
      if (saved === 'en' || saved === 'mr' || saved === 'hi') {
        return saved;
      }
    } catch {
      // Ignore storage error
    }
    return 'en';
  });
  
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const roleParam = urlParams?.get('role') as UserRole | null;
  const tabParam = urlParams?.get('tab') as ScreenTab | null;
  const modalParam = urlParams?.get('modal');
  const viewParam = urlParams?.get('view');

  // Authenticated user session persisted in localStorage, or overridden by URL params
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    if (viewParam === 'login') return null;
    if (roleParam === 'operator') {
      return {
        id: 'OPR-NSK-042',
        role: 'operator',
        nameMr: 'विशाल जाधव (काटा ऑपरेटर)',
        nameEn: 'Vishal Jadhav (Weighbridge Operator)',
        identifier: 'OPR-NSK-042',
        centreId: 'nashik-main',
        centreNameMr: 'नाशिक कृषी उत्पन्न बाजार समिती (APMC) - काटा क्र. २',
        centreNameEn: 'Nashik APMC Market - Weighbridge #2',
        designationMr: 'वरिष्ठ वजन काटा व प्रतवारी ऑपरेटर',
        designationEn: 'Senior Weighbridge & Grading Officer',
        loginTime: new Date().toLocaleTimeString(),
      };
    }
    if (roleParam === 'admin') {
      return {
        id: 'DOCA-HQ-9901',
        role: 'admin',
        nameMr: 'डॉ. आनंद सावंत (भा.प्र.से.)',
        nameEn: 'Dr. Anand Sawant (IAS)',
        identifier: 'DOCA-HQ-9901',
        designationMr: 'संचालक, ग्राहक व्यवहार विभाग (DoCA)',
        designationEn: 'Director, Dept of Consumer Affairs (DoCA)',
        loginTime: new Date().toLocaleTimeString(),
      };
    }
    if (roleParam === 'farmer' || tabParam || modalParam) {
      return {
        id: 'FMR-88291',
        role: 'farmer',
        nameMr: INITIAL_FARMER.nameMr,
        nameEn: INITIAL_FARMER.nameEn,
        identifier: 'MH-NSK-88291',
        phone: INITIAL_FARMER.phone,
        avatarUrl: INITIAL_FARMER.avatarUrl,
        centreNameMr: 'नाशिक कृषी उत्पन्न बाजार समिती (APMC)',
        centreNameEn: 'Nashik APMC Agricultural Market',
        tokenNumber: '#027',
        loginTime: new Date().toLocaleTimeString(),
      };
    }
    try {
      const saved = localStorage.getItem('kisanprocure_auth_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Session load error:', e);
    }
    return null;
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    if (roleParam) return roleParam;
    return currentUser?.role || 'farmer';
  });

  const [currentTab, setCurrentTab] = useState<ScreenTab>(() => {
    if (tabParam) return tabParam;
    return 'home';
  });

  // Shared synchronized states across Farmer, Operator, and Admin
  const [farmer] = useState(INITIAL_FARMER);
  const [token, setToken] = useState<ActiveToken>(INITIAL_TOKEN);
  const [crops, setCrops] = useState<RegisteredCrop[]>(INITIAL_CROPS);
  const [steps, setSteps] = useState<ProcurementStep[]>(INITIAL_PROCUREMENT_STEPS);
  const [payments, setPayments] = useState<PaymentRecord[]>(PAYMENT_RECORDS);
  const [mandis] = useState(MANDI_CENTRES);
  const [queueTokens, setQueueTokens] = useState<QueueTokenItem[]>(INITIAL_QUEUE_TOKENS);
  const [grievances, setGrievances] = useState<Grievance[]>(INITIAL_GRIEVANCES);
  const [adminAlerts] = useState<AdminAlert[]>(ADMIN_ALERTS);

  // Modals state
  const [isCropRegisterOpen, setIsCropRegisterOpen] = useState(() => modalParam === 'crop-register');
  const [isMandiFinderOpen, setIsMandiFinderOpen] = useState(false);
  const [isGatePassOpen, setIsGatePassOpen] = useState(() => modalParam === 'gate-pass' || modalParam === 'token');
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [isInclusiveAccessOpen, setIsInclusiveAccessOpen] = useState(false);
  const [selectedJForm, setSelectedJForm] = useState<PaymentRecord | null>(null);

  // Voice Assistant feature
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceToast, setVoiceToast] = useState<{
    show: boolean;
    mr: string;
    en: string;
  }>({
    show: false,
    mr: '',
    en: '',
  });

  const speakMessage = (textMr: string, textEn: string, textHi?: string) => {
    setVoiceToast({ show: true, mr: textMr, en: textEn });

    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const spokenText = language === 'mr' ? textMr : language === 'hi' ? (textHi || textMr) : textEn;
        const utterance = new SpeechSynthesisUtterance(spokenText);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Safe fallback if speech is restricted in sandbox
    }

    setTimeout(() => {
      setVoiceToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  const handleToggleVoice = () => {
    const nextState = !isVoiceActive;
    setIsVoiceActive(nextState);
    if (nextState) {
      speakMessage(
        'आवाज सहाय्यक सुरू झाला आहे. आपले टोकन क्रमांक ०२७ असून ८ शेतकरी पुढे आहेत.',
        'Voice Assistant activated. Your token is #027 with 8 farmers ahead.',
        'आवाज सहायक सक्रिय हो गया है। आपका टोकन क्रमांक ०२७ है और ८ किसान आगे हैं।'
      );
    }
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'hi' : prev === 'hi' ? 'mr' : 'en';
      try {
        localStorage.setItem('kisanprocure_lang', next);
      } catch {
        // Ignore storage error
      }
      return next;
    });
  };

  const handleChangeLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('kisanprocure_lang', lang);
    } catch {
      // Ignore storage error
    }
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setUserRole(user.role);
    try {
      localStorage.setItem('kisanprocure_auth_user', JSON.stringify(user));
    } catch {
      // Ignore storage error
    }
    speakMessage(
      `${user.nameMr}, किसान खरेदी पोर्टलवर आपले स्वागत आहे!`,
      `Welcome to KisanProcure Portal, ${user.nameEn}!`,
      `${user.nameHi || user.nameMr}, किसान खरीद पोर्टल पर आपका स्वागत है!`
    );
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('kisanprocure_auth_user');
    } catch {
      // Ignore
    }
    setCurrentTab('home');
  };

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
    if (currentUser && currentUser.role !== role) {
      const updatedUser: AuthUser = {
        ...currentUser,
        role: role,
        nameMr:
          role === 'operator'
            ? 'विशाल जाधव (काटा ऑपरेटर)'
            : role === 'admin'
            ? 'डॉ. आनंद सावंत (भा.प्र.से.)'
            : INITIAL_FARMER.nameMr,
        nameEn:
          role === 'operator'
            ? 'Vishal Jadhav (Operator)'
            : role === 'admin'
            ? 'Dr. Anand Sawant (IAS)'
            : INITIAL_FARMER.nameEn,
        designationMr:
          role === 'operator'
            ? 'वरिष्ठ वजन काटा व प्रतवारी ऑपरेटर'
            : role === 'admin'
            ? 'संचालक, ग्राहक व्यवहार विभाग (DoCA)'
            : undefined,
      };
      setCurrentUser(updatedUser);
      try {
        localStorage.setItem('kisanprocure_auth_user', JSON.stringify(updatedUser));
      } catch {
        // Ignore
      }
    }
  };

  // Simulate advancing the queue
  const handleSimulateAdvance = () => {
    const currentNum = parseInt(token.currentTokenServing.replace('#', ''), 10);
    const userNum = parseInt(token.tokenNumber.replace('#', ''), 10);

    if (currentNum < userNum) {
      const nextServing = `#${(currentNum + 1).toString().padStart(3, '0')}`;
      const newFarmersAhead = Math.max(0, userNum - (currentNum + 1));
      const newWait = Math.max(0, Math.round((newFarmersAhead * 5.2) / (token.totalActiveScales || 3)));

      setToken((prev) => ({
        ...prev,
        currentTokenServing: nextServing,
        farmersAhead: newFarmersAhead,
        expectedWaitMin: newWait,
      }));

      if (isVoiceActive) {
        speakMessage(
          `टोकन अपडेट: आता काटा क्रमांक २ वर टोकन ${nextServing} सुरू झाले आहे.`,
          `Queue Update: Token ${nextServing} is now being weighed at Scale #2.`
        );
      }
    }
  };

  const handleSlotBooked = (newToken: ActiveToken) => {
    setToken(newToken);
    setCurrentTab('live-queue');
    if (isVoiceActive) {
      speakMessage(
        `नवीन टोकन ${newToken.tokenNumber} यशस्वीरित्या बुक झाले आहे.`,
        `New token ${newToken.tokenNumber} booked successfully.`
      );
    }
  };

  const handleAddCrop = (newCrop: RegisteredCrop) => {
    setCrops((prev) => [newCrop, ...prev]);
    if (isVoiceActive) {
      speakMessage(
        `${newCrop.nameMr} ची नोंदणी यशस्वीरित्या पूर्ण झाली आहे.`,
        `${newCrop.nameEn} registered successfully.`
      );
    }
  };

  const handleAddGrievance = (newGrievance: Grievance) => {
    setGrievances((prev) => [newGrievance, ...prev]);
    if (isVoiceActive) {
      speakMessage(
        `तक्रार नोंदवली गेली. टोकन क्रमांक ${newGrievance.id}`,
        `Grievance registered. Ticket number ${newGrievance.id}`
      );
    }
  };

  const handleAddOrUpdatePayment = (newPayment: PaymentRecord) => {
    setPayments((prev) => {
      const exists = prev.find((p) => p.id === newPayment.id || p.jFormNumber === newPayment.jFormNumber);
      if (exists) {
        return prev.map((p) =>
          p.id === newPayment.id || p.jFormNumber === newPayment.jFormNumber ? newPayment : p
        );
      }
      return [newPayment, ...prev];
    });

    // Also synchronize 9-stage tracking steps
    if (newPayment.status === 'credited') {
      setSteps((prev) =>
        prev.map((s) => (s.stage === 'PAID' ? { ...s, status: 'completed', time: '११:३२ AM' } : s))
      );
    } else if (newPayment.status === 'processing') {
      setSteps((prev) =>
        prev.map((s) =>
          s.stage === 'BILL_GENERATED'
            ? { ...s, status: 'completed' }
            : s.stage === 'PAYMENT_PROCESSING'
            ? { ...s, status: 'current' }
            : s
        )
      );
    }
  };

  // If user is not authenticated, render official Login portal
  if (!currentUser) {
    return (
      <>
        <LoginScreen
          language={language}
          onToggleLanguage={handleToggleLanguage}
          onChangeLanguage={handleChangeLanguage}
          onLoginSuccess={handleLoginSuccess}
          onOpenHelpline={() => setIsHelplineOpen(true)}
        />
        <HelplineModal
          isOpen={isHelplineOpen}
          onClose={() => setIsHelplineOpen(false)}
          language={language}
        />
      </>
    );
  }

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col antialiased selection:bg-primary-fixed">
      {/* Top Header */}
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onChangeLanguage={handleChangeLanguage}
        farmer={farmer}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenHelpline={() => setIsHelplineOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        isVoiceActive={isVoiceActive}
        onToggleVoice={handleToggleVoice}
      />

      {/* Voice Assistant Toast notification */}
      <VoiceAssistToast
        isActive={voiceToast.show}
        messageMr={voiceToast.mr}
        messageEn={voiceToast.en}
        language={language}
        onClose={() => setVoiceToast((prev) => ({ ...prev, show: false }))}
      />

      {/* Main Container */}
      <main
        className={`flex-1 w-full pt-18 sm:pt-22 pb-24 px-3 sm:px-4 mx-auto flex flex-col ${
          userRole === 'admin'
            ? 'max-w-5xl'
            : userRole === 'operator'
            ? 'max-w-4xl'
            : 'max-w-xl'
        }`}
      >
        {/* ROLE 1: FARMER VIEW */}
        {userRole === 'farmer' && (
          <>
            {currentTab === 'home' && (
              <HomeScreen
                farmer={farmer}
                currentUser={currentUser}
                token={token}
                crops={crops}
                language={language}
                onNavigate={(tab) => setCurrentTab(tab)}
                onOpenCropRegister={() => setIsCropRegisterOpen(true)}
                onOpenMandiFinder={() => setIsMandiFinderOpen(true)}
                onOpenDirections={() => setIsDirectionsOpen(true)}
                onOpenNotifications={() => setIsNotificationsOpen(true)}
                onOpenGatePass={() => setIsGatePassOpen(true)}
                onOpenWeatherDetails={() => setIsWeatherOpen(true)}
                onOpenAllCrops={() => setCurrentTab('tracking')}
                onOpenInclusiveAccess={() => setIsInclusiveAccessOpen(true)}
                isVoiceActive={isVoiceActive}
              />
            )}

            {currentTab === 'book-slot' && (
              <BookSlotScreen
                language={language}
                mandis={mandis}
                onSlotBooked={handleSlotBooked}
              />
            )}

            {currentTab === 'live-queue' && (
              <LiveQueueScreen
                token={token}
                language={language}
                onSimulateAdvance={handleSimulateAdvance}
                onOpenGatePass={() => setIsGatePassOpen(true)}
                onOpenDirections={() => setIsDirectionsOpen(true)}
                onAdjustCounters={(count) =>
                  setToken((prev) => ({
                    ...prev,
                    totalActiveScales: count,
                    expectedWaitMin: Math.round((prev.farmersAhead * 5.2) / count),
                  }))
                }
              />
            )}

            {currentTab === 'tracking' && (
              <TrackingScreen
                steps={steps}
                token={token}
                crop={crops[0]}
                language={language}
                onOpenGatePass={() => setIsGatePassOpen(true)}
                onOpenJForm={() => setSelectedJForm(payments[0])}
              />
            )}

            {currentTab === 'payments' && (
              <PaymentsScreen
                payments={payments}
                farmer={farmer}
                language={language}
                onOpenJFormDetail={(p) => setSelectedJForm(p)}
              />
            )}

            {currentTab === 'grievance' && (
              <GrievanceScreen
                language={language}
                grievances={grievances}
                onAddGrievance={handleAddGrievance}
              />
            )}
          </>
        )}

        {/* ROLE 2: CENTRE OPERATOR DESK */}
        {userRole === 'operator' && (
          <CentreOperatorDashboard
            language={language}
            token={token}
            queueTokens={queueTokens}
            onUpdateToken={(updated) => setToken(updated)}
            onUpdateQueueTokens={(tokens) => setQueueTokens(tokens)}
            onUpdateSteps={(updatedSteps) => setSteps(updatedSteps)}
            onAddOrUpdatePayment={handleAddOrUpdatePayment}
          />
        )}

        {/* ROLE 3: GOVERNMENT ADMIN DASHBOARD */}
        {userRole === 'admin' && (
          <AdminDashboard
            language={language}
            alerts={adminAlerts}
            centres={mandis}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation - Active on Farmer View */}
      {userRole === 'farmer' && (
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          language={language}
          tokenNumber={token.tokenNumber}
        />
      )}

      {/* Interactive Modals */}
      <CropRegisterModal
        isOpen={isCropRegisterOpen}
        onClose={() => setIsCropRegisterOpen(false)}
        language={language}
        onAddCrop={handleAddCrop}
      />

      <MandiFinderModal
        isOpen={isMandiFinderOpen}
        onClose={() => setIsMandiFinderOpen(false)}
        mandis={mandis}
        language={language}
      />

      <GatePassModal
        isOpen={isGatePassOpen}
        onClose={() => setIsGatePassOpen(false)}
        token={token}
        crop={crops[0]}
        language={language}
      />

      <DirectionsModal
        isOpen={isDirectionsOpen}
        onClose={() => setIsDirectionsOpen(false)}
        language={language}
        mandiName={token.mandiNameMr}
        gateNumber={token.gateNumber}
      />

      <HelplineModal
        isOpen={isHelplineOpen}
        onClose={() => setIsHelplineOpen(false)}
        language={language}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        language={language}
      />

      <JFormModal
        isOpen={!!selectedJForm}
        onClose={() => setSelectedJForm(null)}
        payment={selectedJForm}
        farmer={farmer}
        language={language}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        farmer={farmer}
        currentUser={currentUser}
        onLogout={handleLogout}
        language={language}
      />

      <WeatherModal
        isOpen={isWeatherOpen}
        onClose={() => setIsWeatherOpen(false)}
        language={language}
      />

      <InclusiveAccessModal
        isOpen={isInclusiveAccessOpen}
        onClose={() => setIsInclusiveAccessOpen(false)}
        language={language}
        token={token}
      />
    </div>
  );
}
