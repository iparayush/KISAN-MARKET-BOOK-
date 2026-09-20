"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  DemoState,
  INITIAL_DEMO_STATE,
  ProcurementStage,
  NotificationItem,
  INITIAL_NOTIFICATIONS,
  TRANSLATIONS,
} from "@/data/demoData";
import { advanceQueue, advanceStage, resetToInitialState } from "@/lib/demoEngine";

interface DemoContextType {
  state: DemoState;
  notifications: NotificationItem[];
  unreadCount: number;
  simulateNextToken: () => void;
  nextProcurementStage: () => void;
  setProcurementStage: (stage: ProcurementStage) => void;
  completeProcurement: () => void;
  simulatePayment: () => void;
  resetDemo: () => void;
  updateCrop: (crop: string, quantity: number, expectedDate: string) => void;
  selectCentre: (centreName: string, distance: string) => void;
  selectSlot: (time: string, date: string) => void;
  confirmArrival: () => void;
  toggleAutoDemo: () => void;
  setLanguage: (lang: "en" | "mr" | "hi") => void;
  markNotificationRead: (id: string) => void;
  t: (key: string) => string;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(INITIAL_DEMO_STATE);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const t = useCallback(
    (key: string): string => {
      const lang = state.language || "en";
      const dict = TRANSLATIONS[lang] as Record<string, string>;
      return dict[key] || TRANSLATIONS.en[key as keyof typeof TRANSLATIONS.en] || key;
    },
    [state.language]
  );

  const simulateNextToken = useCallback(() => {
    setState((prev) => {
      const next = advanceQueue(prev);
      return next;
    });
  }, []);

  const nextProcurementStage = useCallback(() => {
    setState((prev) => advanceStage(prev));
  }, []);

  const setProcurementStage = useCallback((stage: ProcurementStage) => {
    setState((prev) => {
      const updated = { ...prev, procurementStage: stage };
      if (stage === "QUALITY CHECK") updated.qualityStatus = "PASSED";
      if (stage === "WEIGHING") updated.weighingStatus = "VERIFIED";
      if (stage === "ACCEPTED") updated.actualWeight = 448;
      if (stage === "PAID") updated.paymentStatus = "PAID";
      return updated;
    });
  }, []);

  const completeProcurement = useCallback(() => {
    setState((prev) => ({
      ...prev,
      procurementStage: "PAID",
      qualityStatus: "PASSED",
      weighingStatus: "VERIFIED",
      actualWeight: 448,
      paymentStatus: "PAID",
    }));
  }, []);

  const simulatePayment = useCallback(() => {
    setState((prev) => ({
      ...prev,
      paymentStatus: "PAID",
      procurementStage: "PAID",
    }));
  }, []);

  const resetDemo = useCallback(() => {
    setState(resetToInitialState());
    setNotifications(INITIAL_NOTIFICATIONS);
  }, []);

  const updateCrop = useCallback((crop: string, quantity: number, expectedDate: string) => {
    setState((prev) => ({
      ...prev,
      crop,
      quantity,
      expectedDate,
      expectedWeight: quantity,
    }));
  }, []);

  const selectCentre = useCallback((centreName: string, distance: string) => {
    setState((prev) => ({
      ...prev,
      centre: centreName,
      distance,
    }));
  }, []);

  const selectSlot = useCallback((time: string, date: string) => {
    setState((prev) => ({
      ...prev,
      appointmentTime: time,
      appointmentDate: date,
    }));
  }, []);

  const confirmArrival = useCallback(() => {
    setState((prev) => ({
      ...prev,
      procurementStage: "ARRIVED",
    }));
  }, []);

  const toggleAutoDemo = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isAutoDemo: !prev.isAutoDemo,
    }));
  }, []);

  const setLanguage = useCallback((language: "en" | "mr" | "hi") => {
    setState((prev) => ({
      ...prev,
      language,
    }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  // Auto Demo loop
  useEffect(() => {
    if (!state.isAutoDemo) return;

    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.procurementStage === "PAID") {
          return { ...prev, isAutoDemo: false };
        }
        return advanceStage(prev);
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [state.isAutoDemo]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DemoContext.Provider
      value={{
        state,
        notifications,
        unreadCount,
        simulateNextToken,
        nextProcurementStage,
        setProcurementStage,
        completeProcurement,
        simulatePayment,
        resetDemo,
        updateCrop,
        selectCentre,
        selectSlot,
        confirmArrival,
        toggleAutoDemo,
        setLanguage,
        markNotificationRead,
        t,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
