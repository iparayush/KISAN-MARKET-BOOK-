import React from 'react';
import { ActiveToken, FarmerProfile, Language, RegisteredCrop } from '../types';

interface GatePassModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: ActiveToken;
  farmer: FarmerProfile;
  crop: RegisteredCrop;
  language: Language;
}

export const GatePassModal: React.FC<GatePassModalProps> = ({
  isOpen,
  onClose,
  token,
  farmer,
  crop,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md p-5 border border-outline-variant/40 shadow-xl flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary text-[24px]">qr_code_2</span>
            <div>
              <h2 className="text-base font-bold text-on-surface">
                {language === 'mr' ? 'अधिकृत डिजिटल गेट पास' : 'Official Digital Gate Pass'}
              </h2>
              <span className="text-[11px] text-on-surface-variant font-mono">
                APMC-PASS-2026-{token.tokenNumber.replace('#', '')}
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

        {/* Official Pass Document Card */}
        <div className="border-2 border-primary/40 rounded-2xl p-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex flex-col space-y-3 relative shadow-inner">
          {/* Watermark header */}
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-green-700 text-white flex items-center justify-center font-bold text-xs">
                APMC
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-green-900 dark:text-green-300 uppercase leading-none">
                  कृषी उत्पन्न बाजार समिती, नाशिक
                </span>
                <span className="text-[9px] text-zinc-500 leading-tight">
                  शासकीय हमीभाव खरेदी केंद्र • थेट गेट प्रवेश पास
                </span>
              </div>
            </div>
            <span className="text-[10px] bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 font-bold px-2 py-0.5 rounded">
              प्रवेश वैध
            </span>
          </div>

          {/* Token Numeral Highlight */}
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                टोकन क्रमांक (Token No.)
              </span>
              <span className="text-3xl font-headline font-black text-green-800 dark:text-green-400">
                {token.tokenNumber}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-zinc-500 block">प्रवेश गेट व काटा</span>
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                {token.gateNumber} • {token.weighbridgeNumber}
              </span>
            </div>
          </div>

          {/* Simulated Scannable Barcode & QR Code */}
          <div className="flex flex-col items-center justify-center py-2 bg-white dark:bg-zinc-950 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 space-y-2">
            {/* SVG QR Code Simulation */}
            <div className="w-32 h-32 p-2 bg-white border border-zinc-300 rounded-lg flex items-center justify-center shadow-xs">
              <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-900" fill="currentColor">
                {/* QR corners */}
                <rect x="5" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="12" y="12" width="14" height="14" />
                <rect x="67" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="74" y="12" width="14" height="14" />
                <rect x="5" y="67" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="12" y="74" width="14" height="14" />
                {/* Pattern dots */}
                <rect x="42" y="10" width="8" height="8" />
                <rect x="54" y="10" width="6" height="8" />
                <rect x="42" y="24" width="12" height="6" />
                <rect x="10" y="42" width="8" height="8" />
                <rect x="24" y="42" width="8" height="12" />
                <rect x="40" y="40" width="20" height="20" />
                <rect x="66" y="42" width="10" height="6" />
                <rect x="80" y="42" width="10" height="10" />
                <rect x="42" y="66" width="8" height="12" />
                <rect x="56" y="72" width="10" height="8" />
                <rect x="72" y="68" width="18" height="8" />
                <rect x="72" y="82" width="10" height="10" />
              </svg>
            </div>
            <span className="font-mono text-[10px] text-zinc-500 tracking-widest">
              SCAN-MH-NSK-{token.tokenNumber.replace('#', '')}-88291
            </span>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-2 gap-2 text-xs border-t border-zinc-200 dark:border-zinc-800 pt-2">
            <div>
              <span className="text-zinc-500 text-[10px] block">शेतकऱ्याचे नाव:</span>
              <span className="font-bold">{farmer.nameMr}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">शेतकरी आयडी:</span>
              <span className="font-mono font-bold">{farmer.id}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">पीक तपशील:</span>
              <span className="font-bold">{crop.nameMr} ({crop.weightQtl} Qtl)</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">वाहन नोंदणी:</span>
              <span className="font-mono font-bold">{token.vehicleNumber}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 h-11 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-variant flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>{language === 'mr' ? 'प्रिंट पास' : 'Print Pass'}</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">check</span>
            <span>{language === 'mr' ? 'समजले' : 'Done'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
