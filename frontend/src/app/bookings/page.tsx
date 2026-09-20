"use client";

import React from "react";
import Link from "next/link";
import { Bookmark, CalendarPlus } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";
import { BookingCard } from "@/components/BookingCard";
import { INITIAL_BOOKINGS } from "@/data/demoData";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function BookingsPage() {
  const { state } = useDemo();

  // Dynamically update first booking with current state
  const currentBookings = [
    {
      id: "b-current",
      bookingId: state.bookingId,
      centre: state.centre,
      date: state.appointmentDate,
      time: state.appointmentTime,
      crop: state.crop,
      quantity: `${state.quantity} kg`,
      token: state.token,
      status: state.procurementStage,
    },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <PageHeader
        title="My Bookings"
        subtitle="Active procurement slots and assigned digital passes"
        showBack
        backHref="/home"
      />

      <div className="space-y-4">
        {currentBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>

      <div className="pt-2">
        <Link href="/crop">
          <PrimaryButton icon={<CalendarPlus className="w-4 h-4" />}>
            Book Another Slot
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
