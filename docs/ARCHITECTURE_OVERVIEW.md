# Architecture Overview

## Core Idea
The simulation is a layered causal machine:
1. Material substrate (resources, population, exposure)
2. Institutional action (bounded policy outputs)
3. Event ecology (hazard-driven state transitions)
4. Information ecology (distorted reporting and belief propagation)
5. Legitimacy and regime behavior (derived social response)

## Layer Responsibilities
- Material layer: maintains feasibility constraints and pressure fields.
- Institution layer: produces actions under constraints and partial information.
- Event layer: resolves stochastic macro transitions from hazards.
- Information layer: separates truth from reports and updates trust network beliefs.
- Legitimacy layer: computes social authority from observed and believed conditions.

## Runtime Components
- `kernel`: deterministic tick orchestrator
- `state`: typed data model and schema versioning
- `hazard`: event hazard evaluation and sampling
- `policy`: institution policy engines
- `belief`: propagation and trust-graph updates
- `chronicle`: narrative artifact generation and indexing
- `telemetry`: metrics and anomaly signals

## Data Surfaces
- Ground truth log: canonical factual state transitions
- Report stream: source-specific narratives with distortion metadata
- Chronicle view: user/operator-readable history with causal links

## Design Constraints
- No cross-layer shortcuts around contracts.
- No direct write access to derived state.
- No hidden global mutable state in kernel.

## Scale Strategy
- Use sparse graph representations for belief propagation.
- Partition simulation regions for batch execution.
- Bound per-tick work by explicit complexity limits.

## Failure Strategy
- Hard failures stop the run and emit reproducible artifact bundles.
- Soft failures trigger telemetry alerts and investigation workflows.

