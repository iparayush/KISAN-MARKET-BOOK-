import React, { useState } from 'react';
import {
  Language,
  ActiveToken,
  QueueTokenItem,
  ProcurementStep,
  PaymentRecord,
} from '../types';

interface CentreOperatorDashboardProps {
  language: Language;
  token: ActiveToken;
  queueTokens: QueueTokenItem[];
  onUpdateToken: (updatedToken: ActiveToken) => void;
  onUpdateQueueTokens: (tokens: QueueTokenItem[]) => void;
  onUpdateSteps: (steps: ProcurementStep[]) => void;
  onAddOrUpdatePayment: (payment: PaymentRecord) => void;
}

export const CentreOperatorDashboard: React.FC<CentreOperatorDashboardProps> = ({
  language,
  token,
  queueTokens,
  onUpdateToken,
  onUpdateQueueTokens,
  onUpdateSteps,
  onAddOrUpdatePayment,
}) => {
  // Selected token for the operator workbench (defaults to token #027 Ramesh Patil)
  const [selectedTokenId, setSelectedTokenId] = useState<string>('tok-27');
  const [activeCounters, setActiveCounters] = useState<number>(token.totalActiveScales || 3);
  const [avgProcessingTimeMin, setAvgProcessingTimeMin] = useState<number>(5.2);

  // Form states for Quality & Weighing Workbench
  const [moistureInput, setMoistureInput] = useState<number>(11.8);
  const [foreignMatterInput, setForeignMatterInput] = useState<number>(0.9);
  const [gradeInput, setGradeInput] = useState<string>('Grade A');
  const [qualityDecision, setQualityDecision] = useState<'accepted' | 'rejected' | 'review'>('accepted');

  const [grossWeightInput, setGrossWeightInput] = useState<number>(50.2);
  const [tareWeightInput, setTareWeightInput] = useState<number>(1.7);
  const netWeightComputed = Math.max(0, +(grossWeightInput - tareWeightInput).toFixed(2));

  const [activeScaleDesk, setActiveScaleDesk] = useState<string>('Scale #2');
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  const selectedTokenItem = queueTokens.find((t) => t.id === selectedTokenId) || queueTokens[0];

  const showToast = (msg: string) => {
    setNotificationBanner(msg);
    setTimeout(() => setNotificationBanner(null), 4000);
  };

  // Adjust active counters and recalculate wait times dynamically (FR-10 Queue Engine)
  const handleCounterChange = (newCount: number) => {
    const validCount = Math.max(1, Math.min(6, newCount));
    setActiveCounters(validCount);

    const updatedQueue = queueTokens.map((item, idx) => {
      const wait = Math.max(0, Math.round((idx * avgProcessingTimeMin) / validCount));
      return { ...item, waitTimeMin: wait };
    });
    onUpdateQueueTokens(updatedQueue);

    onUpdateToken({
      ...token,
      totalActiveScales: validCount,
      expectedWaitMin: Math.round((token.farmersAhead * avgProcessingTimeMin) / validCount),
    });

    showToast(
      language === 'mr'
        ? `सक्रिय वजन काटे ${validCount} केले. रांग वेळ आपोआप सुधारित झाली!`
        : `Active weighbridges updated to ${validCount}. Wait times recalculated!`
    );
  };

  // Action 1: Verify Farmer
  const handleVerifyFarmer = () => {
    const updatedQueue = queueTokens.map((t) =>
      t.id === selectedTokenItem.id ? { ...t, status: 'quality_check' as const } : t
    );
    onUpdateQueueTokens(updatedQueue);

    if (selectedTokenItem.tokenNumber === token.tokenNumber) {
      onUpdateToken({ ...token, status: 'verified' });
    }

    showToast(
      language === 'mr'
        ? `शेतकरी ${selectedTokenItem.farmerName} (Aadhaar & 7/12) पडताळणी यशस्वी!`
        : `Farmer ${selectedTokenItem.farmerName} verified via Aadhaar & 7/12!`
    );
  };

  // Action 2: Certify Quality
  const handleCertifyQuality = () => {
    const updatedQueue = queueTokens.map((t) =>
      t.id === selectedTokenItem.id
        ? {
            ...t,
            status: 'weighing' as const,
            moisturePercent: moistureInput,
            grade: gradeInput,
          }
        : t
    );
    onUpdateQueueTokens(updatedQueue);

    if (selectedTokenItem.tokenNumber === token.tokenNumber) {
      onUpdateToken({ ...token, status: 'quality_checked' });
    }

    showToast(
      language === 'mr'
        ? `गुणवत्ता तपासणी पूर्ण: ओलावा ${moistureInput}%, दर्जा '${gradeInput}' मंजूर!`
        : `Quality certified: Moisture ${moistureInput}%, ${gradeInput} Approved!`
    );
  };

  // Action 3: Record Weights
  const handleRecordWeights = () => {
    const updatedQueue = queueTokens.map((t) =>
      t.id === selectedTokenItem.id
        ? {
            ...t,
            status: 'accepted' as const,
            grossWeightQtl: grossWeightInput,
            tareWeightQtl: tareWeightInput,
            netWeightQtl: netWeightComputed,
            counter: activeScaleDesk,
          }
        : t
    );
    onUpdateQueueTokens(updatedQueue);

    if (selectedTokenItem.tokenNumber === token.tokenNumber) {
      onUpdateToken({ ...token, status: 'weighed' });
    }

    showToast(
      language === 'mr'
        ? `वजन नोंदवले: ग्रॉस ${grossWeightInput} Q - तारे ${tareWeightInput} Q = निव्वळ ${netWeightComputed} Q!`
        : `Weights recorded: Gross ${grossWeightInput} Q, Tare ${tareWeightInput} Q, Net ${netWeightComputed} Q!`
    );
  };

  // Action 4: Accept & Generate J-Form Bill
  const handleGenerateBill = () => {
    const rate = 4892;
    const total = Math.round(netWeightComputed * rate);

    const updatedQueue = queueTokens.map((t) =>
      t.id === selectedTokenItem.id ? { ...t, status: 'completed' as const } : t
    );
    onUpdateQueueTokens(updatedQueue);

    const newPaymentRecord: PaymentRecord = {
      id: `PAY-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      cropMr: 'सोयाबीन (Soybean)',
      cropEn: 'Soybean',
      quantityQtl: netWeightComputed,
      ratePerQtl: rate,
      totalAmount: total,
      date: '०८ सप्टें २०२६',
      status: 'processing',
      jFormNumber: `MH-NSK-J-2026-${selectedTokenItem.tokenNumber.replace('#', '')}`,
      mandiName: 'नाशिक APMC मुख्य केंद्र',
    };
    onAddOrUpdatePayment(newPaymentRecord);

    if (selectedTokenItem.tokenNumber === token.tokenNumber) {
      onUpdateToken({ ...token, status: 'billed' });
    }

    showToast(
      language === 'mr'
        ? `खरेदी मंजूर! अधिकृत J-Form बिल क्र. ${newPaymentRecord.jFormNumber} (₹${total.toLocaleString('en-IN')}) तयार झाले!`
        : `Procurement Accepted! J-Form #${newPaymentRecord.jFormNumber} (₹${total.toLocaleString('en-IN')}) generated!`
    );
  };

  // Action 5: Trigger DBT Bank Payment
  const handleAuthorizeDBT = () => {
    const updatedQueue = queueTokens.map((t) =>
      t.id === selectedTokenItem.id ? { ...t, status: 'completed' as const } : t
    );
    onUpdateQueueTokens(updatedQueue);

    onAddOrUpdatePayment({
      id: 'PAY-2026-9081',
      cropMr: 'सोयाबीन (Soybean)',
      cropEn: 'Soybean',
      quantityQtl: netWeightComputed,
      ratePerQtl: 4892,
      totalAmount: Math.round(netWeightComputed * 4892),
      date: '०८ सप्टें २०२६',
      status: 'credited',
      utrNumber: `RBIP${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      jFormNumber: `MH-NSK-J-2026-${selectedTokenItem.tokenNumber.replace('#', '')}`,
      mandiName: 'नाशिक APMC मुख्य केंद्र',
    });

    if (selectedTokenItem.tokenNumber === token.tokenNumber) {
      onUpdateToken({ ...token, status: 'completed' });
    }

    showToast(
      language === 'mr'
        ? `PFMS बँक DBT हस्तांतरण यशस्वी! रक्कम शेतकऱ्याच्या बँक खात्यात थेट जमा झाली!`
        : `PFMS DBT Transfer authorized! Funds credited directly to farmer bank account!`
    );
  };

  // Call Next Token in Queue
  const handleCallNextToken = () => {
    const currentNum = parseInt(token.currentTokenServing.replace('#', ''), 10);
    const nextServing = `#${(currentNum + 1).toString().padStart(3, '0')}`;
    const newAhead = Math.max(0, parseInt(token.tokenNumber.replace('#', ''), 10) - (currentNum + 1));
    const newWait = Math.round((newAhead * avgProcessingTimeMin) / activeCounters);

    onUpdateToken({
      ...token,
      currentTokenServing: nextServing,
      farmersAhead: newAhead,
      expectedWaitMin: newWait,
    });

    showToast(
      language === 'mr'
        ? `काटा क्र. २ वर आता टोकन ${nextServing} बोलावले आहे!`
        : `Token ${nextServing} called to Scale #2!`
    );
  };

  return (
    <div className="flex flex-col w-full space-y-4 max-w-4xl mx-auto pb-12 animate-fade-in">
      {/* Toast Notification Banner */}
      {notificationBanner && (
        <div className="fixed top-28 inset-x-4 max-w-lg mx-auto z-50 bg-secondary text-on-secondary p-3 rounded-xl shadow-xl flex items-center justify-between gap-2 border border-secondary-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span className="text-xs font-bold">{notificationBanner}</span>
          </div>
          <button
            onClick={() => setNotificationBanner(null)}
            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Operator Header Bar */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">point_of_sale</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-headline font-bold text-on-surface">
                {language === 'mr'
                  ? 'नाशिक APMC शासकीय खरेदी केंद्र ऑपरेटर डेस्क'
                  : 'Nashik APMC Procurement Centre Operator Desk'}
              </h1>
              <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 text-[10px] font-bold">
                LIVE DESK
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              {language === 'mr'
                ? 'ऑपरेटर: राजेश शिंदे (वरिष्ठ खरेदी अधिकारी) • गेट क्र. ३ व वजन काटा कक्ष'
                : 'Operator: Rajesh Shinde (Sr. Procurement Officer) • Gate 3 & Scales'}
            </p>
          </div>
        </div>

        {/* Counter Manager Controls */}
        <div className="flex items-center gap-2 bg-surface-container-low p-2 rounded-xl border border-outline-variant/30">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant font-bold uppercase">
              {language === 'mr' ? 'सक्रिय वजन काटे' : 'Active Scales'}
            </span>
            <span className="text-xs font-bold text-primary font-mono">
              {activeCounters} {language === 'mr' ? 'काटे सुरू' : 'Counters'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleCounterChange(activeCounters - 1)}
              disabled={activeCounters <= 1}
              className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center font-bold hover:bg-surface-container-high disabled:opacity-40"
            >
              -
            </button>
            <span className="w-6 text-center font-bold font-mono text-sm">{activeCounters}</span>
            <button
              onClick={() => handleCounterChange(activeCounters + 1)}
              disabled={activeCounters >= 6}
              className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center font-bold hover:bg-surface-container-high disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 6 Key Centre KPI Cards (FR-17) */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">
            {language === 'mr' ? 'आजचे शेतकरी' : "Today's Farmers"}
          </span>
          <span className="text-xl font-headline font-black text-on-surface mt-1">84</span>
          <span className="text-[9px] text-green-700 font-semibold mt-0.5">नोंदणीकृत (Registered)</span>
        </div>

        <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">
            {language === 'mr' ? 'रांगेत वाट पाहणारे' : 'Waiting in Queue'}
          </span>
          <span className="text-xl font-headline font-black text-secondary mt-1">12</span>
          <span className="text-[9px] text-secondary font-semibold mt-0.5">मध्यम गर्दी (Moderate)</span>
        </div>

        <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">
            {language === 'mr' ? 'पूर्ण खरेदी' : 'Completed'}
          </span>
          <span className="text-xl font-headline font-black text-primary mt-1">72</span>
          <span className="text-[9px] text-primary font-semibold mt-0.5">85% दैनिक लक्ष्य</span>
        </div>

        <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">
            {language === 'mr' ? 'सरासरी प्रतीक्षा' : 'Avg Wait Time'}
          </span>
          <span className="text-xl font-headline font-black text-on-surface mt-1">
            {token.expectedWaitMin} min
          </span>
          <span className="text-[9px] text-green-700 font-semibold mt-0.5">५८% वेळ बचत (Smart)</span>
        </div>

        <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">
            {language === 'mr' ? 'एकूण आवक' : 'Procured Today'}
          </span>
          <span className="text-xl font-headline font-black text-on-surface mt-1">3,480 Qtl</span>
          <span className="text-[9px] text-on-surface-variant font-semibold mt-0.5">सोयाबीन व कापूस</span>
        </div>

        <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">
            {language === 'mr' ? 'काटा वेग' : 'Processing Speed'}
          </span>
          <span className="text-xl font-headline font-black text-primary mt-1">
            {avgProcessingTimeMin} min
          </span>
          <span className="text-[9px] text-green-700 font-semibold mt-0.5">प्रति वाहन (Per Tractor)</span>
        </div>
      </div>

      {/* Main Operator Split View: Left Queue List + Right Active Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Live Today's Queue (FR-17) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col space-y-3">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]">queue</span>
              <h2 className="text-sm font-bold text-on-surface">
                {language === 'mr' ? "आजची टोकन रांग (Today's Queue)" : "Today's Queue"}
              </h2>
            </div>
            <button
              onClick={handleCallNextToken}
              className="px-2.5 py-1 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined text-[14px]">skip_next</span>
              <span>{language === 'mr' ? 'पुढील टोकन बोलवा' : 'Call Next'}</span>
            </button>
          </div>

          <div className="flex flex-col space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {queueTokens.map((item) => {
              const isSelected = item.id === selectedTokenItem.id;
              const isServing = item.tokenNumber === token.currentTokenServing;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedTokenId(item.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col space-y-1.5 ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-xs'
                      : 'border-outline-variant/30 bg-surface-container-low hover:border-outline-variant/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-headline font-black text-primary">
                        {item.tokenNumber}
                      </span>
                      <span className="text-xs font-bold text-on-surface truncate max-w-[140px]">
                        {item.farmerName}
                      </span>
                    </div>
                    {isServing ? (
                      <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 text-[10px] font-bold animate-pulse">
                        ● काट्यावर (Now)
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-on-surface-variant">
                        {item.slotTime}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span>
                      {item.crop} • {item.quantityQtl} Qtl
                    </span>
                    <span className="font-mono">{item.vehicleNumber}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20 text-[10px]">
                    <span className="text-primary font-bold">{item.counter}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                        item.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'weighing'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive 5-Stage Operator Workbench */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col space-y-4">
          {/* Active Farmer Focus Header */}
          <div className="flex items-start justify-between bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-headline font-black text-primary">
                  {selectedTokenItem.tokenNumber}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">{selectedTokenItem.farmerName}</h3>
                  <span className="text-[11px] font-mono text-on-surface-variant">
                    {selectedTokenItem.farmerId} • {selectedTokenItem.farmerPhone}
                  </span>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                {selectedTokenItem.crop} • {selectedTokenItem.quantityQtl} Qtl • {selectedTokenItem.vehicleNumber}
              </p>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-secondary text-on-secondary text-xs font-bold">
              {language === 'mr' ? 'सक्रिय कार्य बाक' : 'Active Workbench'}
            </span>
          </div>

          {/* Workbench Stages Accordion / Steps */}
          <div className="flex flex-col space-y-3">
            {/* 1. Farmer & Land Verification */}
            <div className="p-3.5 rounded-xl border border-outline-variant/30 bg-white dark:bg-zinc-900 flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                    १
                  </span>
                  <span className="text-xs font-bold text-on-surface">
                    {language === 'mr'
                      ? 'शेतकरी व ७/१२ पडताळणी (Farmer Verification)'
                      : 'Farmer & Land Verification'}
                  </span>
                </div>
                <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded">
                  Aadhaar KYC Match
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-surface-container-low p-2 rounded-lg">
                <div>
                  <span className="text-[10px] text-on-surface-variant block">७/१२ गट क्रमांक:</span>
                  <span className="font-bold text-on-surface">गट क्र. १४२ (५.२ एकर बागायत)</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">वाहन पडताळणी:</span>
                  <span className="font-mono font-bold text-on-surface">
                    {selectedTokenItem.vehicleNumber} (Tractor)
                  </span>
                </div>
              </div>

              <button
                onClick={handleVerifyFarmer}
                className="w-full h-9 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>{language === 'mr' ? 'कागदपत्र प्रमाणीकरण करा' : 'Verify Farmer & Land'}</span>
              </button>
            </div>

            {/* 2. Quality Module (FR-14) */}
            <div className="p-3.5 rounded-xl border border-outline-variant/30 bg-white dark:bg-zinc-900 flex flex-col space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                    २
                  </span>
                  <span className="text-xs font-bold text-on-surface">
                    {language === 'mr'
                      ? 'धान्य गुणवत्ता व ओलावा मॉड्यूल (Quality Module)'
                      : 'Quality & Moisture Assessment'}
                  </span>
                </div>
                <span className="text-[10px] bg-primary-fixed text-on-primary-fixed font-bold px-2 py-0.5 rounded">
                  Moisture Probe
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-on-surface-variant font-bold block mb-1">
                    {language === 'mr' ? 'ओलावा % (Moisture)' : 'Moisture %'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={moistureInput}
                    onChange={(e) => setMoistureInput(parseFloat(e.target.value) || 0)}
                    className="w-full h-8 px-2 rounded-lg border border-outline-variant/50 text-xs font-bold font-mono"
                  />
                  <span className="text-[9px] text-green-700 block mt-0.5">
                    {moistureInput <= 12.0 ? 'स्वीकार्य (≤12%)' : 'जास्त ओलावा (>12%)'}
                  </span>
                </div>

                <div>
                  <label className="text-[10px] text-on-surface-variant font-bold block mb-1">
                    {language === 'mr' ? 'कचरा % (Foreign)' : 'Foreign Matter %'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={foreignMatterInput}
                    onChange={(e) => setForeignMatterInput(parseFloat(e.target.value) || 0)}
                    className="w-full h-8 px-2 rounded-lg border border-outline-variant/50 text-xs font-bold font-mono"
                  />
                  <span className="text-[9px] text-on-surface-variant block mt-0.5">मानक: कमाल २%</span>
                </div>

                <div>
                  <label className="text-[10px] text-on-surface-variant font-bold block mb-1">
                    {language === 'mr' ? 'प्रत (Grade)' : 'Quality Grade'}
                  </label>
                  <select
                    value={gradeInput}
                    onChange={(e) => setGradeInput(e.target.value)}
                    className="w-full h-8 px-1.5 rounded-lg border border-outline-variant/50 text-xs font-bold bg-surface-container-low"
                  >
                    <option value="Grade A">दर्जा 'अ' (Grade A)</option>
                    <option value="Grade B">दर्जा 'ब' (Grade B)</option>
                    <option value="Grade C">दर्जा 'क' (Grade C)</option>
                  </select>
                  <span className="text-[9px] text-green-700 block mt-0.5">हमीभाव लागू</span>
                </div>
              </div>

              <button
                onClick={handleCertifyQuality}
                className="w-full h-9 rounded-lg bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-variant active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">fact_check</span>
                <span>{language === 'mr' ? 'गुणवत्ता प्रमाणपत्र जारी करा' : 'Certify Quality & Moisture'}</span>
              </button>
            </div>

            {/* 3. Weighing Module (FR-15) */}
            <div className="p-3.5 rounded-xl border border-outline-variant/30 bg-white dark:bg-zinc-900 flex flex-col space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                    ३
                  </span>
                  <span className="text-xs font-bold text-on-surface">
                    {language === 'mr'
                      ? 'डिजिटल वजन काटा मॉड्यूल (Weighing Module)'
                      : 'Digital Weighbridge Module'}
                  </span>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                  Scale #2 Active
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-on-surface-variant font-bold block mb-1">
                    ग्रॉस वजन (Gross Qtl)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={grossWeightInput}
                    onChange={(e) => setGrossWeightInput(parseFloat(e.target.value) || 0)}
                    className="w-full h-8 px-2 rounded-lg border border-outline-variant/50 text-xs font-bold font-mono"
                  />
                  <span className="text-[9px] text-on-surface-variant block mt-0.5">वाहनासह माल</span>
                </div>

                <div>
                  <label className="text-[10px] text-on-surface-variant font-bold block mb-1">
                    तारे वजन (Tare Qtl)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={tareWeightInput}
                    onChange={(e) => setTareWeightInput(parseFloat(e.target.value) || 0)}
                    className="w-full h-8 px-2 rounded-lg border border-outline-variant/50 text-xs font-bold font-mono"
                  />
                  <span className="text-[9px] text-on-surface-variant block mt-0.5">रिकामे वाहन</span>
                </div>

                <div className="bg-primary/10 p-2 rounded-lg border border-primary/20 flex flex-col justify-center text-center">
                  <span className="text-[10px] text-primary font-bold uppercase">निव्वळ धान्य (Net)</span>
                  <span className="text-base font-headline font-black text-primary">{netWeightComputed} Qtl</span>
                </div>
              </div>

              <button
                onClick={handleRecordWeights}
                className="w-full h-9 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">scale</span>
                <span>{language === 'mr' ? 'वजन काटा वाचन जतन करा' : 'Confirm Electronic Weighing'}</span>
              </button>
            </div>

            {/* 4 & 5. Procurement Acceptance, J-Form & Payment Trigger (FR-16) */}
            <div className="p-3.5 rounded-xl border-2 border-primary/40 bg-primary-fixed/20 flex flex-col space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                    ४
                  </span>
                  <span className="text-xs font-bold text-on-surface">
                    {language === 'mr'
                      ? 'खरेदी मंजुरी, J-Form बिल व DBT हस्तांतरण'
                      : 'Procurement Acceptance, J-Form & DBT'}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-primary">
                  ₹४,८९२ × {netWeightComputed} Qtl = ₹{(netWeightComputed * 4892).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleGenerateBill}
                  className="flex-1 h-10 rounded-xl bg-secondary text-on-secondary text-xs font-bold hover:bg-secondary-container active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  <span>{language === 'mr' ? 'J-Form बिल तयार करा' : 'Generate J-Form Bill'}</span>
                </button>

                <button
                  onClick={handleAuthorizeDBT}
                  className="flex-1 h-10 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">account_balance</span>
                  <span>{language === 'mr' ? 'DBT खात्यात वर्ग करा' : 'Release DBT Payment'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
