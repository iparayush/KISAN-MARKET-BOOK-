"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Wheat, Calendar, Scale, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Toast } from "@/components/EmptyState";

export default function CropRegistrationPage() {
  const router = useRouter();
  const { state, updateCrop, t } = useDemo();

  const [crop, setCrop] = useState(state.crop || "Wheat");
  const [quantity, setQuantity] = useState(state.quantity ? String(state.quantity) : "450");
  const [date, setDate] = useState(state.expectedDate || "24 September 2026");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!crop.trim()) {
      setErrorMessage("Please select or specify a valid crop name.");
      return;
    }

    const qtyNum = parseInt(quantity, 10);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      setErrorMessage("Please enter a valid procurement quantity in kg (must be greater than 0).");
      return;
    }

    if (!date.trim()) {
      setErrorMessage("Please specify your expected procurement date.");
      return;
    }

    updateCrop(crop, qtyNum, date);
    setSuccessMessage("Crop details registered successfully.");

    setTimeout(() => {
      router.push("/centres");
    }, 400);
  };

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <PageHeader
        title={t("registerCrop")}
        subtitle="Step 1 of 4: Enter crop harvest details for smart mandi allocation"
        showBack
        backHref="/home"
      />

      {errorMessage && (
        <Toast
          message={errorMessage}
          type="error"
          onClose={() => setErrorMessage("")}
        />
      )}

      {successMessage && (
        <Toast
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage("")}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5"
      >
        {/* Crop Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Wheat className="w-4 h-4 text-amber-600" />
            <span>{t("cropLabel")} *</span>
          </label>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full min-h-[46px] px-3.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <option value="Wheat">Wheat (MSP: Rs 2,275/qtl)</option>
            <option value="Soybean">Soybean (MSP: Rs 4,600/qtl)</option>
            <option value="Paddy">Paddy / Rice (MSP: Rs 2,183/qtl)</option>
            <option value="Maize">Maize (MSP: Rs 2,090/qtl)</option>
            <option value="Gram">Gram / Chana (MSP: Rs 5,440/qtl)</option>
          </select>
          <span className="text-[11px] text-slate-500 block">
            Select verified commodity listed under minimum support price program
          </span>
        </div>

        {/* Quantity Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-amber-600" />
            <span>{t("quantityLabel")} *</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 450"
              className="w-full min-h-[46px] pl-3.5 pr-12 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            <span className="absolute right-3.5 top-3 text-xs font-bold text-slate-400">
              kg
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Pre-filled demo quantity: 450 kg (approx 4.5 quintals)
          </span>
        </div>

        {/* Expected Date Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>{t("dateLabel")} *</span>
          </label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g. 24 September 2026"
            className="w-full min-h-[46px] px-3.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
          <span className="text-[11px] text-slate-500 block">
            Simulated harvest procurement window: 24 September 2026
          </span>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <PrimaryButton
            type="submit"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {t("continueBtn")} to Find Mandi Centre
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
