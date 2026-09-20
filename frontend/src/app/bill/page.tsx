"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Receipt, User, Wheat, Scale, CreditCard, ArrowRight, ShieldCheck, Printer } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";
import { StatusBadge } from "@/components/StatusBadge";

export default function BillGenerationPage() {
  const router = useRouter();
  const { state, setProcurementStage, t } = useDemo();

  const handleTrackPayment = () => {
    setProcurementStage("PAYMENT PROCESSING");
    router.push("/payment");
  };

  const ratePerKg = (state.ratePerQuintal / 100).toFixed(2);
  const totalAmountFormatted = state.totalBillAmount.toLocaleString("en-IN");

  return (
    <div className="max-w-md mx-auto space-y-5">
      <PageHeader
        title="Procurement Receipt"
        subtitle="Official mandi purchase invoice and billing voucher"
        showBack
        backHref="/procurement"
      />

      <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm overflow-hidden">
        {/* Receipt Header Banner */}
        <div className="bg-slate-900 text-white p-5 space-y-1 text-center">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-2 font-black">
            <Receipt className="w-5 h-5 text-slate-950" />
          </div>
          <h2 className="text-base font-black tracking-tight">
            KisanProcure Procurement Receipt
          </h2>
          <p className="text-[11px] text-slate-300">
            Government Mandi Purchase Voucher (Simulated Demo)
          </p>
          <div className="pt-2">
            <StatusBadge status="BILL GENERATED" variant="green" size="sm" />
          </div>
        </div>

        {/* Voucher Metadata */}
        <div className="p-5 space-y-4 text-xs bg-slate-50/50">
          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">
                Booking Reference
              </span>
              <p className="font-mono font-bold text-slate-800 mt-0.5">
                {state.bookingId}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">
                Date & Time
              </span>
              <p className="font-bold text-slate-800 mt-0.5">
                {state.appointmentDate}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 text-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Farmer Name</span>
              <strong className="text-slate-900">{state.farmerName}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Centre</span>
              <strong className="text-slate-900">{state.centre}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Crop & Variety</span>
              <strong className="text-slate-900">{state.crop} (Grade-A)</strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Accepted Quantity</span>
              <strong className="text-slate-900 font-mono">{state.actualWeight} kg</strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">MSP Benchmark Rate</span>
              <strong className="text-slate-900 font-mono">
                Rs {state.ratePerQuintal} / qtl (Rs {ratePerKg}/kg)
              </strong>
            </div>
          </div>

          {/* Grand Total Highlight */}
          <div className="mt-4 pt-3 border-t-2 border-dashed border-slate-300 flex items-center justify-between bg-amber-50 p-3 rounded-xl border border-amber-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                Total Payable Amount
              </span>
              <span className="text-xs text-amber-800">
                Direct Benefit Transfer (DBT)
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900 font-mono">
              Rs {totalAmountFormatted}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row gap-2.5">
          <PrimaryButton
            onClick={handleTrackPayment}
            icon={<CreditCard className="w-4 h-4" />}
          >
            {t("trackPayment")}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
