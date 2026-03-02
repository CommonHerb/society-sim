# ADR-006: Versioned Externalized Balancing Parameters

## Status
Accepted

## Context
Hardcoded balancing values are operationally unsafe, non-auditable, and prevent disciplined experimental tuning.

## Decision
- All balancing and policy coefficients are externalized into versioned parameter sets.
- Runs pin a parameter version fingerprint.
- Parameter rollout supports staged deployment and rollback.

## Consequences
- Positive:
  - Rapid iteration with traceability.
  - Strong experiment reproducibility.
- Negative:
  - Requires robust parameter governance tooling.

## Guardrails
- Parameter changes require author, rationale, and change summary.
- Canary runs required before global parameter adoption.
