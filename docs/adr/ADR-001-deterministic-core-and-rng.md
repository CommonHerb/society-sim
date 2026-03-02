# ADR-001: Deterministic Core and RNG Partitioning

## Status
Accepted

## Context
The simulation must support exact replay, scientific validation, regression analysis, and crash reproduction. Non-determinism breaks all of these.

## Decision
- The core engine will be deterministic for fixed `state`, `params`, `seed`, and `tick`.
- RNG is partitioned into subsystem streams.
- Subsystem stream ordering is fixed by `SIM_SPEC`.

## Consequences
- Positive:
  - Reproducible debugging and validation.
  - Strict regression testing possible.
- Negative:
  - Higher implementation discipline.
  - Additional care required when adding new stochastic subsystems.

## Guardrails
- Replay test suite is release-blocking.
- Any change that perturbs deterministic outputs requires explicit migration notes.

