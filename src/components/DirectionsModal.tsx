import React from 'react';
import { Language, ActiveToken } from '../types';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: ActiveToken;
  language: Language;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  isOpen,
  onClose,
  token,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md p-5 border border-outline-variant/40 shadow-xl flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary text-[24px]">directions</span>
            <div>
              <h2 className="text-base font-bold text-on-surface">
                {language === 'mr' ? 'बाजार समिती अंतर्गत दिशा मार्ग' : 'Mandi Internal Route Guide'}
              </h2>
              <span className="text-[11px] text-on-surface-variant">
                नाशिक APMC • गेट क्र. ३ ते काटा क्र. २
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

        {/* Mandi Internal Route Schematic Map */}
        <div className="relative w-full h-48 rounded-xl bg-surface-container-low border border-outline-variant/30 p-3 overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-bold z-10">
            <span className="bg-primary text-on-primary px-2 py-0.5 rounded-full">
              आपला मार्ग: हिरवी लाईन
            </span>
            <span className="bg-surface-container-highest px-2 py-0.5 rounded text-on-surface">
              अंतर: ३५० मीटर
            </span>
          </div>

          {/* Graphical diagram representing the Mandi layout */}
          <svg className="w-full h-32 my-auto" viewBox="0 0 300 120" fill="none">
            {/* Roads */}
            <path d="M20,100 L90,100 L90,30 L220,30 L220,70 L280,70" stroke="#94a3b8" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20,100 L90,100 L90,30 L220,30 L220,70 L280,70" stroke="#00652c" strokeWidth="4" strokeDasharray="6 4" strokeLinecap="round" strokeLinejoin="round" />

            {/* Checkpoints */}
            {/* Gate 3 */}
            <circle cx="20" cy="100" r="10" fill="#15803d" />
            <text x="20" y="104" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">G3</text>
            <text x="20" y="118" textAnchor="middle" fill="#1e293b" fontSize="8" fontWeight="bold">गेट ३</text>

            {/* Moisture Lab */}
            <circle cx="90" cy="65" r="8" fill="#3b82f6" />
            <text x="110" y="68" fill="#1e293b" fontSize="8" fontWeight="bold">ओलावा लॅब</text>

            {/* Scale #2 (Target) */}
            <circle cx="220" cy="30" r="12" fill="#eab308" className="animate-pulse" />
            <text x="220" y="34" textAnchor="middle" fill="#000000" fontSize="9" fontWeight="black">K2</text>
            <text x="220" y="16" textAnchor="middle" fill="#00652c" fontSize="9" fontWeight="bold">काटा क्र. २ (लक्ष्य)</text>

            {/* Godown 4 */}
            <rect x="260" y="55" width="30" height="25" rx="3" fill="#64748b" />
            <text x="275" y="70" textAnchor="middle" fill="#ffffff" fontSize="7">गोदाम ४</text>
          </svg>

          <div className="flex items-center justify-between text-[10px] text-on-surface-variant z-10 border-t border-outline-variant/20 pt-1">
            <span>प्रवेश: दिंडोरी रोड मेन गेट</span>
            <span className="text-primary font-bold">ट्रॅक्टर लेन: Lane B</span>
          </div>
        </div>

        {/* Step-by-step driving guide */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-xs font-bold text-on-surface">वाहन चालकांसाठी सूचना:</h3>

          <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[11px] font-bold flex-shrink-0">
              १
            </span>
            <p className="text-on-surface leading-relaxed">
              दिंडोरी रस्त्यावरून <strong>गेट क्र. ३</strong> मध्ये प्रवेश करा. सुरक्षारक्षकास मोबाईलमधील <strong>डिजिटल बारकोड</strong> दाखवा.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[11px] font-bold flex-shrink-0">
              २
            </span>
            <p className="text-on-surface leading-relaxed">
              डाव्या बाजूच्या <strong>लेन 'ब'</strong> मधून थेट <strong>काटा क्र. २ (Weighbridge 2)</strong> कडे पुढे जा.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[11px] font-bold flex-shrink-0">
              ३
            </span>
            <p className="text-on-surface leading-relaxed">
              वजन झाल्यानंतर सरळ <strong>गोदाम क्र. ४</strong> मध्ये माल उतरवून पुन्हा रिकाम्या वाहनाचे वजन नोंदवा.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs"
        >
          {language === 'mr' ? 'दिशा मार्ग समजला' : 'Got it, thanks!'}
        </button>
      </div>
    </div>
  );
};
