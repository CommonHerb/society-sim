# ADR-003: Ground Truth and Reported Truth Separation

## Status
Accepted

## Context
The simulation's core thesis depends on information asymmetry. If actors receive raw truth, political and social dynamics collapse into optimization behavior.

## Decision
- Maintain separate first-class models for ground truth and reported truth.
- Reports carry provenance, latency, and distortion metadata.
- Decision policies consume reported truth only, unless explicitly privileged.

## Consequences
- Positive:
  - Enables realistic misinformation, partial knowledge, and trust dynamics.
  - Supports narrative conflict without breaking causality.
- Negative:
  - Additional storage and processing overhead.
  - Harder debugging unless tooling is strong.

## Guardrails
- Truth/report divergence metrics are mandatory telemetry.
- Any direct truth access in policy layer must be audited and justified.
