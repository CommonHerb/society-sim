# ADR-004: Institutions as Bounded-Rational Policy Engines

## Status
Accepted

## Context
Perfectly rational agents with full state access produce sterile and unrealistic outcomes in social simulations.

## Decision
- Institutions are implemented as bounded policy engines.
- Policies optimize under local constraints and imperfect inputs.
- Policies emit explainable action traces each tick.

## Consequences
- Positive:
  - More plausible emergent behavior.
  - Better narrative and governance dynamics.
- Negative:
  - Calibration complexity increases.
  - Potential for policy pathology if constraints are poorly tuned.

## Guardrails
- Policy outputs are bounded and schema-validated.
- Policy explainability is required for operator tooling.
