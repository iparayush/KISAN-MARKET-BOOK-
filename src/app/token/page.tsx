"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Ticket, ArrowRight, BookmarkCheck, MapPin } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { TokenCard } from "@/components/TokenCard";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { Toast } from "@/components/EmptyState";

export default function DigitalTokenPage() {
  const router = useRouter();
  const { state, t } = useDemo();
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToBookings = () => {
    setToastMessage("Token saved to your active bookings ledger.");
  };

  return (
    <div className="max-w-md mx-auto space-y-5">
      <PageHeader
        title={t("yourDigitalToken")}
        subtitle="Official digital gate pass for procurement entry"
        showBack
        backHref="/home"
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage("")}
        />
      )}

      <TokenCard
        token={state.token}
        centre={state.centre}
        appointmentTime={state.appointmentTime}
        farmersAhead={state.farmersAhead}
        estimatedWaitMinutes={state.estimatedWaitMinutes}
        status={state.procurementStage}
        onAddToBookings={handleAddToBookings}
      />

      {/* Arrival check-in action shortcut */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-3 shadow-xs">
        <p className="text-xs text-slate-600 font-medium">
          Once you reach the physical procurement centre, proceed to check in:
        </p>
        <button
          type="button"
          onClick={() => router.push("/arrival")}
          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <MapPin className="w-4 h-4" />
          <span>I Have Arrived at the Centre</span>
        </button>
      </div>
    </div>
  );
}
