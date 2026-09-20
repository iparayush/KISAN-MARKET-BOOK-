import React from 'react';
import { MandiCenter, Language } from '../types';

interface MandiFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  mandis: MandiCenter[];
  language: Language;
  onSelectMandiForDirections: (mandi: MandiCenter) => void;
}

export const MandiFinderModal: React.FC<MandiFinderModalProps> = ({
  isOpen,
  onClose,
  mandis,
  language,
  onSelectMandiForDirections,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md p-5 border border-outline-variant/40 shadow-xl flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary text-[24px]">pin_drop</span>
            <div>
              <h2 className="text-base font-bold text-on-surface">
                {language === 'mr' ? 'खरेदी केंद्र थेट गर्दी नकाशा' : 'Live Mandi Center Radar'}
              </h2>
              <span className="text-[11px] text-on-surface-variant">
                {language === 'mr' ? 'नाशिक व पंचक्रोशीतील केंद्रे' : 'Nashik District Procurement Hubs'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            ✕
          </button>
        </div>

        {/* Live Radar Visual Banner */}
        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-primary/10 border border-primary/20 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-bold text-primary flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              थेट उपग्रह व ट्रॅफिक रडार (Live Mandi Radar)
            </span>
            <span className="text-[10px] bg-white dark:bg-black/40 px-2 py-0.5 rounded font-mono font-bold">
              GPS Active
            </span>
          </div>

          <div className="flex items-end justify-between z-10">
            <div>
              <span className="text-sm font-bold text-on-surface block">नाशिक APMC मुख्य केंद्र</span>
              <span className="text-[11px] text-green-700 font-semibold">
                ● गेट ३ मोकळे • सरासरी वेग: १२ मि/वाहन
              </span>
            </div>
            <span className="text-xs bg-primary text-on-primary px-2 py-1 rounded-lg font-bold">
              कमी गर्दी
            </span>
          </div>

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #00652c 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />
        </div>

        {/* Centers List */}
        <div className="flex flex-col space-y-2.5">
          {mandis.map((mandi) => (
            <div
              key={mandi.id}
              className="p-3.5 rounded-xl border border-outline-variant/30 bg-surface-container-low flex flex-col space-y-2 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs md:text-sm font-bold text-on-surface">
                    {language === 'mr' ? mandi.nameMr : mandi.nameEn}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">
                    {language === 'mr' ? mandi.locationMr : mandi.locationEn}
                  </p>
                </div>
                <span className="text-xs font-bold text-primary font-mono">
                  {mandi.distanceKm} km
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-surface-container-lowest p-2 rounded-lg border border-outline-variant/20">
                  <span className="text-on-surface-variant block">प्रतीक्षा वेळ:</span>
                  <span className="font-bold text-on-surface">{mandi.currentWaitMin} मिनिटे</span>
                </div>
                <div className="bg-surface-container-lowest p-2 rounded-lg border border-outline-variant/20">
                  <span className="text-on-surface-variant block">वजन काटे:</span>
                  <span className="font-bold text-green-700">{mandi.gatesOpen} सुरू</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-on-surface-variant">
                  {mandi.operatingHours}
                </span>

                <button
                  onClick={() => {
                    onSelectMandiForDirections(mandi);
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-primary text-on-primary text-xs font-bold flex items-center gap-1 hover:bg-primary-container active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">directions</span>
                  <span>{language === 'mr' ? 'दिशा मार्ग' : 'Route'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high"
        >
          {language === 'mr' ? 'बंद करा' : 'Close'}
        </button>
      </div>
    </div>
  );
};
