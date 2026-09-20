"use client";

import React from "react";
import Link from "next/link";
import { History, Wheat, Building2, Calendar, Receipt, CheckCircle2 } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { INITIAL_HISTORY } from "@/data/demoData";
import { StatusBadge } from "@/components/StatusBadge";
import { SecondaryButton } from "@/components/PrimaryButton";

export default function ProcurementHistoryPage() {
  const { state } = useDemo();

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <PageHeader
        title="Procurement History"
        subtitle="Completed mandi settlements and historic vouchers"
        showBack
        backHref="/home"
      />

      <div className="space-y-3">
        {INITIAL_HISTORY.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <Wheat className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {record.crop} ({record.quantity})
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Receipt: {record.receiptId}
                  </p>
                </div>
              </div>
              <StatusBadge status={record.status} variant="green" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Centre</span>
                <strong className="text-slate-800 truncate block mt-0.5">
                  {record.centre}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Date</span>
                <strong className="text-slate-800 block mt-0.5">
                  {record.date}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Total Payout</span>
                <strong className="text-emerald-800 font-black block mt-0.5">
                  {record.totalAmount}
                </strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link href="/bill">
                <SecondaryButton icon={<Receipt className="w-4 h-4 text-slate-700" />}>
                  View Receipt
                </SecondaryButton>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
