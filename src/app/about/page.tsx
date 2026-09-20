"use client";

import React from "react";
import { Info, Wheat, ShieldCheck, Award, Layers, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ABOUT_METADATA } from "@/data/demoData";

export default function AboutPage() {
  return (
    <div className="max-w-xl mx-auto space-y-5">
      <PageHeader
        title={ABOUT_METADATA.title}
        subtitle="SIH 2026 Smart Automation Prototype details"
        showBack
        backHref="/home"
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Brand Banner */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black border border-amber-500 shadow-xs">
            <Wheat className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              KisanProcure
            </h2>
            <p className="text-xs text-amber-800 font-bold uppercase tracking-wider">
              {ABOUT_METADATA.tagline}
            </p>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          {ABOUT_METADATA.description}
        </p>

        {/* SIH Metadata Grid */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Problem Statement</span>
            <strong className="text-slate-900">{ABOUT_METADATA.problemStatement}</strong>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">PS ID</span>
            <strong className="text-amber-800 font-black font-mono">
              {ABOUT_METADATA.psId}
            </strong>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Category</span>
            <strong className="text-slate-900">{ABOUT_METADATA.category}</strong>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Theme</span>
            <strong className="text-slate-900">{ABOUT_METADATA.theme}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Prototype Nature</span>
            <strong className="text-emerald-800 font-bold">
              {ABOUT_METADATA.prototype}
            </strong>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="leading-normal">
            This system runs in a self-contained simulated procurement environment. No live government databases, real bank accounts, or external APIs are connected.
          </p>
        </div>
      </div>
    </div>
  );
}
