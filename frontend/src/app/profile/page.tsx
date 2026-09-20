"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  MapPin,
  Globe,
  Bell,
  HelpCircle,
  Info,
  GitFork,
  SlidersHorizontal,
  Presentation,
  ShieldCheck,
  ChevronRight,
  Bookmark,
  History,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { Toast } from "@/components/EmptyState";

export default function ProfilePage() {
  const { state, setLanguage } = useDemo();
  const [toastMessage, setToastMessage] = useState("");

  const handleEditProfile = () => {
    setToastMessage("Demo profile values are locked to the SIH presentation scenario.");
  };

  const menuOptions = [
    { label: "My Active Bookings", href: "/bookings", icon: Bookmark },
    { label: "Procurement History", href: "/history", icon: History },
    { label: "Visual Workflow", href: "/workflow", icon: GitFork },
    { label: "SIH Judge Presentation", href: "/presentation", icon: Presentation },
    { label: "Demo Controls", href: "/demo-controls", icon: SlidersHorizontal },
    { label: "Notifications", href: "/notifications", icon: Bell },
    { label: "Help & FAQ", href: "/help", icon: HelpCircle },
    { label: "About KisanProcure", href: "/about", icon: Info },
  ];

  return (
    <div className="max-w-md mx-auto space-y-5">
      <PageHeader title="Farmer Profile" subtitle="Account details and settings" />

      {toastMessage && (
        <Toast
          message={toastMessage}
          type="info"
          onClose={() => setToastMessage("")}
        />
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black border border-amber-500 shadow-xs">
            <User className="w-7 h-7 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900">
                {state.farmerName}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                Demo Account
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {state.village}, {state.district}, {state.state}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-400 uppercase text-[10px] font-bold block">
              Role
            </span>
            <strong className="text-slate-800">{state.role}</strong>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-400 uppercase text-[10px] font-bold block">
              Registered Crop
            </span>
            <strong className="text-slate-800">{state.crop} ({state.quantity} kg)</strong>
          </div>
        </div>

        <button
          type="button"
          onClick={handleEditProfile}
          className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Edit Profile
        </button>
      </div>

      {/* Language Selector Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Globe className="w-4 h-4 text-amber-600" />
            <span>Select Language</span>
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase">
            {state.language}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
              state.language === "en"
                ? "bg-amber-400 text-slate-950 border-amber-500 shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage("mr")}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
              state.language === "mr"
                ? "bg-amber-400 text-slate-950 border-amber-500 shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            मराठी
          </button>
          <button
            type="button"
            onClick={() => setLanguage("hi")}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
              state.language === "hi"
                ? "bg-amber-400 text-slate-950 border-amber-500 shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* Options Navigation List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {menuOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <Link
              key={opt.label}
              href={opt.href}
              className="flex items-center justify-between p-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors min-h-[44px]"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{opt.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
