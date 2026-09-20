"use client";

import React from "react";
import { Clock, CheckCircle2, ShieldCheck } from "lucide-react";
import { SlotData } from "@/data/demoData";
import { PrimaryButton, SecondaryButton } from "./PrimaryButton";

interface SlotCardProps {
  slot: SlotData;
  isSelected?: boolean;
  onBook: (slot: SlotData) => void;
}

export const SlotCard: React.FC<SlotCardProps> = ({
  slot,
  isSelected = false,
  onBook,
}) => {
  return (
    <div
      className={`rounded-2xl border p-4 bg-white transition-all shadow-sm ${
        slot.isRecommended
          ? "border-amber-400 bg-amber-50/20 ring-1 ring-amber-400/40"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-600" />
          <span className="text-lg font-black text-slate-900">{slot.time}</span>
        </div>
        {slot.isRecommended && (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 border border-amber-500 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-slate-950" />
            <span>Recommended</span>
          </span>
        )}
      </div>

      <p className="text-xs text-slate-500 font-medium mb-3">
        Date: {slot.date}
      </p>

      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
          <span className="text-slate-400 text-[10px] uppercase block font-medium">
            Expected Waiting
          </span>
          <p className="font-bold text-slate-800">{slot.expectedWaiting}</p>
        </div>

        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
          <span className="text-slate-400 text-[10px] uppercase block font-medium">
            Mandi Capacity
          </span>
          <p className="font-bold text-slate-800">{slot.availableCapacity}</p>
        </div>
      </div>

      {slot.reason && (
        <p className="text-[11px] text-slate-600 mb-3 bg-slate-50 p-2 rounded-lg border border-slate-200">
          <strong>Why this slot:</strong> {slot.reason}
        </p>
      )}

      {slot.isRecommended ? (
        <PrimaryButton onClick={() => onBook(slot)}>
          Book This Slot
        </PrimaryButton>
      ) : (
        <SecondaryButton onClick={() => onBook(slot)}>
          Select This Slot
        </SecondaryButton>
      )}
    </div>
  );
};
