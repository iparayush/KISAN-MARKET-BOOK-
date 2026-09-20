"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, FileText, Wheat, Scale, Award, ArrowRight } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { ProcurementTimeline } from "@/components/ProcurementTimeline";
import { PrimaryButton } from "@/components/PrimaryButton";
import { StatusBadge } from "@/components/StatusBadge";

export default function ProcurementPage() {
  const router = useRouter();
  const {
    state,
    nextProcurementStage,
    toggleAutoDemo,
    resetDemo,
    setProcurementStage,
    t,
  } = useDemo();

  const handleGenerateBill = () => {
    setProcurementStage("BILL GENERATED");
    router.push("/bill");
  };

  const isAcceptedOrBeyond = [
    "ACCEPTED",
    "BILL GENERATED",
    "PAYMENT PROCESSING",
    "PAID",
  ].includes(state.procurementStage);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <PageHeader
        title="Procurement Tracking"
        subtitle="End-to-end transparent mandi intake lifecycle"
        showBack
        backHref="/home"
      />

      {/* Acceptance Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              {isAcceptedOrBeyond ? t("procurementAccepted") : "Intake Stage Status"}
            </h2>
          </div>
          <StatusBadge
            status={state.procurementStage}
            variant={isAcceptedOrBeyond ? "green" : "yellow"}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">
              Crop
            </span>
            <p className="font-bold text-slate-800 text-sm mt-0.5">
              {state.crop}
            </p>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">
              Accepted Weight
            </span>
            <p className="font-bold text-emerald-800 text-sm mt-0.5 font-mono">
              {state.actualWeight} kg
            </p>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">
              Quality Assay
            </span>
            <p className="font-bold text-emerald-700 text-sm mt-0.5">
              {state.qualityStatus === "PASSED" ? "Passed" : state.qualityStatus}
            </p>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">
              Weighing
            </span>
            <p className="font-bold text-emerald-700 text-sm mt-0.5">
              {state.weighingStatus === "VERIFIED" ? "Verified" : state.weighingStatus}
            </p>
          </div>
        </div>

        {isAcceptedOrBeyond && (
          <div className="pt-2">
            <PrimaryButton
              onClick={handleGenerateBill}
              icon={<FileText className="w-4 h-4" />}
            >
              {t("generateBill")}
            </PrimaryButton>
          </div>
        )}
      </div>

      {/* 9-Stage Interactive Timeline Component */}
      <ProcurementTimeline
        currentStage={state.procurementStage}
        isAutoDemo={state.isAutoDemo}
        onNextStage={nextProcurementStage}
        onToggleAutoDemo={toggleAutoDemo}
        onResetDemo={resetDemo}
        onSelectStage={(stg) => setProcurementStage(stg)}
      />
    </div>
  );
}
