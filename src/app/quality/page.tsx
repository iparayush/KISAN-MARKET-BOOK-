"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Droplets, Award, Wheat, Scale, ArrowRight, ShieldCheck } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { StatusBadge } from "@/components/StatusBadge";

export default function QualityCheckPage() {
  const router = useRouter();
  const { state, setProcurementStage, t } = useDemo();

  const handleContinue = () => {
    setProcurementStage("WEIGHING");
    router.push("/weighing");
  };

  return (
    <div className="max-w-md mx-auto space-y-5">
      <PageHeader
        title={t("qualityCheck")}
        subtitle="Mandatory assay lab evaluation for Fair Average Quality (FAQ)"
        showBack
        backHref="/verification"
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Crop Quality Certified
              </h2>
              <span className="text-[11px] text-slate-500">
                Grade A / FAQ Specifications Met
              </span>
            </div>
          </div>
          <StatusBadge status="PASSED" variant="green" />
        </div>

        {/* Quality Parameters Table */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs space-y-3">
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
              Quantity Sampled
            </span>
            <strong className="text-slate-900">{state.quantity} kg</strong>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-slate-400" />
              Quality Grade
            </span>
            <strong className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
              {state.qualityGrade} (Grade-A)
            </strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-slate-400" />
              Moisture Content
            </span>
            <strong className="text-slate-900">
              {state.moisturePercent} (Permissible: &lt; 12.0%)
            </strong>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <p>
            Assay lab test passed without foreign matter or pest damage. Eligible for full MSP rate of Rs 2,275/qtl.
          </p>
        </div>

        <PrimaryButton
          onClick={handleContinue}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {t("continueToWeighing")}
        </PrimaryButton>
      </div>
    </div>
  );
}
