"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { BottomNavigation } from "./BottomNavigation";
import {
  Home,
  CalendarPlus,
  Users,
  Activity,
  Receipt,
  CreditCard,
  History,
  Bookmark,
  HelpCircle,
  Info,
  GitFork,
  Presentation,
  SlidersHorizontal,
} from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const isPublicLanding = pathname === "/" || pathname === "/login";

  const desktopLinks = [
    { label: "Dashboard", href: "/home", icon: Home },
    { label: "Book Slot", href: "/crop", icon: CalendarPlus },
    { label: "Live Queue", href: "/queue", icon: Users },
    { label: "Procurement Tracking", href: "/procurement", icon: Activity },
    { label: "Bill / Receipt", href: "/bill", icon: Receipt },
    { label: "Payment Status", href: "/payment", icon: CreditCard },
    { label: "My Bookings", href: "/bookings", icon: Bookmark },
    { label: "Procurement History", href: "/history", icon: History },
    { label: "Visual Workflow", href: "/workflow", icon: GitFork },
    { label: "SIH Judge Demo", href: "/presentation", icon: Presentation },
    { label: "Demo Controls", href: "/demo-controls", icon: SlidersHorizontal },
    { label: "Help & FAQ", href: "/help", icon: HelpCircle },
    { label: "About Project", href: "/about", icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased font-sans">
      <DisclaimerBanner />
      {!isPublicLanding && <Header />}

      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        {!isPublicLanding && (
          <aside className="hidden md:flex flex-col w-64 p-4 border-r border-slate-200 bg-white min-h-[calc(100vh-5.5rem)]">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
              Farmer Services
            </div>
            <nav className="flex-1 space-y-1">
              {desktopLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[40px] ${
                      isActive
                        ? "bg-amber-400/20 text-amber-950 font-bold border border-amber-400/40"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-amber-800" : "text-slate-500"
                      }`}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] text-slate-500 px-2 space-y-1">
              <p className="font-semibold text-slate-700">SIH 2026 Prototype</p>
              <p>Problem Statement: SIH26032</p>
              <p className="text-amber-700 font-medium">Demo-Only Environment</p>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main
          className={`flex-1 w-full ${
            isPublicLanding
              ? "p-0"
              : "p-4 sm:p-6 pb-24 md:pb-8 max-w-3xl mx-auto"
          }`}
        >
          {children}
        </main>
      </div>

      {!isPublicLanding && <BottomNavigation />}
    </div>
  );
};
