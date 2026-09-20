import React from 'react';
import { ScreenTab, Language } from '../types';

interface BottomNavProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  language: Language;
  tokenNumber: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  language,
  tokenNumber,
}) => {
  const tabs = [
    {
      id: 'home' as ScreenTab,
      icon: 'home',
      labelMr: 'मुख्य',
      labelHi: 'मुख्य',
      labelEn: 'Home',
    },
    {
      id: 'book-slot' as ScreenTab,
      icon: 'event_available',
      labelMr: 'स्लॉट',
      labelHi: 'स्लॉट',
      labelEn: 'Slot',
    },
    {
      id: 'live-queue' as ScreenTab,
      icon: 'timer',
      labelMr: 'रांग',
      labelHi: 'कतार',
      labelEn: 'Queue',
      badge: tokenNumber,
    },
    {
      id: 'tracking' as ScreenTab,
      icon: 'local_shipping',
      labelMr: 'प्रक्रिया',
      labelHi: 'प्रक्रिया',
      labelEn: 'Track',
    },
    {
      id: 'payments' as ScreenTab,
      icon: 'receipt_long',
      labelMr: 'पेमेंट',
      labelHi: 'भुगतान',
      labelEn: 'Pay',
    },
    {
      id: 'grievance' as ScreenTab,
      icon: 'support_agent',
      labelMr: 'तक्रार',
      labelHi: 'शिकायत',
      labelEn: 'Help',
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(0,0,0,0.06)] border-t border-outline-variant/30 select-none">
      <div className="max-w-xl mx-auto grid grid-cols-6 h-15 sm:h-16 px-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const label = language === 'mr' ? tab.labelMr : language === 'hi' ? tab.labelHi : tab.labelEn;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center transition-all py-1 relative min-h-[44px] touch-manipulation ${
                isActive
                  ? 'text-primary font-bold scale-105'
                  : 'text-on-surface-variant hover:text-primary active:scale-95'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[20px] sm:text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>

                {tab.badge && (
                  <span className="absolute -top-1.5 -right-3 px-1 py-0.2 rounded-full bg-secondary text-on-secondary text-[8px] font-bold leading-none shadow-sm animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className="text-[9px] sm:text-[10px] leading-tight mt-0.5 tracking-tight font-medium">
                {label}
              </span>

              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5 transition-all" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
