import React from 'react';
import { Language } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      titleMr: 'रांग अपडेट: टोकन #०१९ काट्यावर सुरू',
      titleEn: 'Queue Update: Token #019 at Scale',
      descMr: 'काटा क्र. २ वर टोकन #०१९ चे वजन सुरू झाले आहे. तुमचे टोकन #०२७ असून ८ वाहने पुढे आहेत.',
      descEn: 'Weighbridge #2 is weighing Token #019. Your token is #027 with 8 vehicles ahead.',
      time: '१० मिनिटांपूर्वी',
      isUnread: true,
      icon: 'timer',
      type: 'queue',
    },
    {
      id: 2,
      titleMr: 'ओलावा व गुणवत्ता प्रमाणपत्र मंजूर',
      titleEn: 'Quality Certificate Approved',
      descMr: 'सोयाबीन नमुना चाचणीत ओलावा ११.८% (स्वीकार्य) आढळला असून दर्जा अ मंजूर झाला आहे.',
      descEn: 'Soybean moisture verified at 11.8% (Acceptable) and certified Grade A.',
      time: '३५ मिनिटांपूर्वी',
      isUnread: true,
      icon: 'verified',
      type: 'quality',
    },
    {
      id: 3,
      titleMr: 'हमीभाव (MSP) सुधारित घोषणा',
      titleEn: 'Revised MSP Rate Announced',
      descMr: 'सन २०२६-२७ साठी सोयाबीनचा हमीभाव ₹४,८९२ प्रति क्विंटल निश्चित केला आहे.',
      descEn: 'Govt MSP for Soybean 2026-27 finalized at ₹4,892 per Quintal.',
      time: '२ तासांपूर्वी',
      isUnread: false,
      icon: 'campaign',
      type: 'msp',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md p-5 border border-outline-variant/40 shadow-xl flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary text-[24px]">notifications</span>
            <h2 className="text-base font-bold text-on-surface">
              {language === 'mr' ? 'सूचना व संदेश (Notifications)' : 'Notifications'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col space-y-2.5">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border flex items-start space-x-3 transition-colors ${
                n.isUnread
                  ? 'bg-primary/5 border-primary/40'
                  : 'bg-surface-container-low border-outline-variant/20'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  n.isUnread
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{n.icon}</span>
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface">
                    {language === 'mr' ? n.titleMr : n.titleEn}
                  </span>
                  {n.isUnread && (
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                  {language === 'mr' ? n.descMr : n.descEn}
                </p>
                <span className="text-[10px] text-on-surface-variant/70 font-mono mt-1">
                  {n.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high"
        >
          {language === 'mr' ? 'सर्व सूचना वाचल्या' : 'Mark all as read'}
        </button>
      </div>
    </div>
  );
};
