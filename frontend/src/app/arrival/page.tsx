"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CheckCircle2, Building2, Ticket, ArrowRight } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { StatusBadge } from "@/components/StatusBadge";

export default function ArrivalPage() {
  const router = useRouter();
  const { state, confirmArrival, setProcurementStage, t } = useDemo();
  const [hasCheckedIn, setHasCheckedIn] = useState(state.procurementStage !== "BOOKED");

  const handleArrivalCheckIn = () => {
    confirmArrival();
    setHasCheckedIn(true);
  };

  const handleContinue = () => {
    setProcurementStage("DOCUMENT VERIFIED");
    router.push("/verification");
  };

  return (
    <div className="max-w-md mx-auto space-y-5">
      <PageHeader
        title="Arrival / Check-In"
        subtitle="Gate entry verification and geofence check"
        showBack
        backHref="/queue"
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 text-center">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto border ${
            hasCheckedIn
              ? "bg-emerald-100 text-emerald-700 border-emerald-300"
              : "bg-amber-100 text-amber-800 border-amber-300"
          }`}
        >
          {hasCheckedIn ? (
            <CheckCircle2 className="w-8 h-8" />
          ) : (
            <MapPin className="w-8 h-8" />
          )}
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {hasCheckedIn ? "Arrival Confirmed" : "Mandi Gate Check-In"}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {hasCheckedIn
              ? "Your presence at the centre has been recorded in the intake ledger"
              : "Confirm your physical arrival at the procurement centre to alert the verification officer"}
          </p>
        </div>

        {/* Arrival Summary Card */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5 text-slate-400" />
              Token Number
            </span>
            <strong className="text-slate-900 font-mono text-sm">
              {state.token}
            </strong>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              Centre
            </span>
            <strong className="text-slate-900">{state.centre}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Status</span>
            <StatusBadge
              status={hasCheckedIn ? "ARRIVED" : "BOOKED"}
              variant={hasCheckedIn ? "green" : "yellow"}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2">
          {!hasCheckedIn ? (
            <PrimaryButton
              onClick={handleArrivalCheckIn}
              icon={<MapPin className="w-4 h-4" />}
            >
              {t("imAtCentre")}
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={handleContinue}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Document Verification
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
