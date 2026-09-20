"use client";

import React from "react";
import { CheckCircle2, Circle, Clock, Play, Pause, RotateCcw, ArrowRight } from "lucide-react";
import { PROCUREMENT_STAGES, ProcurementStage } from "@/data/demoData";
import { PrimaryButton, SecondaryButton } from "./PrimaryButton";

interface ProcurementTimelineProps {
  currentStage: ProcurementStage;
  isAutoDemo: boolean;
  onNextStage: () => void;
  onToggleAutoDemo: () => void;
  onResetDemo: () => void;
  onSelectStage?: (stage: ProcurementStage) => void;
}

export const ProcurementTimeline: React.FC<ProcurementTimelineProps> = ({
  currentStage,
  isAutoDemo,
  onNextStage,
  onToggleAutoDemo,
  onResetDemo,
  onSelectStage,
}) => {
  const currentIndex = PROCUREMENT_STAGES.indexOf(currentStage);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-800">
            Procurement Lifecycle Timeline
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            9-stage end-to-end transparent mandi tracking
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
          Stage {currentIndex + 1} of 9
        </span>
      </div>

      {/* Interactive Timeline Stepper */}
      <div className="space-y-2">
        {PROCUREMENT_STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isUpcoming = idx > currentIndex;

          let badgeColor = "bg-slate-100 text-slate-400 border-slate-200";
          let textColor = "text-slate-400";
          let barColor = "bg-slate-200";

          if (isCompleted) {
            badgeColor = "bg-emerald-600 text-white border-emerald-600";
            textColor = "text-slate-800 font-semibold";
            barColor = "bg-emerald-500";
          } else if (isCurrent) {
            badgeColor = "bg-amber-400 text-slate-950 border-amber-500 ring-4 ring-amber-200 font-black";
            textColor = "text-amber-950 font-black";
            barColor = "bg-amber-300";
          }

          return (
            <div key={stage} className="flex items-start gap-3 relative group">
              {/* Connecting line */}
              {idx < PROCUREMENT_STAGES.length - 1 && (
                <div
                  className={`absolute left-[15px] top-[26px] bottom-[-8px] w-0.5 ${barColor} transition-colors`}
                />
              )}

              {/* Node indicator */}
              <button
                type="button"
                onClick={() => onSelectStage && onSelectStage(stage)}
                title={`Jump to ${stage}`}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border z-10 transition-all flex-shrink-0 ${badgeColor} hover:scale-105 cursor-pointer`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4 text-slate-950 animate-spin" />
                ) : (
                  <span className="text-[11px] font-bold">{idx + 1}</span>
                )}
              </button>

              {/* Stage label and description */}
              <div
                onClick={() => onSelectStage && onSelectStage(stage)}
                className="flex-1 pb-4 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <p className={`text-xs uppercase tracking-wide ${textColor}`}>
                    {stage}
                  </p>
                  {isCurrent && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-900 border border-amber-400">
                      In Progress
                    </span>
                  )}
                  {isCompleted && (
                    <span className="text-[10px] font-medium text-emerald-700">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Buttons */}
      <div className="pt-3 border-t border-slate-200 space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <PrimaryButton
            onClick={onNextStage}
            disabled={currentIndex === PROCUREMENT_STAGES.length - 1}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {currentIndex === PROCUREMENT_STAGES.length - 1
              ? "Completed All Stages"
              : "Next Stage"}
          </PrimaryButton>

          <SecondaryButton
            onClick={onToggleAutoDemo}
            icon={
              isAutoDemo ? (
                <Pause className="w-4 h-4 text-amber-600" />
              ) : (
                <Play className="w-4 h-4 text-emerald-600" />
              )
            }
          >
            {isAutoDemo ? "Pause Demo" : "Auto Demo"}
          </SecondaryButton>
        </div>

        <button
          type="button"
          onClick={onResetDemo}
          className="w-full min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>
      </div>
    </div>
  );
};
