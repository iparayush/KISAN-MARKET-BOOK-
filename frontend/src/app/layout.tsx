import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/context/DemoContext";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "KisanProcure | Smart Procurement & Queue Management",
  description:
    "KisanProcure is a functional SIH 2026 prototype for digital procurement slot booking, token generation, live queue tracking and procurement status.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-amber-200">
        <DemoProvider>
          <AppShell>{children}</AppShell>
        </DemoProvider>
      </body>
    </html>
  );
}
