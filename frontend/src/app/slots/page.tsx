"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Clock, Building2, Calendar, Sparkles } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { AVAILABLE_SLOTS, SlotData } from "@/data/demoData";
import { PageHeader } from "@/components/PageHeader";
import { SlotCard } from "@/components/SlotCard";

export default function SmartSlotPage() {
  const router = useRouter();
  const { state, selectSlot, t } = useDemo();

  const handleBookSlot = (slot: SlotData) => {
    selectSlot(slot.time, slot.date);
    router.push("/booking");
  };

  const recommendedSlot = AVAILABLE_SLOTS.find((s) => s.isRecommended);
  const alternativeSlots = AVAILABLE_SLOTS.filter((s) => !s.isRecommended);

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <PageHeader
        title={t("recommendedSlot")}
        subtitle="Step 3 of 4: Select an allocated intake window"
        showBack
        backHref="/centres"
      />

      {/* Centre Context Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-amber-600" />
          <span className="font-bold text-slate-800">{state.centre}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600 font-medium">{state.appointmentDate}</span>
        </div>
      </div>

      {/* Recommended Slot Top Highlight */}
      {recommendedSlot && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Optimal Intake Window</span>
          </div>
          <SlotCard
            slot={recommendedSlot}
            isSelected={state.appointmentTime === recommendedSlot.time}
            onBook={handleBookSlot}
          />
        </div>
      )}

      {/* Alternative Slots */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Alternative Time Slots
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {alternativeSlots.map((slot) => (
            <SlotCard
              key={slot.id}
              slot={slot}
              isSelected={state.appointmentTime === slot.time}
              onBook={handleBookSlot}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
