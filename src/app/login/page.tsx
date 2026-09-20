"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { User, MapPin, Wheat, ShieldCheck, ArrowRight, Info } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function LoginPage() {
  const router = useRouter();
  const { state } = useDemo();

  const handleContinue = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col justify-center max-w-md mx-auto py-6 px-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto border border-amber-500 shadow-xs mb-3">
            <User className="w-6 h-6 text-slate-950" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Demo Farmer Login
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Pre-configured simulated farmer credentials for SIH 2026 review
          </p>
        </div>

        {/* Demo Account Credentials Card */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
              Demo Profile
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
              Pre-Verified
            </span>
          </div>

          <div className="space-y-2 text-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Name:
              </span>
              <strong className="text-slate-900">{state.farmerName}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Location:
              </span>
              <strong className="text-slate-900">
                {state.village}, {state.state}
              </strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <Wheat className="w-3.5 h-3.5 text-slate-400" />
                Crop:
              </span>
              <strong className="text-slate-900">{state.crop}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Role:
              </span>
              <strong className="text-slate-900">{state.role}</strong>
            </div>
          </div>
        </div>

        {/* Information box */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="leading-normal">
            No password or live SMS OTP required. Click below to enter the live
            farmer procurement workspace.
          </p>
        </div>

        {/* Continue Button */}
        <PrimaryButton
          onClick={handleContinue}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Continue Demo
        </PrimaryButton>
      </div>
    </div>
  );
}
