"use client";

import React from "react";
import { Info, ShieldAlert } from "lucide-react";
import Link from "next/link";

export const DisclaimerBanner: React.FC = () => {
  return (
    <aside aria-label="Demo Prototype Notice" className="bg-amber-500/10 border-b border-amber-500/30 text-amber-950 px-3 py-1.5 text-xs font-medium">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
          <span className="font-bold uppercase tracking-wider text-[11px] text-amber-800">
            Functional Demo Prototype
          </span>
          <span className="text-amber-600 hidden sm:inline">•</span>
          <span className="text-amber-800 hidden sm:inline">
            Simulated Procurement Environment (SIH 2026 PS26032)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/demo-controls"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 hover:text-amber-700 underline underline-offset-2"
          >
            <Info className="w-3 h-3" />
            <span>Demo Controls</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
