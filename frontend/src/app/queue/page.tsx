"use client";

import React from "react";
import Link from "next/link";
import { Users, Clock, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { QueueCard } from "@/components/QueueCard";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function LiveQueuePage() {
  const { state, simulateNextToken, t } = useDemo();

  const isUserTurn = state.farmersAhead === 0;

  return (
    <div className="max-w-md mx-auto space-y-5">
      <PageHeader
        title="Live Queue"
        subtitle="Real-time gate token tracking & wait time estimator"
        showBack
        backHref="/home"
      />

      {isUserTurn && (
        <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 text-emerald-950 space-y-3 text-center shadow-xs">
          <div className="flex items-center justify-center gap-1.5 font-black text-sm uppercase tracking-wider text-emerald-800">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Your Token Has Been Called</span>
          </div>
          <p className="text-xs text-emerald-800 font-medium">
            Please drive your tractor / load to Gate Counter 1 for physical intake.
          </p>
          <Link href="/arrival" className="block">
            <PrimaryButton icon={<MapPin className="w-4 h-4" />}>
              Proceed to Arrival Check-In
            </PrimaryButton>
          </Link>
        </div>
      )}

      <QueueCard
        currentServingToken={state.currentServingToken}
        userToken={state.token}
        position={state.queuePosition}
        farmersAhead={state.farmersAhead}
        estimatedWaitMinutes={state.estimatedWaitMinutes}
        activeCounters={state.activeCounters}
        lastUpdated={state.queueLastUpdated}
        onSimulateNextToken={simulateNextToken}
      />

      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
        <p className="font-bold text-slate-800">How queue simulation works:</p>
        <p>
          Each click of <strong>Simulate Next Token</strong> simulates the physical weighing operator clearing the preceding farmer. When your token (KP-104) is called, position becomes 1 and wait becomes 0 minutes.
        </p>
      </div>
    </div>
  );
}
