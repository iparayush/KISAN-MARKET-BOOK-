"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarPlus,
  Users,
  Activity,
  Building2,
  Clock,
  Ticket,
  ArrowRight,
  ShieldAlert,
  CreditCard,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { StatusBadge } from "@/components/StatusBadge";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";

export default function HomePage() {
  const { state, t } = useDemo();

  return (
    <div className="space-y-5">
      {/* Welcome Banner */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t("goodMorning")}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {state.farmerName}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Village: {state.village}, {state.state}
          </p>
        </div>
        <div className="text-right">
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-100 text-amber-900 border border-amber-300">
            {state.crop} ({state.quantity} kg)
          </span>
        </div>
      </div>

      {/* Main Card: Today's Procurement */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              {t("todaysProcurement")}
            </h2>
          </div>
          <StatusBadge
            status={state.procurementStage}
            variant={state.procurementStage === "PAID" ? "green" : "yellow"}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">
              {t("token")}
            </span>
            <p className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {state.token}
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">
              {t("appointment")}
            </span>
            <p className="text-sm font-bold text-slate-800 mt-1">
              {state.appointmentTime}
            </p>
            <span className="text-[10px] text-slate-500 block">
              {state.appointmentDate}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">
              {t("centre")}
            </span>
            <p className="text-sm font-bold text-slate-800 mt-1 truncate">
              {state.centre}
            </p>
            <span className="text-[10px] text-slate-500 block">
              Distance: {state.distance}
            </span>
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <Link href="/token" className="flex-1">
            <PrimaryButton icon={<Ticket className="w-4 h-4" />}>
              View Token Pass
            </PrimaryButton>
          </Link>
        </div>
      </div>

      {/* Queue Preview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Live Mandi Queue
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            3 Active Counters
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
            <span className="text-emerald-800 font-bold uppercase text-[10px] block">
              {t("currentServing")}
            </span>
            <p className="text-xl font-black text-emerald-950 font-mono mt-0.5">
              {state.currentServingToken}
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">
              {t("farmersAhead")}
            </span>
            <p className="text-xl font-black text-amber-700 mt-0.5">
              {state.farmersAhead}
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">
              {t("estimatedWait")}
            </span>
            <p className="text-xl font-black text-slate-800 mt-0.5">
              {state.estimatedWaitMinutes}m
            </p>
          </div>
        </div>

        <Link href="/queue" className="block">
          <SecondaryButton icon={<ArrowRight className="w-4 h-4 text-emerald-700" />}>
            {t("viewQueue")}
          </SecondaryButton>
        </Link>
      </div>

      {/* Procurement & Payment Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Procurement Stage
            </span>
            <Activity className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-base font-black text-slate-900">
            {state.procurementStage}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Quality: {state.qualityStatus} | Weight: {state.weighingStatus}
          </p>
          <Link href="/procurement" className="block pt-1">
            <span className="text-xs font-bold text-amber-800 hover:underline inline-flex items-center gap-1">
              Track 9-Stage Progress <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Payment Status
            </span>
            <CreditCard className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-base font-black text-slate-900">
            {state.paymentStatus === "PAID" ? "PAID (Rs 10,192)" : "PROCESSING"}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Wheat MSP: Rs 2,275 / qtl (Simulated)
          </p>
          <Link href="/payment" className="block pt-1">
            <span className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center gap-1">
              View Payment Breakdown <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {t("quickActions")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <Link href="/crop">
            <SecondaryButton icon={<CalendarPlus className="w-4 h-4 text-amber-600" />}>
              {t("bookSlot")}
            </SecondaryButton>
          </Link>
          <Link href="/queue">
            <SecondaryButton icon={<Users className="w-4 h-4 text-emerald-600" />}>
              {t("viewQueue")}
            </SecondaryButton>
          </Link>
          <Link href="/procurement">
            <SecondaryButton icon={<Activity className="w-4 h-4 text-blue-600" />}>
              {t("trackProcurement")}
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
