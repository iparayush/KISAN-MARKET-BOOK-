"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          {description}
        </p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  onClose,
}) => {
  const styles = {
    success: "bg-emerald-50 text-emerald-900 border-emerald-300",
    error: "bg-red-50 text-red-900 border-red-300",
    info: "bg-amber-50 text-amber-900 border-amber-300",
  };

  return (
    <div
      className={`rounded-xl border p-3 text-xs font-medium shadow-sm flex items-center justify-between gap-3 ${styles[type]}`}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-900 font-bold text-xs"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};
