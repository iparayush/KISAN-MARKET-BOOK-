"use client";

import React from "react";

interface StatusBadgeProps {
  status: string;
  variant?: "yellow" | "green" | "gray" | "blue" | "red";
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = "yellow",
  size = "md",
}) => {
  const variantStyles = {
    yellow: "bg-amber-50 text-amber-800 border-amber-300",
    green: "bg-emerald-50 text-emerald-800 border-emerald-300",
    gray: "bg-slate-100 text-slate-700 border-slate-300",
    blue: "bg-blue-50 text-blue-800 border-blue-300",
    red: "bg-red-50 text-red-800 border-red-300",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-semibold",
    md: "px-2.5 py-1 text-xs font-bold tracking-wide uppercase",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {status}
    </span>
  );
};
