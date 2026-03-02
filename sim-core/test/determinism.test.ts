import test from "node:test";
import assert from "node:assert/strict";

import { runTick } from "../src/tick.js";
import { SimulationParams, WorldState } from "../src/types.js";

const baseState: WorldState = {
  tick: 0,
  settlements: [
    {
      id: "s-1",
      regionId: "r-1",
      factionControl: "f-1",
      population: 100,
      foodStock: 80,
      goodsStock: 60,
      securityCapacity: 0.8,
      extractionRate: 0.2,
      tradeConnectivity: 0.7,
      borderExposure: 0.4,
      infrastructureIndex: 0.5,
      environmentalStress: 0.3,
      legitimacy: 0.6,
    },
  ],
  institutions: [
    {
      id: "i-1",
      settlementId: "s-1",
      type: "council",
      capacity: 0.8,
      credibility: 0.7,
      captureRisk: 0.2,
      agendaVector: [0.5, 0.5],
      resourceAccess: 0.6,
    },
  ],
  blocs: [
    {
      id: "b-1",
      settlementId: "s-1",
      roleMix: [0.4, 0.3, 0.3],
      grievanceIndex: 0.2,
      complianceIndex: 0.8,
      trustWeights: { "i-1": 0.7 },
    },
  ],
  beliefGraph: {
    edges: [
      {
        from: "i-1",
        to: "b-1",
        trustWeight: 0.7,
        throughput: 0.8,
        latencyTicks: 1,
        distortionBias: 0,
      },
    ],
  },
  events: [],
};

const params: SimulationParams = {
  version: "v1",
  foodConsumptionPerCapita: 0.4,
  baselineFoodProduction: 30,
  baselineGoodsProduction: 12,
  securityDecay: 0.02,
};

test("runTick is deterministic for same state, params, seed", () => {
  const seed = 123456;
  const a = runTick(baseState, params, seed);
  const b = runTick(baseState, params, seed);
  assert.deepEqual(a, b);
});

