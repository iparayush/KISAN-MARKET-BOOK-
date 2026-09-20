"use client";

import React from "react";
import Link from "next/link";
import { Ticket, Building2, Clock, Users, ArrowRight, BookmarkCheck } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { PrimaryButton, SecondaryButton } from "./PrimaryButton";

interface TokenCardProps {
  token: string;
  centre: string;
  appointmentTime: string;
  farmersAhead: number;
  estimatedWaitMinutes: number;
  status: string;
  showActions?: boolean;
  onAddToBookings?: () => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({
  token,
  centre,
  appointmentTime,
  farmersAhead,
  estimatedWaitMinutes,
  status,
  showActions = true,
  onAddToBookings,
}) => {
  return (
    <div className="bg-white rounded-2xl border-2 border-amber-300 shadow-sm overflow-hidden">
      {/* Token Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-4 text-slate-950 flex items-center justify-between border-b border-amber-500">
        <div className="flex items-center gap-2">
          <Ticket className="w-5 h-5 text-slate-950" />
          <span className="text-xs font-black uppercase tracking-wider">
            Digital Entry Token
          </span>
        </div>
        <StatusBadge status={status} variant="green" />
      </div>

      {/* Main Token Display */}
      <div className="p-6 text-center bg-amber-50/40 border-b border-dashed border-amber-200">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
          Assigned Token Number
        </p>
        <div className="text-5xl font-black text-slate-900 tracking-tight py-2 font-mono">
          {token}
        </div>
        <p className="text-xs text-amber-800 font-medium">
          Show this token upon arrival at the gate counter
        </p>
      </div>

      {/* Key Details Grid */}
      <div className="p-5 grid grid-cols-2 gap-4 text-left bg-white text-xs">
        <div className="space-y-1">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            Centre
          </span>
          <p className="font-bold text-slate-800 text-sm">{centre}</p>
        </div>

        <div className="space-y-1">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Appointment
          </span>
          <p className="font-bold text-slate-800 text-sm">{appointmentTime}</p>
        </div>

        <div className="space-y-1 pt-2 border-t border-slate-100">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            Farmers Ahead
          </span>
          <p className="font-black text-amber-700 text-base">
            {farmersAhead} Farmers
          </p>
        </div>

        <div className="space-y-1 pt-2 border-t border-slate-100">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Estimated Wait
          </span>
          <p className="font-black text-slate-800 text-base">
            {estimatedWaitMinutes} min
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-2.5">
          <Link href="/queue" className="flex-1">
            <PrimaryButton icon={<ArrowRight className="w-4 h-4" />}>
              View Live Queue
            </PrimaryButton>
          </Link>
          <Link href="/bookings" className="flex-1">
            <SecondaryButton
              onClick={onAddToBookings}
              icon={<BookmarkCheck className="w-4 h-4 text-emerald-600" />}
            >
              Add to My Bookings
            </SecondaryButton>
          </Link>
        </div>
      )}
    </div>
  );
};
