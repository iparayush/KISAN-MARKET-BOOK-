"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  RotateCcw,
  Users,
  Activity,
  CheckCircle2,
  CreditCard,
  Info,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { Toast } from "@/components/EmptyState";
import { PROCUREMENT_STAGES, ProcurementStage } from "@/data/demoData";

export default function DemoControlsPage() {
  const {
    state,
    resetDemo,
    simulateNextToken,
    nextProcurementStage,
    completeProcurement,
    simulatePayment,
    setProcurementStage,
    toggleAutoDemo,
  } = useDemo();

  const [toastMessage, setToastMessage] = useState("");

  const handleAction = (msg: string, fn: () => void) => {
    fn();
    setToastMessage(msg);
  };

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <PageHeader
        title="Demo Control Panel"
        subtitle="SIH 2026 Presentation Simulation Controllers"
        showBack
        backHref="/home"
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          type="info"
          onClose={() => setToastMessage("")}
        />
      )}

      {/* Global State Monitor Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Live State Inspector
            </h2>
          </div>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
            Stage: {state.procurementStage}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">
              Farmer Token
            </span>
            <p className="font-bold text-slate-800 font-mono mt-0.5">
              {state.token}
            </p>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">
              Now Serving
            </span>
            <p className="font-bold text-emerald-800 font-mono mt-0.5">
              {state.currentServingToken}
            </p>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">
              Farmers Ahead
            </span>
            <p className="font-bold text-amber-700 mt-0.5">
              {state.farmersAhead}
            </p>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">
              Estimated Wait
            </span>
            <p className="font-bold text-slate-800 mt-0.5">
              {state.estimatedWaitMinutes}m
            </p>
          </div>
        </div>
      </div>

      {/* One-Click Action Trigger Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Quick Presentation Triggers
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <PrimaryButton
            onClick={() =>
              handleAction("Advanced queue token by 1.", simulateNextToken)
            }
            icon={<Users className="w-4 h-4" />}
          >
            Next Queue Token
          </PrimaryButton>

          <PrimaryButton
            onClick={() =>
              handleAction("Advanced to next procurement stage.", nextProcurementStage)
            }
            icon={<Activity className="w-4 h-4" />}
          >
            Next Procurement Stage
          </PrimaryButton>

          <SecondaryButton
            onClick={() =>
              handleAction("Simulated successful DBT payment credit.", simulatePayment)
            }
            icon={<CreditCard className="w-4 h-4 text-emerald-600" />}
          >
            Simulate Payment
          </SecondaryButton>

          <SecondaryButton
            onClick={() =>
              handleAction("Completed all procurement stages.", completeProcurement)
            }
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          >
            Complete Procurement
          </SecondaryButton>

          <SecondaryButton
            onClick={() =>
              handleAction(
                state.isAutoDemo ? "Paused auto demo." : "Started auto demo loop.",
                toggleAutoDemo
              )
            }
            icon={
              state.isAutoDemo ? (
                <Pause className="w-4 h-4 text-amber-600" />
              ) : (
                <Play className="w-4 h-4 text-emerald-600" />
              )
            }
          >
            {state.isAutoDemo ? "Pause Auto-Demo" : "Start Auto-Demo Loop"}
          </SecondaryButton>

          <SecondaryButton
            onClick={() =>
              handleAction(
                "Reset all demo values to initial KP-104 state.",
                resetDemo
              )
            }
            icon={<RotateCcw className="w-4 h-4 text-slate-600" />}
          >
            Reset All Demo Data
          </SecondaryButton>
        </div>
      </div>

      {/* Direct Stage Selector Dropdown */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Direct Stage Jump
        </h3>
        <p className="text-xs text-slate-500">
          Jump directly to any of the 9 procurement lifecycle stages:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PROCUREMENT_STAGES.map((stg) => {
            const isSelected = state.procurementStage === stg;
            return (
              <button
                key={stg}
                type="button"
                onClick={() =>
                  handleAction(`Jumped to stage: ${stg}`, () =>
                    setProcurementStage(stg)
                  )
                }
                className={`p-2 rounded-xl text-[11px] font-bold text-left border transition-all truncate ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 border-amber-500 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {stg}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
