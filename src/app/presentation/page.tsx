"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Presentation,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Wheat,
  Building2,
  CalendarCheck,
  Ticket,
  Users,
  MapPin,
  FileCheck,
  Award,
  Scale,
  Receipt,
  CreditCard,
} from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton, SecondaryButton } from "@/components/PrimaryButton";

export default function PresentationPage() {
  const router = useRouter();
  const { state, setProcurementStage, resetDemo, simulatePayment } = useDemo();
  const [activeStep, setActiveStep] = useState(1);

  const presentationSteps = [
    {
      num: 1,
      title: "Crop Registration",
      route: "/crop",
      icon: Wheat,
      explanation: "Farmer registers crop variety (Wheat) and estimated harvest quantity (450 kg) with self-declared harvest date.",
      actionLabel: "View Crop Form",
      execute: () => router.push("/crop"),
    },
    {
      num: 2,
      title: "Smart Centre",
      route: "/centres",
      icon: Building2,
      explanation: "Algorithmic recommendation engine prioritizes Kisan Procurement Centre based on queue, distance, and 3 active counters.",
      actionLabel: "View Recommendation",
      execute: () => router.push("/centres"),
    },
    {
      num: 3,
      title: "Slot Booking",
      route: "/slots",
      icon: CalendarCheck,
      explanation: "Farmer books optimal 10:30 AM slot, preventing peak physical traffic congestion.",
      actionLabel: "View Slot Selection",
      execute: () => router.push("/slots"),
    },
    {
      num: 4,
      title: "Digital Token",
      route: "/token",
      icon: Ticket,
      explanation: "System generates digital entry token KP-104 with QR/barcode gate pass verification.",
      actionLabel: "View Digital Pass",
      execute: () => {
        setProcurementStage("BOOKED");
        router.push("/token");
      },
    },
    {
      num: 5,
      title: "Live Queue",
      route: "/queue",
      icon: Users,
      explanation: "Real-time queue tracking showing currently served token (KP-097), 7 ahead, and dynamic 32-minute wait calculation.",
      actionLabel: "Open Live Queue",
      execute: () => router.push("/queue"),
    },
    {
      num: 6,
      title: "Arrival",
      route: "/arrival",
      icon: MapPin,
      explanation: "Farmer arrives at mandi gate, clicks 'I'm at the Centre', updating stage to ARRIVED.",
      actionLabel: "Test Arrival Check-In",
      execute: () => {
        setProcurementStage("ARRIVED");
        router.push("/arrival");
      },
    },
    {
      num: 7,
      title: "Verification",
      route: "/verification",
      icon: FileCheck,
      explanation: "Gate operator inspects 7/12 land records and Aadhaar linkage, approving identity as VERIFIED.",
      actionLabel: "Inspect Verification",
      execute: () => {
        setProcurementStage("DOCUMENT VERIFIED");
        router.push("/verification");
      },
    },
    {
      num: 8,
      title: "Quality Check",
      route: "/quality",
      icon: Award,
      explanation: "Assay laboratory samples wheat moisture (11.8%) and confirms Grade-A FAQ compliance.",
      actionLabel: "View Quality Certificate",
      execute: () => {
        setProcurementStage("QUALITY CHECK");
        router.push("/quality");
      },
    },
    {
      num: 9,
      title: "Weighing",
      route: "/weighing",
      icon: Scale,
      explanation: "Electronic weighbridge calculates gross vehicle weight minus tare, certifying 448 kg net wheat weight.",
      actionLabel: "View Weighbridge Scale",
      execute: () => {
        setProcurementStage("WEIGHING");
        router.push("/weighing");
      },
    },
    {
      num: 10,
      title: "Procurement Acceptance",
      route: "/procurement",
      icon: CheckCircle2,
      explanation: "Intake officer officially accepts 448 kg load and locks MSP rate at Rs 2,275/qtl.",
      actionLabel: "View Acceptance",
      execute: () => {
        setProcurementStage("ACCEPTED");
        router.push("/procurement");
      },
    },
    {
      num: 11,
      title: "Bill Generation",
      route: "/bill",
      icon: Receipt,
      explanation: "Instant automated voucher generated: 448 kg x Rs 22.75/kg = Rs 10,192 total settlement value.",
      actionLabel: "View Bill Receipt",
      execute: () => {
        setProcurementStage("BILL GENERATED");
        router.push("/bill");
      },
    },
    {
      num: 12,
      title: "Payment Tracking",
      route: "/payment",
      icon: CreditCard,
      explanation: "Simulated DBT payment authorization marked as PAID with transaction reference KP-DEMO-2026-104.",
      actionLabel: "View Payment Ledger",
      execute: () => {
        simulatePayment();
        router.push("/payment");
      },
    },
  ];

  const current = presentationSteps[activeStep - 1];
  const Icon = current.icon;

  const handleNext = () => {
    if (activeStep < presentationSteps.length) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <PageHeader
        title="SIH Judge Presentation Mode"
        subtitle="Step-by-step interactive demonstration walkthrough"
        showBack
        backHref="/home"
        rightAction={
          <button
            type="button"
            onClick={resetDemo}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Flow</span>
          </button>
        }
      />

      {/* Step Selector Horizontal Ribbon */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {presentationSteps.map((step) => {
          const isActive = step.num === activeStep;
          return (
            <button
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-amber-400 text-slate-950 border border-amber-500 shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {step.num}. {step.title}
            </button>
          );
        })}
      </div>

      {/* Main Focus Card for Active Step */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black border border-amber-500">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                Presentation Step {current.num} of 12
              </span>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {current.title}
              </h2>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
            Route: {current.route}
          </span>
        </div>

        {/* Step Explanation */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {current.explanation}
        </div>

        {/* Action Controls */}
        <div className="space-y-3">
          <PrimaryButton
            onClick={current.execute}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {current.actionLabel} ({current.route})
          </PrimaryButton>

          <div className="flex items-center justify-between gap-3 pt-2">
            <SecondaryButton
              onClick={handlePrev}
              disabled={activeStep === 1}
              fullWidth={false}
              className="px-4 text-xs"
            >
              Previous Step
            </SecondaryButton>

            <span className="text-xs font-bold text-slate-400">
              Step {activeStep} / {presentationSteps.length}
            </span>

            <SecondaryButton
              onClick={handleNext}
              disabled={activeStep === presentationSteps.length}
              fullWidth={false}
              className="px-4 text-xs"
            >
              Next Step
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
