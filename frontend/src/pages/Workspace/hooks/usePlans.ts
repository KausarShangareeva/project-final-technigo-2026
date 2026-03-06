import { useState, useEffect, useCallback } from "react";
import type { SavedPlan, ScheduleEntry } from "../types";
import {
  generatePlanTitle,
  generatePlanDescription,
  getDominantColor,
} from "../utils/planHelpers";

const STORAGE_KEY = "qalamflow_saved_plans";
const ACTIVE_PLAN_KEY = "qalamflow_active_plan_id";

function loadFromStorage(): SavedPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(plans: SavedPlan[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

function buildPlanMeta(schedule: ScheduleEntry[], orientation: "vertical" | "horizontal") {
  return {
    color: getDominantColor(schedule),
    title: generatePlanTitle(schedule),
    description: generatePlanDescription(schedule),
    schedule,
    orientation,
  };
}

export function usePlans() {
  const [plans, setPlans] = useState<SavedPlan[]>(loadFromStorage);
  const [activePlanId, setActivePlanId] = useState<string | null>(
    localStorage.getItem(ACTIVE_PLAN_KEY),
  );

  useEffect(() => {
    saveToStorage(plans);
  }, [plans]);

  useEffect(() => {
    if (activePlanId) {
      localStorage.setItem(ACTIVE_PLAN_KEY, activePlanId);
    } else {
      localStorage.removeItem(ACTIVE_PLAN_KEY);
    }
  }, [activePlanId]);

  const savePlan = useCallback(
    (
      schedule: ScheduleEntry[],
      orientation: "vertical" | "horizontal",
    ): SavedPlan => {
      const newPlan: SavedPlan = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...buildPlanMeta(schedule, orientation),
      };
      setPlans((prev) => [newPlan, ...prev]);
      return newPlan;
    },
    [],
  );

  const updatePlan = useCallback(
    (
      id: string,
      schedule: ScheduleEntry[],
      orientation: "vertical" | "horizontal",
    ) => {
      setPlans((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, ...buildPlanMeta(schedule, orientation) } : p,
        ),
      );
    },
    [],
  );

  const loadPlan = useCallback(
    (planId: string): SavedPlan | undefined => {
      const plan = plans.find((p) => p.id === planId);
      if (plan) setActivePlanId(planId);
      return plan;
    },
    [plans],
  );

  const deletePlan = useCallback((planId: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== planId));
    setActivePlanId((prev) => (prev === planId ? null : prev));
  }, []);

  return { plans, activePlanId, setActivePlanId, savePlan, updatePlan, loadPlan, deletePlan };
}
