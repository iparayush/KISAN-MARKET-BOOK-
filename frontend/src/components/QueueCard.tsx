"use client";

import React from "react";
import { Users, Clock, MonitorPlay, ArrowRight, RefreshCw } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";

interface QueueCardProps {
  currentServingToken: string;
  userToken: string;
  position: number;
  farmersAhead: number;
  estimatedWaitMinutes: number;
  activeCounters: number;
  lastUpdated: string;
  onSimulateNextToken: () => void;
}

export const QueueCard: React.FC<QueueCardProps> = ({
  currentServingToken,
  userToken,
  position,
  farmersAhead,
  estimatedWaitMinutes,
  activeCounters,
  lastUpdated,
  onSimulateNextToken,
}) => {
  // Generate queue visual list between current and user token
  const parseNum = (token: string) => {
    const parts = token.split("-");
    return parts.length > 1 ? parseInt(parts[1], 10) : 0;
  };

  const currentNum = parseNum(currentServingToken);
  const userNum = parseNum(userToken);

  const visualTokens: string[] = [];
  const start = Math.max(1, currentNum);
  const end = Math.max(currentNum, userNum);

  for (let i = start; i <= end; i++) {
    visualTokens.push(`KP-${String(i).padStart(3, "0")}`);
  }

  const isUserTurn = currentNum >= userNum;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
      {/* Top Banner Status */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Real-Time Mandi Queue
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated: {lastUpdated}</span>
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Now Serving */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 text-center">
          <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
            NOW SERVING
          </p>
          <p className="text-3xl font-black text-emerald-950 font-mono mt-1">
            {currentServingToken}
          </p>
          <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900">
            Counter Gate Active
          </span>
        </div>

        {/* Your Token */}
        <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-3.5 text-center">
          <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
            YOUR TOKEN
          </p>
          <p className="text-3xl font-black text-amber-950 font-mono mt-1">
            {userToken}
          </p>
          <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-200 text-amber-950">
            {isUserTurn ? "Proceed to Gate" : `Position ${position}`}
          </span>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-xl p-3 text-center border border-slate-200 text-xs">
        <div>
          <p className="text-slate-400 font-medium uppercase text-[10px]">
            POSITION
          </p>
          <p className="text-lg font-bold text-slate-800 mt-0.5">{position}</p>
        </div>
        <div className="border-x border-slate-200">
          <p className="text-slate-400 font-medium uppercase text-[10px]">
            FARMERS AHEAD
          </p>
          <p className="text-lg font-bold text-amber-700 mt-0.5">
            {farmersAhead}
          </p>
        </div>
        <div>
          <p className="text-slate-400 font-medium uppercase text-[10px]">
            ESTIMATED WAIT
          </p>
          <p className="text-lg font-bold text-slate-800 mt-0.5">
            {estimatedWaitMinutes} MIN
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
        <MonitorPlay className="w-3.5 h-3.5 text-slate-400" />
        <span>Active Physical Weighing & Quality Counters:</span>
        <strong className="text-slate-800">{activeCounters}</strong>
      </div>

      {/* Visual Queue Ribbon */}
      <div className="space-y-2 pt-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Live Token Sequence
        </p>
        <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 scrollbar-thin">
          {visualTokens.map((tok, index) => {
            const isServing = tok === currentServingToken;
            const isUser = tok === userToken;

            let badgeStyle = "bg-slate-100 text-slate-600 border-slate-200";
            if (isServing) {
              badgeStyle = "bg-emerald-600 text-white border-emerald-700 font-black scale-105 shadow-xs";
            } else if (isUser) {
              badgeStyle = "bg-amber-400 text-slate-950 border-amber-500 font-black ring-2 ring-amber-400/40";
            }

            return (
              <div
                key={tok}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-transform ${badgeStyle}`}
              >
                {tok}
                {isUser && <span className="block text-[9px] uppercase tracking-wider">YOU</span>}
                {isServing && <span className="block text-[9px] uppercase tracking-wider">GATE</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulation Button */}
      <div className="pt-2">
        <PrimaryButton
          onClick={onSimulateNextToken}
          icon={<RefreshCw className="w-4 h-4 text-slate-900" />}
          disabled={isUserTurn}
        >
          {isUserTurn ? "You Are At The Gate" : "Simulate Next Token"}
        </PrimaryButton>
        <p className="text-[11px] text-center text-slate-500 mt-2">
          Click above to simulate mandi gate counter calls (SIH demonstration).
        </p>
      </div>
    </div>
  );
};
