"use client";

import React from "react";
import Link from "next/link";
import {
  Wheat,
  CalendarCheck2,
  Ticket,
  Users,
  Activity,
  CreditCard,
  ArrowRight,
  GitFork,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";

export default function LandingPage() {
  const features = [
    {
      title: "Smart Slot Booking",
      desc: "Intelligent slot recommendation based on distance, queue size, and active counters.",
      icon: CalendarCheck2,
    },
    {
      title: "Digital Token",
      desc: "Guaranteed digital queue entry pass eliminating long physical tractor queues.",
      icon: Ticket,
    },
    {
      title: "Live Queue",
      desc: "Real-time token advancement updates with live wait time estimations.",
      icon: Users,
    },
    {
      title: "Procurement Tracking",
      desc: "9-stage transparency: Arrival, Verification, Quality Check, Weighing, and Acceptance.",
      icon: Activity,
    },
    {
      title: "Payment Status",
      desc: "Instant automated receipt generation and transparent simulated payment tracking.",
      icon: CreditCard,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-40px)] flex flex-col justify-between py-6 px-4 max-w-4xl mx-auto space-y-10">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center border border-amber-500 shadow-xs">
            <Wheat className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              KisanProcure
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Smart Procurement & Queue Management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            Demo Mode
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center space-y-5 py-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-xs font-semibold text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>SIH 2026 Functional Prototype</span>
          <span className="text-slate-400">•</span>
          <span className="text-amber-800 font-bold">PS26032</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Smart Procurement <br className="hidden sm:inline" />
          <span className="text-amber-600">Without Long Waiting</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
          Book your procurement slot, manage your digital token, track the live
          queue and monitor procurement status in one place.
        </p>

        {/* Hero Action Buttons */}
        <div className="pt-3 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <Link href="/login" className="flex-1">
            <PrimaryButton icon={<ArrowRight className="w-5 h-5" />}>
              Try Demo
            </PrimaryButton>
          </Link>
          <Link href="/workflow" className="flex-1">
            <SecondaryButton icon={<GitFork className="w-5 h-5 text-slate-600" />}>
              View Workflow
            </SecondaryButton>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-amber-900 font-medium pt-1">
          <ShieldAlert className="w-4 h-4 text-amber-700" />
          <span>Simulated Procurement Environment</span>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="space-y-3">
        <div className="text-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Core Prototype Capabilities
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-normal">
                  {feat.desc}
                </p>
              </div>
            );
          })}

          {/* Dedicated Presentation Link */}
          <Link
            href="/presentation"
            className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-300 shadow-xs space-y-2 hover:bg-emerald-100/70 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-emerald-950 mt-2">
                SIH Judge Walkthrough
              </h4>
              <p className="text-xs text-emerald-800 font-medium mt-1">
                Guided 12-step interactive demonstration of the complete system.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              Start Walkthrough <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* Footer Banner */}
      <footer className="text-center pt-6 border-t border-slate-200 text-xs text-slate-500 space-y-1">
        <p className="font-bold text-slate-700">Functional Demo Prototype</p>
        <p className="text-[11px]">
          Smart India Hackathon 2026 | Theme: Smart Automation | PS ID: SIH26032
        </p>
        <p className="text-[10px] text-amber-800 font-medium">
          Simulated Procurement Environment — No live government data or payment gateway used.
        </p>
      </footer>
    </div>
  );
}
