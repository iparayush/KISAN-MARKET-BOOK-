import React, { useState } from 'react';
import { ActiveToken, Language } from '../types';

interface LiveQueueScreenProps {
  token: ActiveToken;
  language: Language;
  onSimulateAdvance: () => void;
  onOpenGatePass: () => void;
  onOpenDirections: () => void;
  onAdjustCounters?: (count: number) => void;
}

export const LiveQueueScreen: React.FC<LiveQueueScreenProps> = ({
  token,
  language,
  onSimulateAdvance,
  onOpenGatePass,
  onOpenDirections,
  onAdjustCounters,
}) => {
  const [activeScales, setActiveScales] = useState<number>(token.totalActiveScales || 3);
  const avgProcessingTime = 5.2; // minutes per farmer

  // Mathematical formula: Wait = (Ahead * AvgTime) / Counters
  const calculatedWait = Math.round((token.farmersAhead * avgProcessingTime) / activeScales);

  // Congestion state based on wait time
  const congestionState =
    calculatedWait > 60
      ? { labelMr: '🔴 उच्च गर्दी (High Congestion)', labelEn: '🔴 High Congestion', color: 'bg-red-100 text-red-800 border-red-300' }
      : calculatedWait > 30
      ? { labelMr: '🟡 मध्यम गर्दी (Moderate)', labelEn: '🟡 Moderate Congestion', color: 'bg-amber-100 text-amber-900 border-amber-300' }
      : { labelMr: '🟢 सामान्य गर्दी (Normal)', labelEn: '🟢 Normal Flow', color: 'bg-green-100 text-green-800 border-green-300' };

  // Generate sequence of tokens around current and target
  const currentNum = parseInt(token.currentTokenServing.replace('#', ''), 10) || 19;
  const userNum = parseInt(token.tokenNumber.replace('#', ''), 10) || 27;

  const queueItems = [];
  for (let i = Math.max(1, currentNum - 2); i <= userNum + 2; i++) {
    const numStr = `#${i.toString().padStart(3, '0')}`;
    const isServing = i === currentNum;
    const isUser = i === userNum;
    const isPassed = i < currentNum;

    queueItems.push({
      num: numStr,
      isServing,
      isUser,
      isPassed,
      timeEst: isPassed
        ? 'पूर्ण (Done)'
        : i === currentNum
        ? 'वजन सुरू (Weighing)'
        : `${Math.round(((i - currentNum) * avgProcessingTime) / activeScales)} मि`,
    });
  }

  const handleScaleChange = (delta: number) => {
    const next = Math.max(1, Math.min(6, activeScales + delta));
    setActiveScales(next);
    if (onAdjustCounters) {
      onAdjustCounters(next);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4 max-w-xl mx-auto pb-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-surface-container rounded-2xl p-4 border border-outline-variant/30 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {language === 'mr' ? 'थेट वजन काटा रांग' : 'Live APMC Weighbridge Queue'}
          </span>
          <h1 className="text-xl font-headline font-bold text-on-surface">
            {language === 'mr' ? token.mandiNameMr : token.mandiNameEn}
          </h1>
          <p className="text-xs text-on-surface-variant">
            {language === 'mr' ? `${token.gateNumber} • ${token.weighbridgeNumber}` : 'Gate No. 3 • Scale #2'}
          </p>
        </div>
        <button
          onClick={onOpenGatePass}
          className="px-3 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold shadow-xs hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">qr_code</span>
          <span>{language === 'mr' ? 'ई-पास' : 'e-Pass'}</span>
        </button>
      </div>

      {/* Congestion Status Banner */}
      <div className={`p-3 rounded-xl border flex items-center justify-between ${congestionState.color}`}>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">traffic</span>
          <span className="text-xs font-bold">
            {language === 'mr' ? congestionState.labelMr : congestionState.labelEn}
          </span>
        </div>
        <span className="text-[11px] font-medium font-mono">
          {activeScales} {language === 'mr' ? 'काटे सुरू' : 'Counters Active'}
        </span>
      </div>

      {/* Main Focus Card: Your Token vs Live Serving */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 border border-primary/20 shadow-sm flex flex-col space-y-4 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-2 gap-3 items-center">
          {/* User's Token */}
          <div className="bg-primary/5 border border-primary/30 rounded-xl p-3.5 flex flex-col">
            <span className="text-[11px] font-bold text-primary uppercase">
              {language === 'mr' ? 'तुमचा टोकन' : 'Your Token'}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl md:text-4xl font-headline font-extrabold text-primary">
                {token.tokenNumber}
              </span>
              <span className="text-xs text-primary font-semibold">
                ({language === 'mr' ? 'आज' : 'Today'})
              </span>
            </div>
            <span className="text-[11px] text-on-surface-variant mt-1">
              {language === 'mr' ? `गाडी: ${token.vehicleNumber}` : `Vehicle: ${token.vehicleNumber}`}
            </span>
          </div>

          {/* Currently Weighing Token */}
          <div className="bg-surface-container-low border border-outline-variant/40 rounded-xl p-3.5 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase">
                {language === 'mr' ? 'काट्यावर सुरू' : 'Now at Scale'}
              </span>
              <span className="w-2 h-2 rounded-full bg-green-600 animate-ping" />
            </div>
            <span className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface mt-1">
              {token.currentTokenServing}
            </span>
            <span className="text-[11px] text-primary font-bold mt-1">
              {language === 'mr' ? `${token.farmersAhead} वाहने पुढे आहेत` : `${token.farmersAhead} vehicles ahead`}
            </span>
          </div>
        </div>

        {/* Live Wait Telemetry Metric Bar */}
        <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">hourglass_bottom</span>
            </div>
            <div>
              <p className="text-[11px] text-on-surface-variant">
                {language === 'mr' ? 'अपेक्षित प्रतीक्षा वेळ' : 'Estimated Wait Time'}
              </p>
              <p className="text-base font-bold text-on-surface">
                {calculatedWait} {language === 'mr' ? 'मिनिटे (Minutes)' : 'Minutes'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-on-surface-variant block">
              {language === 'mr' ? 'नियोजित स्लॉट' : 'Slot Window'}
            </span>
            <span className="text-xs font-bold text-primary">
              {token.slotTime} ({language === 'mr' ? 'वेळेवर' : 'On Time'})
            </span>
          </div>
        </div>

        {/* Queue Engine Math Formula Box (PRD Section 10) */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-primary uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">calculate</span>
              <span>{language === 'mr' ? 'थेट रांग इंजिन सूत्र' : 'Live Queue Engine Formula'}</span>
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-on-surface-variant">काटे:</span>
              <button
                onClick={() => handleScaleChange(-1)}
                disabled={activeScales <= 1}
                className="w-5 h-5 rounded bg-surface-container flex items-center justify-center text-xs font-bold disabled:opacity-30"
              >
                -
              </button>
              <span className="font-mono text-xs font-bold px-1">{activeScales}</span>
              <button
                onClick={() => handleScaleChange(1)}
                disabled={activeScales >= 6}
                className="w-5 h-5 rounded bg-surface-container flex items-center justify-center text-xs font-bold disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg text-center font-mono text-[11px] text-on-surface border border-outline-variant/30">
            <span>प्रतीक्षा ({calculatedWait}m) = </span>
            <span className="text-primary font-bold">{token.farmersAhead} पुढे</span>
            <span> × </span>
            <span>५.२ मि</span>
            <span> ÷ </span>
            <span className="text-secondary font-bold">{activeScales} काटे</span>
          </div>
        </div>

        {/* Interactive Simulation Button */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-200">
            <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            <div className="text-xs">
              <p className="font-bold">
                {language === 'mr' ? 'थेट सिम्युलेशन चाचणी' : 'Live Mandi Queue Demo'}
              </p>
              <p className="text-[11px] opacity-80">
                {language === 'mr' ? 'पुढील वाहनाचे वजन पूर्ण करा' : 'Advance to next token in line'}
              </p>
            </div>
          </div>
          <button
            onClick={onSimulateAdvance}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold active:scale-95 transition-all shadow-xs flex items-center gap-1"
          >
            <span>{language === 'mr' ? 'टोकन पुढे सरकवा' : 'Advance Queue'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Visual Live Queue Track */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-xs flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">format_list_numbered</span>
            <span>{language === 'mr' ? 'काट्यावरील वाहनांचा क्रम' : 'Live Vehicle Order at Scale'}</span>
          </h2>
          <span className="text-xs text-on-surface-variant font-mono">
            {language === 'mr' ? 'काटा क्र. २' : 'Weighbridge #2'}
          </span>
        </div>

        <div className="flex flex-col space-y-2">
          {queueItems.map((item) => (
            <div
              key={item.num}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                item.isUser
                  ? 'bg-primary/10 border-primary shadow-xs ring-1 ring-primary'
                  : item.isServing
                  ? 'bg-amber-50 border-amber-400 dark:bg-amber-950/20'
                  : item.isPassed
                  ? 'bg-surface-container-low/60 border-outline-variant/20 opacity-60'
                  : 'bg-surface-container-lowest border-outline-variant/30'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    item.isUser
                      ? 'bg-primary text-on-primary'
                      : item.isServing
                      ? 'bg-amber-500 text-white animate-pulse'
                      : item.isPassed
                      ? 'bg-surface-container-highest text-on-surface-variant'
                      : 'bg-surface-container text-on-surface'
                  }`}
                >
                  {item.isPassed ? '✓' : item.num.replace('#', '')}
                </span>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-on-surface">{item.num}</span>
                    {item.isUser && (
                      <span className="text-[10px] bg-primary text-on-primary px-1.5 py-0.2 rounded font-bold">
                        {language === 'mr' ? 'तुमचा ट्रॅक्टर' : 'YOU'}
                      </span>
                    )}
                    {item.isServing && (
                      <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded font-bold animate-pulse">
                        {language === 'mr' ? 'काट्यावर' : 'At Scale'}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-on-surface-variant">
                    {item.isUser
                      ? language === 'mr'
                        ? 'रमेश पाटील • सोयाबीन (४८.५ क्विंटल)'
                        : 'Ramesh Patil • Soybean (48.5 Qtl)'
                      : item.isPassed
                      ? language === 'mr'
                        ? 'वजन पूर्ण • गोदाम क्र. ४ कडे'
                        : 'Completed • Moving to Godown'
                      : language === 'mr'
                      ? 'प्रतीक्षा रांगेत'
                      : 'Waiting in line'}
                  </span>
                </div>
              </div>

              <span
                className={`text-xs font-semibold font-mono ${
                  item.isServing
                    ? 'text-amber-600'
                    : item.isUser
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant'
                }`}
              >
                {item.timeEst}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Mandi Weighbridge Station Status */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-xs flex flex-col space-y-3">
        <h2 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[20px]">precision_manufacturing</span>
          <span>{language === 'mr' ? 'नाशिक APMC वजन काटे स्थिती' : 'Nashik APMC Weighbridges'}</span>
        </h2>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col border border-outline-variant/20">
            <span className="text-[11px] font-bold text-on-surface-variant">काटा क्र. १</span>
            <span className="text-xs font-bold text-green-700 mt-1">● मोकळा (Free)</span>
            <span className="text-[10px] text-on-surface-variant mt-0.5">गहू / मका</span>
          </div>

          <div className="bg-primary/10 rounded-xl p-2.5 flex flex-col border border-primary/30">
            <span className="text-[11px] font-bold text-primary">काटा क्र. २ (आपला)</span>
            <span className="text-xs font-bold text-primary mt-1">● कार्यरत (Active)</span>
            <span className="text-[10px] text-on-surface-variant mt-0.5">सोयाबीन लाईन</span>
          </div>

          <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col border border-outline-variant/20">
            <span className="text-[11px] font-bold text-on-surface-variant">काटा क्र. ३</span>
            <span className="text-xs font-bold text-green-700 mt-1">● कार्यरत (Active)</span>
            <span className="text-[10px] text-on-surface-variant mt-0.5">कापूस / जड वाहने</span>
          </div>
        </div>
      </div>

      {/* Navigation & Help Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onOpenDirections}
          className="h-11 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center space-x-1.5 text-sm font-bold hover:bg-surface-variant active:scale-95 transition-all border border-outline-variant/30"
        >
          <span className="material-symbols-outlined text-[20px] text-primary">navigation</span>
          <span>{language === 'mr' ? 'गेट ३ दिशामार्ग' : 'Gate 3 Route'}</span>
        </button>

        <button
          onClick={onOpenGatePass}
          className="h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center space-x-1.5 text-sm font-bold shadow-xs hover:bg-primary-container active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">badge</span>
          <span>{language === 'mr' ? 'डिजिटल गेट पास' : 'Digital Pass'}</span>
        </button>
      </div>
    </div>
  );
};
