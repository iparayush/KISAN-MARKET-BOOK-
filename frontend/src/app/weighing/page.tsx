"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Scale, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { StatusBadge } from "@/components/StatusBadge";

export default function WeighingPage() {
  const router = useRouter();
  const { state, setProcurementStage, t } = useDemo();

  const handleAccept = () => {
    setProcurementStage("ACCEPTED");
    router.push("/procurement");
  };

  return (
    <div className="max-w-md mx-auto space-y-5">
      <PageHeader
        title={t("weighing")}
        subtitle="Electronic weighbridge measurement and gross tare calculation"
        showBack
        backHref="/quality"
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Electronic Weighbridge
              </h2>
              <span className="text-[11px] text-slate-500">
                Calibrated sensor bridge measurement
              </span>
            </div>
          </div>
          <StatusBadge status="VERIFIED" variant="green" />
        </div>

        {/* Weight Comparison Cards */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">
              Expected Quantity
            </span>
            <p className="text-2xl font-black text-slate-700 mt-1 font-mono">
              {state.expectedWeight} kg
            </p>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Self-Declared
            </span>
          </div>

          <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-300">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block">
              Actual Net Weight
            </span>
            <p className="text-2xl font-black text-emerald-950 mt-1 font-mono">
              {state.actualWeight} kg
            </p>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
              Verified by Mandi Scale
            </span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Gross Vehicle Weight</span>
            <strong className="text-slate-800 font-mono">2,148 kg</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Tare (Tractor/Trailer) Weight</span>
            <strong className="text-slate-800 font-mono">1,700 kg</strong>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200">
            <span className="text-slate-700 font-bold">Net Crop Weight</span>
            <strong className="text-emerald-800 font-black font-mono text-sm">
              448 kg (4.48 Quintals)
            </strong>
          </div>
        </div>

        <PrimaryButton
          onClick={handleAccept}
          icon={<CheckCircle2 className="w-4 h-4" />}
        >
          {t("acceptProcurement")}
        </PrimaryButton>
      </div>
    </div>
  );
}
