"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FileCheck2, User, Wheat, Scale, Hash, ArrowRight, ShieldCheck } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { StatusBadge } from "@/components/StatusBadge";

export default function DocumentVerificationPage() {
  const router = useRouter();
  const { state, setProcurementStage, t } = useDemo();

  const handleContinue = () => {
    setProcurementStage("QUALITY CHECK");
    router.push("/quality");
  };

  return (
    <div className="max-w-md mx-auto space-y-5">
      <PageHeader
        title={t("documentVerification")}
        subtitle="Verification of farmer land record 7/12 & Aadhaar registration"
        showBack
        backHref="/arrival"
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Gate Inspection Complete
              </h2>
              <span className="text-[11px] text-slate-500">
                Aadhaar & Land Holding Authenticated
              </span>
            </div>
          </div>
          <StatusBadge status="VERIFIED" variant="green" />
        </div>

        {/* Verification Summary Card */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Farmer Name
            </span>
            <strong className="text-slate-900">{state.farmerName}</strong>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Wheat className="w-3.5 h-3.5 text-slate-400" />
              Crop
            </span>
            <strong className="text-slate-900">{state.crop}</strong>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              Quantity
            </span>
            <strong className="text-slate-900">{state.quantity} kg</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-slate-400" />
              Booking ID
            </span>
            <strong className="text-slate-900 font-mono">
              {state.bookingId}
            </strong>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
          <p>
            Farmer identity verified against agricultural portal directory. Physical crop sample ready for quality inspection.
          </p>
        </div>

        <PrimaryButton
          onClick={handleContinue}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {t("continueToQuality")}
        </PrimaryButton>
      </div>
    </div>
  );
}
