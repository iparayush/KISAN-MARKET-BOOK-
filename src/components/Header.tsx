"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wheat, Globe, Sparkles, SlidersHorizontal, Bell } from "lucide-react";
import { useDemo } from "@/context/DemoContext";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { state, setLanguage, unreadCount } = useDemo();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link href="/home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black border border-amber-500/50 shadow-xs">
            <Wheat className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                KisanProcure
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-amber-100 text-amber-900 border border-amber-300">
                Demo Mode
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium -mt-0.5 hidden sm:block">
              Smart Procurement & Queue Management
            </p>
          </div>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
            <button
              onClick={() => setLanguage("en")}
              className={`px-1.5 py-0.5 rounded text-xs font-semibold transition-colors ${
                state.language === "en"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("mr")}
              className={`px-1.5 py-0.5 rounded text-xs font-semibold transition-colors ${
                state.language === "mr"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`px-1.5 py-0.5 rounded text-xs font-semibold transition-colors ${
                state.language === "hi"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Presentation Mode quick button for judges */}
          <Link
            href="/presentation"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Judge Demo</span>
          </Link>

          {/* Notifications */}
          <Link
            href="/notifications"
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center border border-white">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Demo Controls */}
          <Link
            href="/demo-controls"
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Demo Controls"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-700" />
          </Link>
        </div>
      </div>
    </header>
  );
};
