import React from 'react';
import { ProcurementStep, Language, ActiveToken, RegisteredCrop } from '../types';

interface TrackingScreenProps {
  steps: ProcurementStep[];
  token: ActiveToken;
  crop: RegisteredCrop;
  language: Language;
  onOpenGatePass: () => void;
  onOpenJForm: () => void;
}

export const TrackingScreen: React.FC<TrackingScreenProps> = ({
  steps,
  token,
  crop,
  language,
  onOpenGatePass,
  onOpenJForm,
}) => {
  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const currentStep = steps.find((s) => s.status === 'current') || steps[steps.length - 1];

  return (
    <div className="flex flex-col w-full space-y-4 max-w-xl mx-auto pb-6 animate-fade-in">
      {/* Header Info */}
      <div className="bg-surface-container rounded-2xl p-4 border border-outline-variant/30 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {language === 'mr' ? 'थेट खरेदी प्रक्रिया ट्रॅकिंग (९ टप्पे)' : '9-Stage Procurement Lifecycle'}
          </span>
          <h1 className="text-lg font-headline font-bold text-on-surface">
            {language === 'mr' ? `टोकन ${token.tokenNumber} • सोयाबीन खरेदी` : `Token ${token.tokenNumber} • Soybean Intake`}
          </h1>
          <p className="text-xs text-on-surface-variant">
            {token.vehicleNumber} • {token.vehicleType}
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-primary text-on-primary text-xs font-bold shadow-xs flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>
            {language === 'mr'
              ? `टप्पा ${completedCount}/${steps.length}`
              : `Stage ${completedCount}/${steps.length}`}
          </span>
        </span>
      </div>

      {/* Moisture & Quality Check Certificate Preview Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/40 shadow-xs flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
            <span className="text-sm font-bold text-on-surface">
              {language === 'mr' ? 'गुणवत्ता तपासणी प्रमाणपत्र' : 'Quality Assessment Certificate'}
            </span>
          </div>
          <span className="text-[10px] bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded font-bold">
            {language === 'mr' ? "दर्जा 'अ' प्रमाणित" : "Grade 'A' Certified"}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-surface-container-low rounded-xl p-2 text-center border border-outline-variant/20">
            <span className="text-[10px] text-on-surface-variant block">
              {language === 'mr' ? 'ओलावा (Moisture)' : 'Moisture'}
            </span>
            <span className="text-sm font-bold text-primary">11.8%</span>
            <span className="text-[9px] text-green-700 block">स्वीकार्य (Max 12%)</span>
          </div>

          <div className="bg-surface-container-low rounded-xl p-2 text-center border border-outline-variant/20">
            <span className="text-[10px] text-on-surface-variant block">
              {language === 'mr' ? 'कचरा / धुळ' : 'Foreign Matter'}
            </span>
            <span className="text-sm font-bold text-on-surface">0.9%</span>
            <span className="text-[9px] text-green-700 block">मानक: कमाल 2%</span>
          </div>

          <div className="bg-surface-container-low rounded-xl p-2 text-center border border-outline-variant/20">
            <span className="text-[10px] text-on-surface-variant block">
              {language === 'mr' ? 'डागी दाणे' : 'Damaged Seeds'}
            </span>
            <span className="text-sm font-bold text-on-surface">1.2%</span>
            <span className="text-[9px] text-green-700 block">उत्कृष्ट प्रत</span>
          </div>
        </div>

        <p className="text-[11px] text-on-surface-variant border-t border-outline-variant/20 pt-2 flex items-center justify-between">
          <span>तपासणी अधिकारी: डॉ. व्ही. पाटील (गुणवत्ता निरीक्षक)</span>
          <span className="text-primary font-bold">11:05 AM</span>
        </p>
      </div>

      {/* 9-Step Process Timeline (PRD Section 13) */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-xs flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">timeline</span>
            <span>{language === 'mr' ? 'खरेदी प्रक्रिया तपशील (९ टप्पे)' : '9-Stage Procurement Workflow'}</span>
          </h2>
          <span className="text-[11px] font-mono text-primary font-bold">
            {currentStep ? (language === 'mr' ? currentStep.titleMr : currentStep.titleEn) : ''}
          </span>
        </div>

        <div className="relative pl-6 flex flex-col space-y-6">
          {/* Vertical Track line */}
          <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-outline-variant/40" />

          {steps.map((step) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';

            return (
              <div key={step.stepNumber} className="relative flex flex-col space-y-1">
                {/* Status Dot */}
                <div
                  className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all ${
                    isCompleted
                      ? 'bg-primary text-on-primary shadow-xs'
                      : isCurrent
                      ? 'bg-amber-500 text-white ring-4 ring-amber-100 dark:ring-amber-950 animate-pulse'
                      : 'bg-surface-container text-on-surface-variant border border-outline-variant/60'
                  }`}
                >
                  {isCompleted ? '✓' : step.stepNumber}
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs md:text-sm font-bold ${
                      isCurrent
                        ? 'text-primary font-black'
                        : isCompleted
                        ? 'text-on-surface'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {language === 'mr' ? step.titleMr : step.titleEn}
                  </span>
                  {step.time && (
                    <span className="text-[11px] font-mono font-medium text-on-surface-variant">
                      {step.time}
                    </span>
                  )}
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {language === 'mr' ? step.descriptionMr : step.descriptionEn}
                </p>

                {step.reading && (
                  <div className="bg-surface-container-low px-2 py-1 rounded-md text-[11px] font-mono font-bold text-primary w-fit">
                    {step.reading}
                  </div>
                )}

                {step.operator && (
                  <div className="text-[11px] text-primary/90 font-medium pt-0.5">
                    {step.operator} {step.location && `• ${step.location}`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action shortcuts */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onOpenGatePass}
          className="h-11 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center space-x-1.5 text-xs font-bold hover:bg-surface-variant active:scale-95 transition-all border border-outline-variant/30"
        >
          <span className="material-symbols-outlined text-[18px]">receipt</span>
          <span>{language === 'mr' ? 'प्रवेश पावती पहा' : 'View Inward Pass'}</span>
        </button>

        <button
          onClick={onOpenJForm}
          className="h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center space-x-1.5 text-xs font-bold shadow-xs hover:bg-primary-container active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">assignment</span>
          <span>{language === 'mr' ? 'जे-फॉर्म (J-Form) नमुना' : 'Sample J-Form'}</span>
        </button>
      </div>
    </div>
  );
};
