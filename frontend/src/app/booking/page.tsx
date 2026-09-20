"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Building2, Calendar, Clock, Wheat, Scale, Ticket, ArrowRight } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function BookingConfirmationPage() {
  const router = useRouter();
  const { state, t } = useDemo();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateToken = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      router.push("/token");
    }, 450);
  };

  return (
    <div className="max-w-md mx-auto space-y-5">
      <PageHeader
        title="Booking Confirmed"
        subtitle="Step 4 of 4: Procurement appointment scheduled"
        showBack
        backHref="/slots"
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 text-center">
        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Appointment Reserved
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Your intake slot has been secured in the mandi procurement ledger
          </p>
        </div>

        {/* Booking Details Table Card */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              Centre
            </span>
            <strong className="text-slate-900">{state.centre}</strong>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Date
            </span>
            <strong className="text-slate-900">{state.appointmentDate}</strong>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Time
            </span>
            <strong className="text-slate-900">{state.appointmentTime}</strong>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Wheat className="w-3.5 h-3.5 text-slate-400" />
              Crop
            </span>
            <strong className="text-slate-900">{state.crop}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              Quantity
            </span>
            <strong className="text-slate-900">{state.quantity} kg</strong>
          </div>
        </div>

        {/* Generate Token CTA */}
        <div className="pt-2">
          <PrimaryButton
            onClick={handleGenerateToken}
            isLoading={isGenerating}
            icon={<Ticket className="w-5 h-5 text-slate-950" />}
          >
            {t("generateToken")}
          </PrimaryButton>
          <p className="text-[11px] text-slate-400 mt-2">
            Clicking issues your official token ({state.token}) for gate entry
          </p>
        </div>
      </div>
    </div>
  );
}
