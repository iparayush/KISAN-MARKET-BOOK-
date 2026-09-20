import React from 'react';
import { PaymentRecord, Language, FarmerProfile } from '../types';
import { MSP_PRICE_LIST } from '../data/mockData';

interface PaymentsScreenProps {
  payments: PaymentRecord[];
  farmer: FarmerProfile;
  language: Language;
  onOpenJFormDetail: (payment: PaymentRecord) => void;
}

export const PaymentsScreen: React.FC<PaymentsScreenProps> = ({
  payments,
  farmer,
  language,
  onOpenJFormDetail,
}) => {
  const totalCredited = payments
    .filter((p) => p.status === 'credited')
    .reduce((acc, p) => acc + p.totalAmount, 0);

  const pendingAmount = payments
    .filter((p) => p.status === 'processing')
    .reduce((acc, p) => acc + p.totalAmount, 0);

  return (
    <div className="flex flex-col w-full space-y-4 max-w-xl mx-auto pb-6">
      {/* DBT Bank Account & Balance Hero Card */}
      <div className="bg-primary text-on-primary rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[24px]">account_balance</span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-fixed">
              {language === 'mr' ? 'थेट बँक हस्तांतरण (DBT)' : 'Direct Benefit Transfer (DBT)'}
            </span>
          </div>
          <span className="text-[10px] bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
            आधार लिंक
          </span>
        </div>

        <div>
          <span className="text-xs opacity-80 block">
            {language === 'mr' ? 'चालू हंगामात जमा एकूण रक्कम' : 'Total Procurement DBT Credited'}
          </span>
          <div className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight">
            ₹{totalCredited.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
          <div className="flex flex-col">
            <span className="opacity-75">{farmer.bankName}</span>
            <span className="font-mono font-bold">{farmer.bankAccount}</span>
          </div>

          <div className="text-right flex flex-col">
            <span className="opacity-75">{language === 'mr' ? 'प्रक्रियेत रक्कम' : 'Under Processing'}</span>
            <span className="font-bold text-amber-200">₹{pendingAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Payment & J-Form Transaction Records */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-xs flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">receipt_long</span>
            <span>{language === 'mr' ? 'खरेदी पावती व जे-फॉर्म (J-Forms)' : 'Procurement Receipts & J-Forms'}</span>
          </h2>
          <span className="text-xs text-primary font-bold">
            {payments.length} {language === 'mr' ? 'नोंदी' : 'records'}
          </span>
        </div>

        <div className="flex flex-col space-y-2.5">
          {payments.map((p) => {
            const isCredited = p.status === 'credited';
            return (
              <div
                key={p.id}
                onClick={() => onOpenJFormDetail(p)}
                className="p-3 rounded-xl border border-outline-variant/30 bg-surface-container-low hover:border-primary/50 cursor-pointer transition-all flex flex-col space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-bold text-on-surface">
                      {language === 'mr' ? p.cropMr : p.cropEn}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      {p.quantityQtl} क्विंटल @ ₹{p.ratePerQtl}/क्विंटल
                    </span>
                  </div>

                  <div className="text-right flex flex-col items-end">
                    <span className="text-sm font-bold text-on-surface">
                      ₹{p.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold mt-0.5 ${
                        isCredited
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                      }`}
                    >
                      {isCredited
                        ? language === 'mr'
                          ? 'खात्यात जमा (Credited)'
                          : 'DBT Credited'
                        : language === 'mr'
                        ? 'प्रक्रियेत (Processing)'
                        : 'Processing'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span className="font-mono">{p.jFormNumber}</span>
                  <span className="text-primary font-bold flex items-center gap-1">
                    <span>{language === 'mr' ? 'पावती पहा' : 'View J-Form'}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Government MSP Price Chart 2026-27 */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-xs flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">currency_rupee</span>
            <h2 className="text-sm font-bold text-on-surface">
              {language === 'mr' ? 'शासकीय हमीभाव दर पत्रक (MSP 2026-27)' : 'Govt MSP Rates (2026-27)'}
            </h2>
          </div>
          <span className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded font-bold text-on-surface-variant">
            अधिकृत दर
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {MSP_PRICE_LIST.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-on-surface truncate">
                {language === 'mr' ? item.cropMr : item.cropEn}
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xs md:text-sm font-bold text-primary font-mono">{item.msp}</span>
                <span className="text-[10px] text-green-700 font-bold">{item.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
