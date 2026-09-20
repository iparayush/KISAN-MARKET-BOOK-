"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  isLoading = false,
  children,
  icon,
  fullWidth = true,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={`min-h-[46px] px-5 py-2.5 rounded-xl font-semibold text-slate-900 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2 border border-amber-500/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-slate-800" />
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  isLoading = false,
  children,
  icon,
  fullWidth = true,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={`min-h-[46px] px-5 py-2.5 rounded-xl font-semibold text-slate-800 bg-white hover:bg-slate-50 active:bg-slate-100 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2 border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};
