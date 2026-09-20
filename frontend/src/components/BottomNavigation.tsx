"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, Users, Activity, Menu } from "lucide-react";

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "HOME", href: "/home", icon: Home },
    { label: "BOOK", href: "/crop", icon: CalendarPlus },
    { label: "QUEUE", href: "/queue", icon: Users },
    { label: "TRACK", href: "/procurement", icon: Activity },
    { label: "MORE", href: "/profile", icon: Menu },
  ];

  return (
    <nav aria-label="Mobile Navigation" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 safe-area-bottom shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href === "/crop" &&
              ["/centres", "/slots", "/booking", "/token"].includes(pathname)) ||
            (item.href === "/procurement" &&
              [
                "/arrival",
                "/verification",
                "/quality",
                "/weighing",
                "/bill",
                "/payment",
              ].includes(pathname)) ||
            (item.href === "/profile" &&
              ["/bookings", "/history", "/help", "/about", "/workflow"].includes(
                pathname
              ));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors min-h-[44px] ${
                isActive
                  ? "text-amber-800 font-bold"
                  : "text-slate-500 hover:text-slate-900 font-medium"
              }`}
            >
              <div
                className={`p-1 rounded-lg ${
                  isActive ? "bg-amber-100 text-amber-900" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-wider font-semibold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
