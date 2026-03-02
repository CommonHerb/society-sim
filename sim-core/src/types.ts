export type Id = string;

export type InstitutionType =
  | "military"
  | "market"
  | "council"
  | "press"
  | "clergy"
  | "judicial";

export interface Settlement {
  id: Id;
  regionId: Id;
  factionControl: Id;
  population: number;
  foodStock: number;
  goodsStock: number;
  securityCapacity: number;
  extractionRate: number;
  tradeConnectivity: number;
  borderExposure: number;
  infrastructureIndex: number;
  environmentalStress: number;
  legitimacy: number;
}

export interface Institution {
  id: Id;
  settlementId: Id;
  type: InstitutionType;
  capacity: number;
  credibility: number;
  captureRisk: number;
  agendaVector: number[];
  resourceAccess: number;
}

export interface PopulationBloc {
  id: Id;
  settlementId: Id;
  roleMix: number[];
  grievanceIndex: number;
  complianceIndex: number;
  trustWeights: Record<Id, number>;
}

export interface BeliefEdge {
  from: Id;
  to: Id;
  trustWeight: number;
  throughput: number;
  latencyTicks: number;
  distortionBias: number;
}

export interface BeliefGraph {
  edges: BeliefEdge[];
}

export interface EventRecord {
  id: Id;
  tick: number;
  eventType: string;
  severity: number;
  triggerFactors: Record<string, number>;
  affectedEntities: Id[];
  groundTruthPayload: Record<string, unknown>;
  reportedVariants: Array<Record<string, unknown>>;
}

export interface WorldState {
  tick: number;
  settlements: Settlement[];
  institutions: Institution[];
  blocs: PopulationBloc[];
  beliefGraph: BeliefGraph;
  events: EventRecord[];
}

export interface SimulationParams {
  version: string;
  foodConsumptionPerCapita: number;
  baselineFoodProduction: number;
  baselineGoodsProduction: number;
  securityDecay: number;
}

export interface Telemetry {
  tick: number;
  eventCount: number;
  avgLegitimacy: number;
  totalPopulation: number;
}

export interface TickResult {
  state: WorldState;
  deltas: EventRecord[];
  telemetry: Telemetry;
}

