# SIM_SPEC

## 1. Purpose
This specification defines the canonical state model, deterministic tick contract, invariants, and failure semantics for the autonomous society simulation program.

Normative keywords (`MUST`, `SHOULD`, `MAY`) are used in RFC sense.

## 2. Core Principles
- The simulation `MUST` run meaningfully without active players.
- Outcomes `MUST` emerge from pressure and policy interactions, not scripts.
- Information `MUST` be asymmetric; no actor has perfect truth access.
- The engine `MUST` be deterministic under fixed input and seed.
- Every visible narrative artifact `MUST` be causally traceable.

## 3. Canonical Time Model
- Base unit: `tick`.
- Runtime profiles:
  - `realtime`: 1 tick = 1 simulated hour
  - `batch`: 1 tick = 1 simulated day
- Tick durations `MUST` be profile-configured but deterministic within a run.

## 4. Canonical Entity Model

## 4.1 Settlement
Required fields:
- `id: string`
- `region_id: string`
- `faction_control: string`
- `population: int >= 0`
- `food_stock: float >= 0`
- `goods_stock: float >= 0`
- `security_capacity: float >= 0`
- `extraction_rate: float in [0,1]`
- `trade_connectivity: float in [0,1]`
- `border_exposure: float in [0,1]`
- `infrastructure_index: float in [0,1]`
- `environmental_stress: float in [0,1]`
- `legitimacy: float in [0,1]` (derived; read-only in update stage)

## 4.2 Institution
Required fields:
- `id: string`
- `settlement_id: string`
- `type: enum(military, market, council, press, clergy, judicial)`
- `capacity: float in [0,1]`
- `credibility: float in [0,1]`
- `capture_risk: float in [0,1]`
- `agenda_vector: vector<float>` (fixed dimensionality per version)
- `resource_access: float in [0,1]`

## 4.3 Population Bloc (Aggregate Agent)
Required fields:
- `id: string`
- `settlement_id: string`
- `role_mix: vector<float>`
- `grievance_index: float in [0,1]`
- `compliance_index: float in [0,1]`
- `trust_weights: map<institution_id,float in [0,1]>`

## 4.4 Belief Graph
- Nodes: institutions + population blocs.
- Edges:
  - `trust_weight in [0,1]`
  - `throughput in [0,1]`
  - `latency_ticks >= 0`
  - `distortion_bias in [-1,1]`

## 4.5 Event
Required fields:
- `id: string`
- `tick: int`
- `event_type: string`
- `severity: float in [0,1]`
- `trigger_factors: map<string,float>`
- `affected_entities: list<string>`
- `ground_truth_payload: json`
- `reported_variants: list<json>`

## 5. Deterministic Tick Contract
Signature:
- `runTick(state_t, params_v, seed, tick_index) -> state_t+1, deltas, telemetry`

`runTick` `MUST` execute in this exact order:
1. Material update (food, goods, security, trade, strain).
2. Institutional capacity and constraint update.
3. Hazard evaluation and stochastic sampling.
4. Ground-truth event application.
5. Report generation (distortion/lag/suppression).
6. Belief propagation.
7. Legitimacy derivation.
8. Frontier transitions (expansion/decay/reversion).
9. Chronicle artifact generation.
10. Delta emission + optional snapshot.

Any reordering `MUST` trigger major spec version bump.

## 6. RNG Partitioning
- RNG streams `MUST` be partitioned by subsystem:
  - `rng_material`
  - `rng_hazard`
  - `rng_institution`
  - `rng_reports`
  - `rng_frontier`
- Introducing a new stream `MUST` not perturb existing stream sequences.

## 7. Invariants (Release Blocking)
These invariants `MUST` hold at every tick:
1. All stocks (`food_stock`, `goods_stock`) remain non-negative.
2. Population remains integer and non-negative.
3. Probabilistic fields remain within `[0,1]`.
4. No settlement has missing mandatory institution set.
5. Belief graph edge weights remain bounded.
6. Event references point to existing entity IDs.
7. Derived legitimacy is recomputed each tick and never directly mutated by policy code.
8. Frontier graph remains connected within configured cluster tolerance.

## 8. Hazard Function Contract
- Each event type has hazard:
  - `h_e = f(pressures, context, cooldown, memory)`
- `h_e` output `MUST` be in `[0,1]`.
- No event type may hardcode fixed periodic triggering.
- Cooldowns `MUST` be explicit and inspectable.

## 9. Legitimacy Derivation Contract
- Legitimacy `L_s` for settlement `s` is computed as:
  - weighted confidence of blocs in governing institutions
  - discounted by grievance and unresolved conflict load
  - adjusted by perceived performance of material stability
- `L_s` is derived state and `MUST` be overwritten every tick.

## 10. Failure Semantics
- Hard failure:
  - Invariant violation.
  - Non-deterministic replay mismatch.
  - Corrupted delta chain.
- Soft failure:
  - Pathological regime trigger (runaway dominance, frozen event ecology).
  - Telemetry anomaly without invariant break.

Hard failures `MUST` stop progression and emit crash artifact bundle:
- seed
- tick
- parameter version
- minimal state diff
- replay command

## 11. Persistence and Replay
- Every tick emits:
  - immutable delta record
  - telemetry snapshot
  - causal links for narrative artifacts
- Snapshot cadence default:
  - every 100 ticks in realtime
  - every 30 ticks in batch mode

Replay `MUST` reconstruct byte-identical states for deterministic builds.

## 12. Parameter Governance
- Parameter sets are versioned (`params_v`).
- A run `MUST` pin one parameter version unless explicit migration event occurs.
- Parameter changes `MUST` be auditable with author, timestamp, rationale.

## 13. Validation Protocol Hooks
Engine `MUST` expose:
- regime classification metrics
- diversity score across seeds
- narrative coherence score
- truth-report divergence metrics

These metrics are mandatory inputs to release gates.

## 14. Versioning
- `SIM_SPEC` version format: `major.minor.patch`
- `major`: breaking tick order/schema/invariant semantics
- `minor`: additive fields/events that preserve determinism contract
- `patch`: clarifications and non-semantic corrections

