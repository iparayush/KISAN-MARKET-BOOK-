"use client";

import React from "react";
import Link from "next/link";
import {
  UserCheck,
  Wheat,
  Building2,
  CalendarCheck,
  Ticket,
  Users,
  MapPin,
  FileCheck,
  Award,
  Scale,
  CheckCircle2,
  Receipt,
  CreditCard,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function WorkflowPage() {
  const steps = [
    { num: 1, title: "FARMER REGISTRATION", icon: UserCheck, desc: "Aadhaar & 7/12 land record linked demo account" },
    { num: 2, title: "CROP REGISTRATION", icon: Wheat, desc: "Specify crop variety, quantity (450 kg), and date" },
    { num: 3, title: "SMART CENTRE RECOMMENDATION", icon: Building2, desc: "Algorithmic selection based on queue depth & distance" },
    { num: 4, title: "SLOT BOOKING", icon: CalendarCheck, desc: "Allocated 10:30 AM optimal intake window" },
    { num: 5, title: "DIGITAL TOKEN", icon: Ticket, desc: "Issuance of token KP-104 digital gate pass" },
    { num: 6, title: "LIVE QUEUE TRACKING", icon: Users, desc: "Real-time queue monitoring with active counter calls" },
    { num: 7, title: "ARRIVAL AT CENTRE", icon: MapPin, desc: "Check-in at mandi gate to notify intake operators" },
    { num: 8, title: "DOCUMENT VERIFICATION", icon: FileCheck, desc: "Identity, land records, and booking validation" },
    { num: 9, title: "QUALITY CHECK", icon: Award, desc: "Fair Average Quality (FAQ) and moisture assay test" },
    { num: 10, title: "WEIGHING", icon: Scale, desc: "Electronic bridge measurement of gross & tare weight" },
    { num: 11, title: "PROCUREMENT ACCEPTANCE", icon: CheckCircle2, desc: "Final quantity accepted at official MSP rate" },
    { num: 12, title: "BILL & RECEIPT", icon: Receipt, desc: "Automated calculation of payable voucher (Rs 10,192)" },
    { num: 13, title: "PAYMENT TRACKING", icon: CreditCard, desc: "Direct Benefit Transfer (DBT) simulated disbursement" },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <PageHeader
        title="Procurement Workflow"
        subtitle="Complete end-to-end digital lifecycle diagram"
        showBack
        backHref="/home"
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          The KisanProcure architecture replaces unorganized physical waiting queues with an intelligent, multi-stage scheduling and status tracking pipeline:
        </p>

        <div className="space-y-2 pt-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.num}>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black flex-shrink-0 border border-amber-500">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 font-bold tracking-wide">
                        {step.title}
                      </strong>
                      <span className="text-[10px] font-bold text-slate-400">
                        Step {step.num}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown className="w-4 h-4 text-amber-500 animate-bounce" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-200">
          <Link href="/presentation">
            <PrimaryButton icon={<ArrowRight className="w-4 h-4" />}>
              Launch Interactive Judge Presentation
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
