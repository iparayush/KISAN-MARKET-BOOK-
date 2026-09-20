import { DemoState, INITIAL_DEMO_STATE, PROCUREMENT_STAGES, ProcurementStage } from "@/data/demoData";

export function calculateBillAmount(weightKg: number, ratePerQuintal: number): number {
  const ratePerKg = ratePerQuintal / 100;
  return Math.round(weightKg * ratePerKg);
}

export function parseTokenNumber(token: string): number {
  const parts = token.split("-");
  return parts.length > 1 ? parseInt(parts[1], 10) : 0;
}

export function formatTokenString(num: number): string {
  return `KP-${String(num).padStart(3, "0")}`;
}

export function advanceQueue(state: DemoState): DemoState {
  const currentServingNum = parseTokenNumber(state.currentServingToken);
  const userTokenNum = parseTokenNumber(state.token);

  if (currentServingNum >= userTokenNum) {
    return {
      ...state,
      farmersAhead: 0,
      queuePosition: 1,
      estimatedWaitMinutes: 0,
      queueLastUpdated: "Just now",
    };
  }

  const nextServingNum = currentServingNum + 1;
  const newFarmersAhead = Math.max(0, userTokenNum - nextServingNum);
  const newPosition = newFarmersAhead + 1;
  const newWait = Math.max(0, Math.round((newFarmersAhead * 12) / state.activeCounters));

  return {
    ...state,
    currentServingToken: formatTokenString(nextServingNum),
    farmersAhead: newFarmersAhead,
    queuePosition: newPosition,
    estimatedWaitMinutes: newWait,
    queueLastUpdated: "Just now",
  };
}

export function getNextStage(currentStage: ProcurementStage): ProcurementStage {
  const currentIndex = PROCUREMENT_STAGES.indexOf(currentStage);
  if (currentIndex === -1 || currentIndex >= PROCUREMENT_STAGES.length - 1) {
    return PROCUREMENT_STAGES[PROCUREMENT_STAGES.length - 1];
  }
  return PROCUREMENT_STAGES[currentIndex + 1];
}

export function advanceStage(state: DemoState): DemoState {
  const nextStage = getNextStage(state.procurementStage);

  const updated: Partial<DemoState> = {
    procurementStage: nextStage,
  };

  if (nextStage === "ARRIVED") {
    // Arrival confirmed
  } else if (nextStage === "DOCUMENT VERIFIED") {
    // Verified
  } else if (nextStage === "QUALITY CHECK") {
    updated.qualityStatus = "PASSED";
  } else if (nextStage === "WEIGHING") {
    updated.weighingStatus = "VERIFIED";
  } else if (nextStage === "ACCEPTED") {
    updated.actualWeight = 448;
  } else if (nextStage === "BILL GENERATED") {
    updated.totalBillAmount = calculateBillAmount(state.actualWeight || 448, state.ratePerQuintal);
  } else if (nextStage === "PAYMENT PROCESSING") {
    updated.paymentStatus = "PROCESSING";
  } else if (nextStage === "PAID") {
    updated.paymentStatus = "PAID";
  }

  return {
    ...state,
    ...updated,
  };
}

export function resetToInitialState(): DemoState {
  return {
    ...INITIAL_DEMO_STATE,
  };
}
