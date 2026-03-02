# Validation Cadence

## Cadence
- `Per-change` (pre-merge): HERB-only enforcement + determinism gate.
- `Weekly`: full validation battery.
- `Release-candidate`: extended long-horizon and pathology sweeps.

## Per-Change Gates
1. `scripts/enforce-herb-only.ps1`
2. `scripts/run-determinism-gate.ps1`

A change is not eligible for merge if either fails.

## Weekly Battery
Run `scripts/run-weekly-validation.ps1` each week.

Battery covers:
- Determinism
- Stability/fixpoint behavior
- Information semantics (negation/aggregation baseline)

## Release Candidate Additions
- Long-horizon runs with archived seed suite.
- Pathology detection report:
  - lock-in
  - stagnation
  - event starvation
  - misinformation capture
- Causal-trace spot audit on chronicle outputs.

## Evidence Retention
- Save raw logs and test output under `research/validation/YYYY-MM-DD/`.
- Record summary in `CHANGELOG_SIM.md` under `Validated`.

