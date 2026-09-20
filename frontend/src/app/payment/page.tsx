"use client";

import React from "react";
import Link from "next/link";
import { CreditCard, CheckCircle2, ShieldAlert, ArrowRight, Home, History } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";

export default function PaymentTrackingPage() {
  const { state, simulatePayment, t } = useDemo();

  const isPaid = state.paymentStatus === "PAID";
  const totalAmountFormatted = state.totalBillAmount.toLocaleString("en-IN");

  const timelineSteps = [
    { title: "Bill Generated", status: "Completed", desc: "Assay and net weight confirmed" },
    { title: "Payment Processing", status: "Completed", desc: "Mandate cleared via PFMS portal simulation" },
    { title: "Payment Credited", status: isPaid ? "Completed" : "In Progress", desc: "Bank Account No: Ending **4108" },
  ];

  return (
    <div className="max-w-md mx-auto space-y-5">
      <PageHeader
        title={t("paymentTracking")}
        subtitle="Direct Benefit Transfer (DBT) disbursement status"
        showBack
        backHref="/bill"
      />

      {/* Prominent Simulated Payment Warning Label */}
      <div className="bg-amber-500/15 border border-amber-500/40 rounded-2xl p-3.5 text-center space-y-1">
        <span className="text-[11px] font-black uppercase tracking-widest text-amber-900 flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-700" />
          SIMULATED PAYMENT
        </span>
        <p className="text-[11px] text-amber-900 font-medium">
          Prototype environment: no real bank accounts or financial transfers are made.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Top Payment Status Box */}
        <div className="text-center space-y-2 pb-4 border-b border-slate-200">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Payment Status
          </p>
          <div className="flex items-center justify-center gap-2">
            <StatusBadge status={isPaid ? "PAID" : "PROCESSING"} variant="green" size="md" />
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono pt-1">
            Rs {totalAmountFormatted}
          </p>
        </div>

        {/* Payment Metadata Grid */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Beneficiary Farmer</span>
            <strong className="text-slate-900">{state.farmerName}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Transaction Reference</span>
            <strong className="text-slate-900 font-mono">{state.transactionId}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Disbursement Date</span>
            <strong className="text-slate-900">{state.paymentDate}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Mandi Procurement Batch</span>
            <strong className="text-slate-900 font-mono">{state.bookingId}</strong>
          </div>
        </div>

        {/* 3-Step Payment Timeline */}
        <div className="space-y-3 pt-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Disbursement Milestones
          </h3>
          <div className="space-y-3">
            {timelineSteps.map((step, idx) => (
              <div key={step.title} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs text-slate-800">{step.title}</strong>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">
                      {step.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-2.5">
          <Link href="/history" className="flex-1">
            <PrimaryButton icon={<History className="w-4 h-4" />}>
              View Procurement History
            </PrimaryButton>
          </Link>
          <Link href="/home" className="flex-1">
            <SecondaryButton icon={<Home className="w-4 h-4" />}>
              Return to Home
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
