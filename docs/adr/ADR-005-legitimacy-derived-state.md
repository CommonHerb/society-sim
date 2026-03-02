# ADR-005: Legitimacy as Emergent Derived State

## Status
Accepted

## Context
Directly setting legitimacy as a free variable creates gamey behavior and breaks the simulation thesis that authority is socially constructed through belief, performance, and institutional trust.

## Decision
- Legitimacy is a derived state recomputed every tick.
- Inputs include trust topology, institutional credibility, grievance load, and perceived material stability.
- Policy modules cannot directly write legitimacy.

## Consequences
- Positive:
  - Legitimacy responds to social dynamics instead of arbitrary tuning.
  - Better causal interpretability for regime changes.
- Negative:
  - More coupling between subsystems and calibration burden.

## Guardrails
- Any code path attempting direct legitimacy mutation fails validation.
- Legitimacy sensitivity tests are mandatory in CI.
