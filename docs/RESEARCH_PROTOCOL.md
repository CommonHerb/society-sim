# Research and Validation Protocol

## Objective
Validate that behaviors emerge from model structure rather than accidental artifacts.

## Experimental Contract
Every experiment must define:
- hypothesis
- seed suite
- parameter version
- observed metrics
- pass/fail criterion

## Core Validation Batteries
- Determinism battery:
  - identical replay across environments
- Stability battery:
  - long-run tick survival without invariant failures
- Regime diversity battery:
  - no single-attractor dominance across broad seed suite
- Pathology battery:
  - detect lock-in, stagnation, runaway domination, misinformation capture
- Narrative coherence battery:
  - chronicle traces map to causal event IDs

## Metrics (v1)
- regime entropy
- settlement churn rate
- conflict concentration index
- institutional credibility variance
- truth/report divergence score
- legitimacy volatility index

## Rejection Criteria
Reject parameter set if any condition holds:
- deterministic mismatch on replay
- invariant violations in validation suite
- chronic event starvation or deterministic oscillation
- irreversible single-faction lock-in across majority of seeds

## Reporting
Each experiment emits:
- machine-readable run report
- short analyst summary
- recommendation: adopt, iterate, or reject

