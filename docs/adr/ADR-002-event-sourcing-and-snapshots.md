# ADR-002: Event-Sourced History with Periodic Snapshots

## Status
Accepted

## Context
A long-running simulation needs causal auditability and efficient recovery. Pure snapshots lose causality; pure logs can become expensive to recover.

## Decision
- Persist immutable per-tick deltas (event-sourced log).
- Persist periodic full-state snapshots.
- Recovery uses latest snapshot + subsequent deltas.

## Consequences
- Positive:
  - Full causal trace and historical explainability.
  - Fast recovery and replay flexibility.
- Negative:
  - Requires storage lifecycle management.
  - More complex persistence and tooling.

## Guardrails
- Delta chain integrity checks run continuously.
- Snapshot cadence is profile-driven and configurable.
