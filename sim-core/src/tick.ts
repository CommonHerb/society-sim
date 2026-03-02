import { assertInvariants } from "./invariants.js";
import { createRngPartition } from "./rng.js";
import { buildTelemetry } from "./telemetry.js";
import { EventRecord, SimulationParams, TickResult, WorldState } from "./types.js";

function clamp01(v: number): number {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function materialUpdate(state: WorldState, params: SimulationParams): WorldState {
  const settlements = state.settlements.map((s) => {
    const foodConsumed = s.population * params.foodConsumptionPerCapita;
    const foodProduced = params.baselineFoodProduction * (1 - s.environmentalStress);
    const goodsProduced = params.baselineGoodsProduction * s.infrastructureIndex;

    return {
      ...s,
      foodStock: Math.max(0, s.foodStock + foodProduced - foodConsumed),
      goodsStock: Math.max(0, s.goodsStock + goodsProduced - s.extractionRate * 0.1),
      securityCapacity: Math.max(0, s.securityCapacity * (1 - params.securityDecay)),
    };
  });

  return { ...state, settlements };
}

function hazardStage(state: WorldState, seed: number): { next: WorldState; deltas: EventRecord[] } {
  const rng = createRngPartition(seed).hazard;
  const deltas: EventRecord[] = [];

  for (const s of state.settlements) {
    const scarcity = s.foodStock < s.population * 0.3 ? 0.2 : 0;
    const instability = (1 - s.legitimacy) * 0.15;
    const hazard = scarcity + instability;

    if (rng.next() < hazard) {
      const event: EventRecord = {
        id: `evt-${state.tick}-${s.id}-${deltas.length}`,
        tick: state.tick,
        eventType: "unrest",
        severity: clamp01(hazard),
        triggerFactors: { scarcity, instability },
        affectedEntities: [s.id],
        groundTruthPayload: { settlementId: s.id, kind: "unrest" },
        reportedVariants: [],
      };
      deltas.push(event);
    }
  }

  return { next: { ...state, events: [...state.events, ...deltas] }, deltas };
}

function deriveLegitimacy(state: WorldState): WorldState {
  const settlements = state.settlements.map((s) => {
    const scarcityPenalty = s.foodStock <= 0 ? 0.2 : 0;
    const burdenPenalty = s.extractionRate * 0.2;
    const securityBonus = Math.min(0.2, s.securityCapacity * 0.05);
    const next = clamp01(s.legitimacy + securityBonus - scarcityPenalty - burdenPenalty);
    return { ...s, legitimacy: next };
  });
  return { ...state, settlements };
}

export function runTick(
  state: WorldState,
  params: SimulationParams,
  seed: number,
): TickResult {
  assertInvariants(state);

  let nextState: WorldState = { ...state, tick: state.tick + 1 };
  nextState = materialUpdate(nextState, params);

  const hazard = hazardStage(nextState, seed + nextState.tick);
  nextState = hazard.next;

  nextState = deriveLegitimacy(nextState);

  assertInvariants(nextState);

  return {
    state: nextState,
    deltas: hazard.deltas,
    telemetry: buildTelemetry(nextState),
  };
}

