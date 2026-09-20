"use client";

import React from "react";
import Link from "next/link";
import { Building2, Calendar, Clock, Wheat, Ticket, ArrowRight } from "lucide-react";
import { BookingRecord } from "@/data/demoData";
import { StatusBadge } from "./StatusBadge";
import { SecondaryButton } from "./PrimaryButton";

interface BookingCardProps {
  booking: BookingRecord;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Booking Reference
          </span>
          <p className="text-base font-black text-slate-900 font-mono">
            {booking.bookingId}
          </p>
        </div>
        <StatusBadge status={booking.status} variant="green" />
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="space-y-1">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            Centre
          </span>
          <p className="font-bold text-slate-800 text-sm">{booking.centre}</p>
        </div>

        <div className="space-y-1">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Date & Time
          </span>
          <p className="font-bold text-slate-800 text-sm">
            {booking.date}, {booking.time}
          </p>
        </div>

        <div className="space-y-1 pt-2 border-t border-slate-100">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Wheat className="w-3.5 h-3.5 text-slate-500" />
            Crop & Quantity
          </span>
          <p className="font-bold text-slate-800 text-sm">
            {booking.crop} ({booking.quantity})
          </p>
        </div>

        <div className="space-y-1 pt-2 border-t border-slate-100">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Ticket className="w-3.5 h-3.5 text-slate-500" />
            Digital Token
          </span>
          <p className="font-black text-amber-700 text-base font-mono">
            {booking.token}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex gap-2">
        <Link href="/token" className="flex-1">
          <SecondaryButton icon={<ArrowRight className="w-4 h-4" />}>
            View Token Pass
          </SecondaryButton>
        </Link>
        <Link href="/queue" className="flex-1">
          <SecondaryButton icon={<Clock className="w-4 h-4 text-amber-600" />}>
            Live Queue
          </SecondaryButton>
        </Link>
      </div>
    </div>
  );
};
