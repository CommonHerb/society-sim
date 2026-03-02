import { WorldState } from "./types.js";

function inUnitInterval(v: number): boolean {
  return Number.isFinite(v) && v >= 0 && v <= 1;
}

export function assertInvariants(state: WorldState): void {
  for (const s of state.settlements) {
    if (!Number.isInteger(s.population) || s.population < 0) {
      throw new Error(`Invariant violation: invalid population for settlement ${s.id}`);
    }
    if (s.foodStock < 0 || s.goodsStock < 0) {
      throw new Error(`Invariant violation: negative stock in settlement ${s.id}`);
    }
    if (
      !inUnitInterval(s.extractionRate) ||
      !inUnitInterval(s.tradeConnectivity) ||
      !inUnitInterval(s.borderExposure) ||
      !inUnitInterval(s.infrastructureIndex) ||
      !inUnitInterval(s.environmentalStress) ||
      !inUnitInterval(s.legitimacy)
    ) {
      throw new Error(`Invariant violation: bounded field out of range in settlement ${s.id}`);
    }
  }

  for (const i of state.institutions) {
    if (
      !inUnitInterval(i.capacity) ||
      !inUnitInterval(i.credibility) ||
      !inUnitInterval(i.captureRisk) ||
      !inUnitInterval(i.resourceAccess)
    ) {
      throw new Error(`Invariant violation: institution out of range ${i.id}`);
    }
  }

  for (const b of state.blocs) {
    if (!inUnitInterval(b.grievanceIndex) || !inUnitInterval(b.complianceIndex)) {
      throw new Error(`Invariant violation: bloc fields out of range ${b.id}`);
    }
    for (const [k, v] of Object.entries(b.trustWeights)) {
      if (!inUnitInterval(v)) {
        throw new Error(`Invariant violation: trust weight out of range bloc=${b.id} target=${k}`);
      }
    }
  }

  for (const e of state.beliefGraph.edges) {
    if (!inUnitInterval(e.trustWeight) || !inUnitInterval(e.throughput)) {
      throw new Error(`Invariant violation: belief edge out of range ${e.from}->${e.to}`);
    }
    if (e.latencyTicks < 0 || !Number.isInteger(e.latencyTicks)) {
      throw new Error(`Invariant violation: invalid latency on edge ${e.from}->${e.to}`);
    }
    if (e.distortionBias < -1 || e.distortionBias > 1) {
      throw new Error(`Invariant violation: distortion out of range ${e.from}->${e.to}`);
    }
  }
}

