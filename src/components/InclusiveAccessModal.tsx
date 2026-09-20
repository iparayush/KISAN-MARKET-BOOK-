import React, { useState } from 'react';
import { Language, ActiveToken } from '../types';

interface InclusiveAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  token: ActiveToken;
}

export const InclusiveAccessModal: React.FC<InclusiveAccessModalProps> = ({
  isOpen,
  onClose,
  language,
  token,
}) => {
  const [activeTab, setActiveTab] = useState<'sms' | 'ivr' | 'kiosk'>('sms');
  const [ivrStep, setIvrStep] = useState<string>('welcome');
  const [kioskPhone, setKioskPhone] = useState<string>('9822451092');
  const [kioskPrinted, setKioskPrinted] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fade-in">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-4 bg-[#1e293b] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[24px] text-green-400">cell_tower</span>
            <div>
              <h2 className="text-sm font-bold">
                {language === 'mr'
                  ? 'बिना स्मार्टफोन शेतकरी सर्वसमावेशक प्रवेश'
                  : 'Inclusive Access for Non-Smartphone Farmers'}
              </h2>
              <p className="text-[11px] text-slate-300">
                {language === 'mr' ? 'SMS अलर्ट • IVR व्हॉइस कॉल • प्रवेशद्वार किऑस्क' : 'SMS Alerts • IVR Voice • Entry Kiosk'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            ✕
          </button>
        </div>

        {/* 3 Modality Sub-tabs */}
        <div className="grid grid-cols-3 border-b border-outline-variant/30 bg-surface-container-low text-xs font-bold">
          <button
            onClick={() => setActiveTab('sms')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'sms'
                ? 'border-primary text-primary bg-surface-container-lowest'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">sms</span>
            <span>SMS अलर्ट</span>
          </button>

          <button
            onClick={() => setActiveTab('ivr')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'ivr'
                ? 'border-primary text-primary bg-surface-container-lowest'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
            <span>IVR कॉल (1800)</span>
          </button>

          <button
            onClick={() => setActiveTab('kiosk')}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'kiosk'
                ? 'border-primary text-primary bg-surface-container-lowest'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>किऑस्क स्लिप</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* TAB 1: SMS Simulation */}
          {activeTab === 'sms' && (
            <div className="flex flex-col space-y-3">
              <div className="bg-primary/10 p-3 rounded-xl border border-primary/20 text-xs text-on-surface flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0">info</span>
                <p>
                  {language === 'mr'
                    ? 'साध्या फिचर फोनवर (2G) इंटरनेटशिवाय मराठी व इंग्रजीत पाठवले जाणारे स्वयंचलित SMS:'
                    : 'Automated push SMS sent in local languages for 2G/basic feature phone users without internet:'}
                </p>
              </div>

              <div className="space-y-2.5">
                {/* SMS 1 */}
                <div className="bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30 flex flex-col space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-on-surface-variant">
                    <span className="font-bold text-primary">VK-GOVKISAN</span>
                    <span>आज ०९:४६ AM</span>
                  </div>
                  <p className="text-xs text-on-surface font-medium leading-relaxed">
                    "शेतकरी बंधू रमेश पाटील, आपले टोकन क्र. <span className="font-bold text-primary">{token.tokenNumber}</span> नाशिक APMC साठी निश्चित झाले आहे. स्लॉट: {token.slotTime}. गेट ३ वर हजर राहावे. - DoCA"
                  </p>
                </div>

                {/* SMS 2 */}
                <div className="bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30 flex flex-col space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-on-surface-variant">
                    <span className="font-bold text-primary">VK-GOVKISAN</span>
                    <span>१०:२८ AM</span>
                  </div>
                  <p className="text-xs text-on-surface font-medium leading-relaxed">
                    "सावधान: काटा क्र. २ वर सध्या टोकन {token.currentTokenServing} सुरू आहे. आपल्या पुढे {token.farmersAhead} वाहने आहेत. अंदाजे प्रतीक्षा: {token.expectedWaitMin} मिनिटे."
                  </p>
                </div>

                {/* SMS 3 */}
                <div className="bg-green-50 dark:bg-green-950/30 p-3.5 rounded-2xl border border-green-200 flex flex-col space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-green-800">
                    <span className="font-bold">VK-MAHABANK</span>
                    <span>११:२८ AM</span>
                  </div>
                  <p className="text-xs text-green-900 font-medium leading-relaxed">
                    "प्रिय रमेश पाटील, MSP सोयाबीन खरेदी J-Form 88291 ची रक्कम ₹२,३७,२६२ आपल्या बँक ऑफ महाराष्ट्र खात्यात जमा झाली आहे. UTR: RBIP294829103984. - DoCA PFMS"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IVR Interactive Audio Voice Call Simulator */}
          {activeTab === 'ivr' && (
            <div className="flex flex-col space-y-3">
              <div className="bg-surface-container p-3 rounded-xl border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-primary">टोल-फ्री शेतकरी हेल्पलाइन</span>
                  <p className="text-base font-headline font-black text-on-surface">1800-180-1551</p>
                </div>
                <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-[10px] font-bold">
                  24x7 मोफत
                </span>
              </div>

              {/* Simulated Phone Screen */}
              <div className="bg-[#0f172a] text-white p-4 rounded-2xl flex flex-col space-y-3">
                <div className="text-center py-2 border-b border-slate-800">
                  <span className="text-xs text-green-400 font-mono">● कॉल सुरू (00:38)</span>
                  <h3 className="text-sm font-bold mt-1">KisanProcure IVR ऑटो-असिस्ट</h3>
                </div>

                {/* Simulated Voice Output */}
                <div className="bg-slate-800/80 p-3 rounded-xl text-xs text-slate-200 leading-relaxed font-sans">
                  {ivrStep === 'welcome' && (
                    <p>
                      "नमस्कार शेतकरी बंधू! किसान खरेदी प्रणालीमध्ये आपले स्वागत आहे. चालू टोकन स्थितीसाठी १ दाबा, वजन व प्रतवारीसाठी २ दाबा, पेमेंट स्थितीसाठी ३ दाबा."
                    </p>
                  )}
                  {ivrStep === 'token' && (
                    <p className="text-green-300">
                      "आपला नोंदणीकृत टोकन क्रमांक ०२७ असून सध्या काटा क्र. २ वर टोकन ०१९ सुरू आहे. आपल्या पुढे ८ वाहने असून अंदाजे प्रतीक्षा वेळ ४२ मिनिटे आहे."
                    </p>
                  )}
                  {ivrStep === 'quality' && (
                    <p className="text-amber-300">
                      "आपल्या सोयाबीन नमुन्याची ओलावा तपासणी ११.८ टक्के नोंदवली गेली असून दर्जा 'अ' प्रमाणित झाला आहे. वजन काटा क्र. २ वर ग्रॉस ५०.२ Q नोंदवले आहे."
                    </p>
                  )}
                  {ivrStep === 'payment' && (
                    <p className="text-blue-300">
                      "आपल्या J-Form बिलाची एकूण रक्कम २ लाख ३७ हजार २६२ रुपये बँक ऑफ महाराष्ट्र खात्यावर वर्ग करण्याची प्रक्रिया सुरू आहे."
                    </p>
                  )}
                </div>

                {/* Dialpad Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <button
                    onClick={() => setIvrStep('token')}
                    className="h-10 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 font-bold text-xs"
                  >
                    १ (टोकन)
                  </button>
                  <button
                    onClick={() => setIvrStep('quality')}
                    className="h-10 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 font-bold text-xs"
                  >
                    २ (वजन)
                  </button>
                  <button
                    onClick={() => setIvrStep('payment')}
                    className="h-10 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 font-bold text-xs"
                  >
                    ३ (पेमेंट)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Mandi Entrance Kiosk Mode */}
          {activeTab === 'kiosk' && (
            <div className="flex flex-col space-y-3">
              <div className="bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30 flex flex-col space-y-2">
                <span className="text-xs font-bold text-on-surface">
                  {language === 'mr' ? 'केंद्रावरील सेल्फ-सर्व्हिस किऑस्क' : 'Mandi Entrance Self-Service Kiosk'}
                </span>
                <p className="text-xs text-on-surface-variant">
                  {language === 'mr'
                    ? 'शेतकरी मंडईत आल्यावर टचस्क्रीनवर फक्त मोबाईल किंवा आधार नंबर टाकून टोकन स्लिप छापू शकतात.'
                    : 'Farmers arriving at the gate can enter phone or Aadhaar to print physical token slips.'}
                </p>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={kioskPhone}
                    onChange={(e) => setKioskPhone(e.target.value)}
                    placeholder="मोबाईल किंवा आधार नंबर"
                    className="flex-1 h-10 px-3 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-xs font-bold font-mono"
                  />
                  <button
                    onClick={() => setKioskPrinted(true)}
                    className="px-4 h-10 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">print</span>
                    <span>स्लिप छापा</span>
                  </button>
                </div>
              </div>

              {/* Printed Thermal Token Slip Preview */}
              {kioskPrinted && (
                <div className="bg-white text-black p-4 rounded-xl shadow-md border-2 border-dashed border-gray-400 font-mono text-xs flex flex-col space-y-2 animate-fade-in">
                  <div className="text-center border-b border-gray-300 pb-2">
                    <p className="font-bold text-sm">महाराष्ट्र शासन - DoCA</p>
                    <p className="text-[10px]">नाशिक APMC हमीभाव खरेदी केंद्र</p>
                    <p className="text-[10px]">दिनांक: ०८/०९/२०२६ • १०:१५ AM</p>
                  </div>

                  <div className="text-center py-2">
                    <span className="text-3xl font-black">{token.tokenNumber}</span>
                    <p className="text-[10px] mt-1">शेतकरी: रमेश पाटील (Patil)</p>
                    <p className="text-[10px]">पीक: सोयाबीन (४८.५ क्विंटल)</p>
                    <p className="text-[10px]">वाहन: {token.vehicleNumber}</p>
                  </div>

                  <div className="border-t border-gray-300 pt-2 text-[10px] space-y-1">
                    <div className="flex justify-between">
                      <span>नेमलेला काटा:</span>
                      <span className="font-bold">{token.weighbridgeNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>अंदाजे वेळ:</span>
                      <span className="font-bold">{token.slotTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>काट्यावर सुरू:</span>
                      <span className="font-bold">{token.currentTokenServing}</span>
                    </div>
                  </div>

                  <div className="text-center text-[9px] text-gray-500 pt-1">
                    *** डिजिटल रांग व्यवस्थापन प्रणाली ***
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
