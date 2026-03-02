import { Telemetry, WorldState } from "./types.js";

export function buildTelemetry(state: WorldState): Telemetry {
  const totalPopulation = state.settlements.reduce((sum, s) => sum + s.population, 0);
  const avgLegitimacy =
    state.settlements.length === 0
      ? 0
      : state.settlements.reduce((sum, s) => sum + s.legitimacy, 0) / state.settlements.length;

  return {
    tick: state.tick,
    eventCount: state.events.length,
    avgLegitimacy,
    totalPopulation,
  };
}

