"use client";

import React from "react";
import { Bell, Check, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { PageHeader } from "@/components/PageHeader";

export default function NotificationsPage() {
  const { notifications, markNotificationRead } = useDemo();

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <PageHeader
        title="Notifications"
        subtitle="Automated alerts regarding your procurement appointment"
        showBack
        backHref="/home"
      />

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markNotificationRead(notif.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              notif.read
                ? "bg-white border-slate-200 text-slate-700"
                : "bg-amber-50/40 border-amber-300 text-slate-900 shadow-xs"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                    notif.read
                      ? "bg-slate-100 text-slate-500 border-slate-200"
                      : "bg-amber-400 text-slate-950 border-amber-500 font-bold"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {notif.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {notif.message}
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-1.5">
                    <Clock className="w-3 h-3" />
                    {notif.timestamp}
                  </span>
                </div>
              </div>

              {!notif.read && (
                <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-1" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
