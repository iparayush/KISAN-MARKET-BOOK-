import React, { useState } from 'react';
import { PhoneCall, MessageSquare, X, Send, Volume2, CheckCircle2, ShieldCheck, Phone, PhoneOff } from 'lucide-react';
import { Language, SMSNotificationMessage } from '../types';
import { t } from '../utils/i18n';

interface IvrSmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  smsMessages: SMSNotificationMessage[];
  tokenNumber: string;
  currentServing: string;
  farmersAhead: number;
  expectedWaitMin: number;
}

export const IvrSmsModal: React.FC<IvrSmsModalProps> = ({
  isOpen,
  onClose,
  language,
  smsMessages,
  tokenNumber,
  currentServing,
  farmersAhead,
  expectedWaitMin,
}) => {
  const [activeTab, setActiveTab] = useState<'sms' | 'ivr'>('sms');
  const [queryText, setQueryText] = useState('');
  const [inbox, setInbox] = useState<SMSNotificationMessage[]>(smsMessages);
  const [ivrCallState, setIvrCallState] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [ivrAudioText, setIvrAudioText] = useState<string>('');
  const [keyHistory, setKeyHistory] = useState<string>('');

  if (!isOpen) return null;

  const handleSendSmsInquiry = () => {
    if (!queryText.trim()) return;

    const userMsg: SMSNotificationMessage = {
      id: `SMS-${Date.now()}`,
      time: 'आत्ता (Just now)',
      sender: 'आपला फोन (Farmer)',
      type: 'QUEUE',
      messageMr: `चौकशी पाठवली: ${queryText}`,
      messageHi: `पूछताछ भेजी: ${queryText}`,
      messageEn: `Query Sent: ${queryText}`,
    };

    let replyMr = `किसानखरेदी उत्तर: टोकन ${tokenNumber} पुढे ${farmersAhead} शेतकरी आहेत. अंदाजे वेळ: ${expectedWaitMin} मिनिटे.`;
    let replyHi = `किसानखरीद उत्तर: टोकन ${tokenNumber} के आगे ${farmersAhead} किसान हैं। अनुमानित समय: ${expectedWaitMin} मिनट।`;
    let replyEn = `KisanProcure Reply: Token ${tokenNumber} has ${farmersAhead} farmers ahead. Est wait: ${expectedWaitMin} min.`;

    if (queryText.toUpperCase().includes('PAY') || queryText.includes('पेमेंट')) {
      replyMr = `किसानखरेदी उत्तर: J-Form #MH-NSK-J-2026-88291 ची ₹२,३७,२६२ रक्कम DBT द्वारे बँक ऑफ महाराष्ट्र खात्यात प्रक्रियाधीन आहे.`;
      replyHi = `किसानखरीद उत्तर: J-Form #MH-NSK-J-2026-88291 की ₹2,37,262 राशि DBT द्वारा बैंक ऑफ महाराष्ट्र खाते में प्रक्रियाधीन है।`;
      replyEn = `KisanProcure Reply: ₹2,37,262 for J-Form #MH-NSK-J-2026-88291 is processing via DBT.`;
    }

    const replyMsg: SMSNotificationMessage = {
      id: `SMS-REPLY-${Date.now()}`,
      time: 'आत्ता (Just now)',
      sender: 'KisanProcure Gateway (56161)',
      type: 'QUEUE',
      messageMr: replyMr,
      messageHi: replyHi,
      messageEn: replyEn,
    };

    setInbox([replyMsg, userMsg, ...inbox]);
    setQueryText('');
  };

  const startIvrCall = () => {
    setIvrCallState('calling');
    setKeyHistory('');
    setTimeout(() => {
      setIvrCallState('connected');
      const welcome = t(
        language,
        'नमस्कार, राष्ट्रीय किसानखरेदी IVR सेवेत आपले स्वागत आहे. टोकन माहितीसाठी १ दाबा, थेट रांगेसाठी २ दाबा, खरेदी स्थितीसाठी ३ दाबा, पेमेंट्ससाठी ४ दाबा.',
        'नमस्कार, राष्ट्रीय किसानखरीद IVR सेवा में आपका स्वागत है। टोकन जानकारी के लिए 1 दबाएं, लाइव कतार के लिए 2 दबाएं, खरीद स्थिति के लिए 3 दबाएं, भुगतान के लिए 4 दबाएं।',
        'Welcome to KisanProcure IVR Service. Press 1 for Token info, 2 for Live Queue, 3 for Procurement status, 4 for Payment status.'
      );
      setIvrAudioText(welcome);
      speakIvr(welcome);
    }, 1500);
  };

  const handleKeyPress = (key: string) => {
    if (ivrCallState !== 'connected') return;
    setKeyHistory((prev) => prev + key);

    let audioMsg = '';
    if (key === '1') {
      audioMsg = t(
        language,
        `आपले टोकन क्रमांक ${tokenNumber} आहे. नाशिक APMC केंद्र, स्लॉट वेळ १०:३० AM.`,
        `आपका टोकन नंबर ${tokenNumber} है। नासिक APMC केंद्र, स्लॉट समय 10:30 AM।`,
        `Your token number is ${tokenNumber} at Nashik APMC Centre for 10:30 AM.`
      );
    } else if (key === '2') {
      audioMsg = t(
        language,
        `सध्या टोकन ${currentServing} सुरू आहे. तुमच्या पुढे ${farmersAhead} शेतकरी आहेत. अंदाजे प्रतीक्षा वेळ ${expectedWaitMin} मिनिटे आहे.`,
        `वर्तमान में टोकन ${currentServing} जारी है। आपके आगे ${farmersAhead} किसान हैं। अनुमानित प्रतीक्षा समय ${expectedWaitMin} मिनट है।`,
        `Currently token ${currentServing} is serving. ${farmersAhead} farmers are ahead. Expected wait is ${expectedWaitMin} minutes.`
      );
    } else if (key === '3') {
      audioMsg = t(
        language,
        `तुमच्या ४८.५ क्विंटल सोयाबीन मालाची गुणवत्ता व वजन पूर्ण झाले असून खरेदी मंजूर केली आहे.`,
        `आपके 48.5 क्विंटल सोयाबीन की गुणवत्ता और वजन पूरा हो चुका है तथा खरीद स्वीकृत की गई है।`,
        `Your 48.5 Qtl Soybean procurement has been quality checked, weighed, and officially accepted.`
      );
    } else if (key === '4') {
      audioMsg = t(
        language,
        `J-Form पावतीची ₹२,३७,२६२ रक्कम PFMS द्वारे तुमच्या बँक ऑफ महाराष्ट्र खात्यात प्रक्रियाधीन आहे.`,
        `J-Form रसीद की ₹2,37,262 राशि PFMS द्वारा आपके बैंक ऑफ महाराष्ट्र खाते में प्रक्रियाधीन है।`,
        `Payment of ₹2,37,262 is processing via PFMS to your Bank of Maharashtra account.`
      );
    } else {
      audioMsg = t(
        language,
        'कृपया वैद्यकीय मदत किंवा ऑपरेटरसाठी केंद्रावर संपर्क साधा.',
        'कृपया सहायता के लिए केंद्र ऑपरेटर से संपर्क करें।',
        'Please contact centre operator for further assistance.'
      );
    }

    setIvrAudioText(audioMsg);
    speakIvr(audioMsg);
  };

  const endIvrCall = () => {
    setIvrCallState('ended');
    setIvrAudioText(t(language, 'कॉल समाप्त झाला.', 'कॉल समाप्त हुआ।', 'Call ended.'));
    try {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } catch {
      // safe
    }
  };

  const speakIvr = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.95;
        window.speechSynthesis.speak(u);
      }
    } catch {
      // safe
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700/60 flex items-center justify-center border border-emerald-400/30">
              <PhoneCall className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {t(language, 'IVR व SMS शेतकरी प्रवेश सिमुलेटर', 'IVR एवं SMS किसान एक्सेस सिम्युलेटर', 'IVR & SMS Farmer Access Simulator')}
              </h3>
              <p className="text-xs text-emerald-200">
                {t(language, 'साध्या फोन/फीचर फोन धारकांसाठी डिजिटल सेवा', 'सादे फोन/फीचर फोन उपयोगकर्ताओं हेतु डिजिटल सेवा', 'Digital service for non-smartphone farmers')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-700 flex items-center justify-center transition-colors text-emerald-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1">
          <button
            onClick={() => setActiveTab('sms')}
            className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'sms'
                ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>{t(language, 'SMS इनबॉक्स व चौकशी', 'SMS इनबॉक्स एवं पूछताछ', 'SMS Inbox & Enquiries')}</span>
          </button>
          <button
            onClick={() => setActiveTab('ivr')}
            className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'ivr'
                ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <span>{t(language, 'IVR व्हॉईस कॉल (१८००-१८०-१५५१)', 'IVR वॉइस कॉल (1800-180-1551)', 'IVR Voice Call (1800-180-1551)')}</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'sms' ? (
            <div className="space-y-4">
              {/* Quick Query Form */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <label className="text-xs font-bold text-emerald-900 block mb-1">
                  {t(language, 'SMS चौकशी सिमुलेटर (५६१६१ वर मेसेज पाठवा)', 'SMS पूछताछ सिम्युलेटर (56161 पर मैसेज भेजें)', 'Send SMS Query Simulator (to 56161)')}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    placeholder={t(language, 'उदा. STATUS किंवा QUEUE टाईप करा...', 'उदा. STATUS या QUEUE टाइप करें...', 'e.g. Type STATUS or QUEUE...')}
                    className="flex-1 text-xs border border-emerald-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-800"
                  />
                  <button
                    onClick={handleSendSmsInquiry}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-sm transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t(language, 'पाठवा', 'भेजें', 'Send')}</span>
                  </button>
                </div>
              </div>

              {/* Message List */}
              <div className="space-y-3">
                {inbox.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-xl border text-xs ${
                      msg.sender.includes('Farmer') || msg.sender.includes('आपला')
                        ? 'bg-slate-100 border-slate-300 ml-6 text-slate-800'
                        : 'bg-white border-slate-200 shadow-sm mr-2 border-l-4 border-l-emerald-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-emerald-900 flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{msg.sender}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {language === 'hi' ? msg.messageHi || msg.messageMr : language === 'en' ? msg.messageEn : msg.messageMr}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* IVR Phone Call Interface */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-inner border border-slate-800 text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-emerald-400 text-xs font-semibold tracking-wide">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{t(language, 'DoCA IVR टोल-फ्री: १८००-१८०-१५५१', 'DoCA IVR टोल-फ्री: 1800-180-1551', 'DoCA IVR Toll-Free: 1800-180-1551')}</span>
                </div>

                {ivrCallState === 'idle' || ivrCallState === 'ended' ? (
                  <div className="py-6 space-y-3">
                    <p className="text-xs text-slate-300">
                      {t(
                        language,
                        'ऑटोमेटेड व्हॉईस रिस्पॉन्स सिस्टिमचा अनुभव घेण्यासाठी खालील हिरव्या बटणावर क्लिक करा.',
                        'स्वचालित वॉइस रिस्पांस सिस्टम का अनुभव करने के लिए नीचे हरे बटन पर क्लिक करें।',
                        'Click below to initiate automated interactive voice menu simulation.'
                      )}
                    </p>
                    <button
                      onClick={startIvrCall}
                      className="mx-auto bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full text-xs font-bold shadow-lg flex items-center space-x-2 transition-transform active:scale-95"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{t(language, 'IVR कॉल डायलर सुरू करा', 'IVR कॉल डायल शुरू करें', 'Dial IVR Toll-Free Call')}</span>
                    </button>
                  </div>
                ) : ivrCallState === 'calling' ? (
                  <div className="py-8 space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-900/80 border border-emerald-500/40 flex items-center justify-center mx-auto animate-pulse">
                      <PhoneCall className="w-6 h-6 text-emerald-300 animate-bounce" />
                    </div>
                    <p className="text-sm font-semibold text-emerald-300">
                      {t(language, 'कॉल जोडला जात आहे...', 'कॉल कनेक्ट किया जा रहा है...', 'Connecting call to IVR hub...')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Live Audio Box */}
                    <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3.5 text-left text-xs space-y-2 min-h-[70px]">
                      <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                        <Volume2 className="w-4 h-4 animate-pulse" />
                        <span>{t(language, 'IVR ऑडिओ संदेश:', 'IVR ऑडियो संदेश:', 'IVR Audio Prompt:')}</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed font-mono text-[11px]">
                        "{ivrAudioText}"
                      </p>
                      {keyHistory && (
                        <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-700">
                          {t(language, 'इनपुट कीज:', 'इनपुट कुंजियाँ:', 'Pressed Keys:')} {keyHistory}
                        </div>
                      )}
                    </div>

                    {/* Keypad */}
                    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto pt-2">
                      {[
                        { key: '1', label: t(language, '१. टोकन', '1. टोकन', '1. Token') },
                        { key: '2', label: t(language, '२. रांग', '2. कतार', '2. Queue') },
                        { key: '3', label: t(language, '३. खरेदी', '3. खरीद', '3. Status') },
                        { key: '4', label: t(language, '४. पेमेंट', '4. भुगतान', '4. Payment') },
                        { key: '5', label: t(language, '५. मदत', '5. सहायता', '5. Help') },
                        { key: '0', label: t(language, '०. ऑपरेटर', '0. ऑपरेटर', '0. Operator') },
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => handleKeyPress(item.key)}
                          className="bg-slate-800 hover:bg-slate-700 active:bg-emerald-700 text-white p-2.5 rounded-xl border border-slate-700 flex flex-col items-center justify-center shadow transition-all active:scale-95"
                        >
                          <span className="text-base font-bold text-emerald-300">{item.key}</span>
                          <span className="text-[9px] text-slate-400">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={endIvrCall}
                      className="mx-auto bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-xs font-semibold flex items-center space-x-2 shadow-md transition-colors mt-2"
                    >
                      <PhoneOff className="w-4 h-4" />
                      <span>{t(language, 'कॉल कट करा', 'कॉल समाप्त करें', 'End IVR Call')}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t(language, 'DoCA टेलिकॉम गेटवे जोडलेला आहे', 'DoCA टेलीकॉम गेटवे जुड़ा हुआ है', 'Connected to DoCA Telecom Gateway')}</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors"
          >
            {t(language, 'बंद करा', 'बंद करें', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
};
