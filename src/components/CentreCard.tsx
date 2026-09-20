"use client";

import React from "react";
import { Building2, Navigation, Users, CalendarCheck, Clock, CheckCircle2 } from "lucide-react";
import { CentreData } from "@/data/demoData";
import { PrimaryButton, SecondaryButton } from "./PrimaryButton";

interface CentreCardProps {
  centre: CentreData;
  isSelected?: boolean;
  onSelect: (centre: CentreData) => void;
}

export const CentreCard: React.FC<CentreCardProps> = ({
  centre,
  isSelected = false,
  onSelect,
}) => {
  return (
    <div
      className={`rounded-2xl border transition-all p-5 bg-white relative shadow-sm ${
        isSelected
          ? "border-amber-500 ring-2 ring-amber-400/40"
          : centre.isRecommended
          ? "border-amber-400/80 bg-amber-50/20"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {centre.isRecommended && (
        <div className="absolute -top-3 left-4 bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-amber-500 shadow-xs flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-slate-950" />
          <span>Recommended</span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-3 pt-1">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{centre.name}</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
            <Navigation className="w-3 h-3 text-slate-400" />
            <span>Distance: {centre.distance}</span>
          </p>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
            centre.status === "Available"
              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
              : "bg-slate-100 text-slate-700 border-slate-300"
          }`}
        >
          {centre.status}
        </span>
      </div>

      {centre.isRecommended && (
        <div className="mb-4 p-2.5 rounded-xl bg-amber-100/60 border border-amber-200/80 text-[11px] text-amber-950 font-medium">
          <strong>Smart Recommendation:</strong> {centre.recommendationReason}
        </div>
      )}

      {/* Metrics 4-grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs">
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="text-slate-400 font-medium text-[10px] block uppercase">
            Current Queue
          </span>
          <p className="font-bold text-slate-800 text-sm mt-0.5">
            {centre.currentQueue} Farmers
          </p>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="text-slate-400 font-medium text-[10px] block uppercase">
            Available Slots
          </span>
          <p className="font-bold text-slate-800 text-sm mt-0.5">
            {centre.availableSlots} Slots
          </p>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="text-slate-400 font-medium text-[10px] block uppercase">
            Active Counters
          </span>
          <p className="font-bold text-slate-800 text-sm mt-0.5">
            {centre.activeCounters} Counters
          </p>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="text-slate-400 font-medium text-[10px] block uppercase">
            Estimated Wait
          </span>
          <p className="font-bold text-slate-800 text-sm mt-0.5">
            {centre.estimatedWait}
          </p>
        </div>
      </div>

      <PrimaryButton onClick={() => onSelect(centre)}>
        {isSelected ? "Selected" : "Select Centre"}
      </PrimaryButton>
    </div>
  );
};
