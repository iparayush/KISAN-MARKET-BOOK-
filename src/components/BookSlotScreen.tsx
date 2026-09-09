import React, { useState } from 'react';
import { Language, MandiCenter, ActiveToken } from '../types';

interface BookSlotScreenProps {
  language: Language;
  mandis: MandiCenter[];
  onSlotBooked: (newToken: ActiveToken) => void;
}

export const BookSlotScreen: React.FC<BookSlotScreenProps> = ({
  language,
  mandis,
  onSlotBooked,
}) => {
  const [selectedMandiId, setSelectedMandiId] = useState('mandi-1');
  const [selectedCrop, setSelectedCrop] = useState('सोयाबीन (Soybean)');
  const [quantity, setQuantity] = useState('48.5');
  const [vehicleNumber, setVehicleNumber] = useState('MH-15-EK-4821');
  const [vehicleType, setVehicleType] = useState('ट्रॅक्टर ट्रॉली (Tractor Trolley)');
  const [selectedDate, setSelectedDate] = useState('08 सप्टें (आज / Today)');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:15 AM - 12:00 PM');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookedTokenNum, setBookedTokenNum] = useState('');

  const timeSlots = [
    {
      time: '08:30 AM - 09:15 AM',
      isAiRecommended: true,
      traffic: 'कमी गर्दी (Low)',
      wait: '15 min',
      slotsLeft: '१२ जागा शिल्लक',
    },
    {
      time: '11:15 AM - 12:00 PM',
      isAiRecommended: false,
      traffic: 'मध्यम (Moderate)',
      wait: '42 min',
      slotsLeft: '४ जागा शिल्लक',
    },
    {
      time: '02:00 PM - 02:45 PM',
      isAiRecommended: true,
      traffic: 'अतिशय कमी गर्दी (Very Low)',
      wait: '10 min',
      slotsLeft: '१९ जागा शिल्लक',
    },
    {
      time: '04:30 PM - 05:15 PM',
      isAiRecommended: false,
      traffic: 'गर्दी (Peak)',
      wait: '55 min',
      slotsLeft: '२ जागा शिल्लक',
    },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const tokenRandom = `#${Math.floor(Math.random() * 20 + 28).toString().padStart(3, '0')}`;
    setBookedTokenNum(tokenRandom);

    const selectedMandi = mandis.find((m) => m.id === selectedMandiId) || mandis[0];

    const newToken: ActiveToken = {
      tokenNumber: tokenRandom,
      currentTokenServing: '#019',
      farmersAhead: 8,
      expectedWaitMin: 35,
      mandiNameMr: selectedMandi.nameMr,
      mandiNameEn: selectedMandi.nameEn,
      gateNumber: 'गेट क्र. ३ (Gate No. 3)',
      weighbridgeNumber: 'काटा क्र. २ (Scale #2)',
      centerStatusMr: 'केंद्र सुरळीत कार्यरत (३ वजन काटे सुरू)',
      centerStatusEn: 'Center smoothly operational',
      totalActiveScales: 3,
      slotTime: selectedTimeSlot.split(' - ')[0],
      slotDate: selectedDate,
      vehicleNumber: vehicleNumber,
      vehicleType: vehicleType,
      status: 'booked',
    };

    setIsSuccess(true);
    setTimeout(() => {
      onSlotBooked(newToken);
    }, 1800);
  };

  return (
    <div className="flex flex-col w-full space-y-4 max-w-xl mx-auto pb-6">
      {/* Page Title & AI Advisor Banner */}
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary text-[24px]">calendar_month</span>
            <h1 className="text-base md:text-lg font-bold text-on-surface">
              {language === 'mr' ? 'शासकीय खरेदी स्लॉट बुकिंग' : 'Mandi Procurement Slot Booking'}
            </h1>
          </div>
          <span className="text-xs bg-secondary text-on-secondary px-2 py-0.5 rounded font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            AI मदत
          </span>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          {language === 'mr'
            ? 'कृषी उत्पन्न बाजार समितीतील थेट गर्दीनुसार AI प्रणालीने कमी गर्दीचे स्लॉट हायलाइट केले आहेत. यामुळे तुमचा किमान १ तास वेळ वाचेल.'
            : 'AI analyzes live mandi weighbridge telemetry to suggest slots with minimum waiting time.'}
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-primary/40 shadow-md text-center flex flex-col items-center space-y-3 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center text-3xl shadow-md">
            ✓
          </div>
          <h2 className="text-xl font-bold text-on-surface">
            {language === 'mr' ? 'स्लॉट यशस्वीरित्या बुक झाला!' : 'Slot Booked Successfully!'}
          </h2>
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 w-full">
            <span className="text-xs text-on-surface-variant block">
              {language === 'mr' ? 'नवीन टोकन क्रमांक' : 'Your Token Number'}
            </span>
            <span className="text-3xl font-headline font-extrabold text-primary">
              {bookedTokenNum}
            </span>
            <p className="text-xs text-on-surface mt-1">
              {selectedTimeSlot} • {selectedDate}
            </p>
          </div>
          <p className="text-xs text-on-surface-variant">
            {language === 'mr'
              ? 'आपला डिजिटल ई-पास तयार झाला आहे. थेट रांग पृष्ठावर रिडायरेक्ट करत आहे...'
              : 'Digital e-Pass generated. Redirecting to Live Queue...'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleBooking} className="flex flex-col space-y-4">
          {/* 1. Procurement Center Selection */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-xs flex flex-col space-y-2.5">
            <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">storefront</span>
              <span>{language === 'mr' ? '१. खरेदी केंद्र निवडा (Select Center)' : '1. Select Center'}</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {mandis.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMandiId(m.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedMandiId === m.id
                      ? 'bg-primary/5 border-primary ring-1 ring-primary'
                      : 'bg-surface-container-low border-outline-variant/30 hover:border-outline'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-bold text-on-surface">
                      {language === 'mr' ? m.nameMr : m.nameEn}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      {language === 'mr' ? m.locationMr : m.locationEn} • {m.distanceKm} km अंतर
                    </span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold">
                      {m.currentWaitMin} {language === 'mr' ? 'मि प्रतीक्षा' : 'min wait'}
                    </span>
                    <span className="text-[10px] text-green-700 mt-0.5 font-medium">
                      {m.gatesOpen} गेट खुले
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Crop & Estimated Quantity */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-xs flex flex-col space-y-3">
            <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">agriculture</span>
              <span>{language === 'mr' ? '२. पीक व अंदाजे प्रमाण (Crop & Quantity)' : '2. Crop & Quantity'}</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">
                  {language === 'mr' ? 'नोंदणीकृत पीक' : 'Registered Crop'}
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full h-11 px-2.5 rounded-xl bg-surface-container border border-outline-variant/40 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="सोयाबीन (Soybean)">सोयाबीन (Soybean)</option>
                  <option value="कापूस (Cotton)">कापूस (Cotton)</option>
                  <option value="हरभरा (Chana)">हरभरा (Chana)</option>
                  <option value="गहू (Wheat)">गहू (Wheat)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">
                  {language === 'mr' ? 'वजन (क्विंटल Qtl)' : 'Weight (Quintal)'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-surface-container border border-outline-variant/40 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="उदा. 48.5"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">
                  {language === 'mr' ? 'वाहन प्रकार' : 'Vehicle Type'}
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full h-11 px-2 rounded-xl bg-surface-container border border-outline-variant/40 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="ट्रॅक्टर ट्रॉली (Tractor Trolley)">ट्रॅक्टर ट्रॉली (Tractor)</option>
                  <option value="पिकअप (Pickup 407)">पिकअप (Pickup)</option>
                  <option value="बैलगाडी (Bullock Cart)">बैलगाडी (Bullock Cart)</option>
                  <option value="टेम्पो (Tempo)">छोटा टेम्पो (Tempo)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">
                  {language === 'mr' ? 'वाहन क्रमांक' : 'Vehicle Number'}
                </label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-surface-container border border-outline-variant/40 text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="MH-15-XX-0000"
                  required
                />
              </div>
            </div>
          </div>

          {/* 3. AI Smart Time Slot Selection */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-xs flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">alarm</span>
                <span>{language === 'mr' ? '३. तारीख व वेळ स्लॉट निवडा' : '3. Select Date & Time Slot'}</span>
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-[11px] font-bold bg-surface-container px-2 py-1 rounded-lg border border-outline-variant/30"
              >
                <option value="08 सप्टें (आज / Today)">आज, 08 सप्टें (Today)</option>
                <option value="09 सप्टें (उद्या / Tomorrow)">उद्या, 09 सप्टें (Tomorrow)</option>
                <option value="10 सप्टें (Wednesday)">10 सप्टें (बुधवार)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedTimeSlot === slot.time;
                return (
                  <div
                    key={slot.time}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-primary/10 border-primary ring-1 ring-primary'
                        : slot.isAiRecommended
                        ? 'bg-green-50/70 border-green-300 dark:bg-green-950/20'
                        : 'bg-surface-container-low border-outline-variant/30 hover:border-outline'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs md:text-sm font-bold text-on-surface font-mono">
                          {slot.time}
                        </span>
                        {slot.isAiRecommended && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-secondary text-on-secondary font-bold flex items-center gap-0.5">
                            ★ AI शिफारस
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-on-surface-variant">
                        {slot.traffic} • {slot.slotsLeft}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-primary block">
                        ~{slot.wait}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">
                        {language === 'mr' ? 'अपेक्षित वेळ' : 'Est. wait'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full h-12 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md hover:bg-primary-container active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            <span>{language === 'mr' ? 'टोकन व स्लॉट निश्चित करा' : 'Confirm Slot & Generate Token'}</span>
          </button>
        </form>
      )}
    </div>
  );
};
