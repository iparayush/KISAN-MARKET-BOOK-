import React from 'react';
import { PaymentRecord, FarmerProfile, Language } from '../types';

interface JFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: PaymentRecord | null;
  farmer: FarmerProfile;
  language: Language;
}

export const JFormModal: React.FC<JFormModalProps> = ({
  isOpen,
  onClose,
  payment,
  farmer,
  language,
}) => {
  if (!isOpen || !payment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg p-5 border border-outline-variant/40 shadow-2xl flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary text-[24px]">receipt_long</span>
            <div>
              <h2 className="text-base font-bold text-on-surface">
                {language === 'mr' ? 'अधिकृत शासकीय खरेदी पावती (J-Form)' : 'Official Mandi J-Form Receipt'}
              </h2>
              <span className="text-[11px] text-on-surface-variant font-mono">
                {payment.jFormNumber}
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

        {/* Legal Indian APMC J-Form layout */}
        <div className="border border-zinc-300 dark:border-zinc-700 bg-amber-50/40 dark:bg-zinc-900 rounded-xl p-4 text-zinc-900 dark:text-zinc-100 flex flex-col space-y-3 font-sans">
          {/* Header */}
          <div className="text-center border-b border-zinc-300 dark:border-zinc-700 pb-2">
            <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest block">
              महाराष्ट्र कृषी उत्पन्न पणन (विनियमन) अधिनियम १९६३
            </span>
            <h3 className="text-base font-bold text-green-900 dark:text-green-400">
              नमुना 'जे' (FORM 'J') - शेतकरी खरेदी पावती
            </h3>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              {payment.mandiName} • हमीभाव खरेदी केंद्र
            </span>
          </div>

          {/* Metadata Row */}
          <div className="grid grid-cols-2 gap-2 text-xs border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <div>
              <span className="text-zinc-500 text-[10px] block">शेतकऱ्याचे नाव:</span>
              <span className="font-bold">{farmer.nameMr}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">शेतकरी क्रमांक (ID):</span>
              <span className="font-mono font-bold">{farmer.id}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">तारीख (Date):</span>
              <span>{payment.date}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">स्थिती (Status):</span>
              <span className="font-bold text-green-700">
                {payment.status === 'credited' ? 'रक्कम खात्यात जमा (DBT Credited)' : 'मंजूर / प्रक्रियेत'}
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-zinc-300 dark:border-zinc-700 font-bold text-zinc-600 dark:text-zinc-400">
                  <th className="py-1">पीक (Commodity)</th>
                  <th className="py-1 text-center">वजन (Qtl)</th>
                  <th className="py-1 text-right">हमीभाव दर (₹)</th>
                  <th className="py-1 text-right">एकूण रक्कम (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="py-1.5 font-medium">{payment.cropMr}</td>
                  <td className="py-1.5 text-center font-mono">{payment.quantityQtl}</td>
                  <td className="py-1.5 text-right font-mono">₹{payment.ratePerQtl}</td>
                  <td className="py-1.5 text-right font-bold font-mono">
                    ₹{payment.totalAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bank & Net payout summary */}
          <div className="bg-zinc-100 dark:bg-zinc-800/80 p-2.5 rounded-lg flex items-center justify-between text-xs">
            <div>
              <span className="text-zinc-500 text-[10px] block">DBT बँक तपशील:</span>
              <span className="font-semibold">{farmer.bankName}</span>
              <span className="font-mono block text-zinc-600 dark:text-zinc-400">{farmer.bankAccount}</span>
              {payment.utrNumber && (
                <span className="text-[10px] text-zinc-500 font-mono block">
                  UTR: {payment.utrNumber}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className="text-zinc-500 text-[10px] block">देय एकूण निव्वळ रक्कम:</span>
              <span className="text-base font-bold text-green-800 dark:text-green-400">
                ₹{payment.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Official Seals */}
          <div className="flex items-center justify-between pt-2 text-[10px] text-zinc-500">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-green-700 flex items-center justify-center text-green-700 font-bold text-[8px] text-center p-1 leading-tight">
                APMC NASHIK SEAL
              </div>
              <span className="mt-1">अधिकृत शिक्का</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-script text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Signed Digitally
              </span>
              <span className="mt-1 border-t border-zinc-400 pt-0.5">खरेदी अधिकारी सही</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 h-11 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-variant flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>{language === 'mr' ? 'प्रिंट पावती' : 'Print J-Form'}</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs"
          >
            {language === 'mr' ? 'बंद करा' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
