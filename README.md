# Society Simulation Program

Autonomous, persistent society simulation focused on emergence under constraint:
- bounded information
- material pressure
- institutional behavior
- legitimacy as social belief

This repository is structured as a production program, not a prototype.

## Program Objectives
- Build a world that evolves meaningfully with zero active users.
- Model tendencies, not predetermined outcomes.
- Preserve causal traceability from state changes to narrative output.
- Guarantee deterministic replay for scientific validation and debugging.

## Repository Structure
- `docs/` canonical specifications, architecture, ADRs, review templates
- `backlog/` issue import and execution planning artifacts
- `research/` source material and synthesis notes
- `scripts/` automation scripts for project operations
- `sim-core/` deterministic simulation runtime and test harness
- `sim-data/` data contracts, migrations, and snapshot/delta formats (planned)
- `sim-ui/` operator console and chronicle surfaces (planned)

## Source of Truth Hierarchy
1. `docs/SIM_SPEC.md`
2. `docs/adr/*.md`
3. `docs/SIMULATION_PROGRAM_MASTERPLAN.md`
4. Implementation code under `sim-core/`

If implementation conflicts with spec, implementation is wrong.

## Governance and Gates
- Charter: [PROJECT_CHARTER.md](C:/Users/Ben/Desktop/society-sim/PROJECT_CHARTER.md)
- Workspace policy: [WORKSPACE_POLICY.md](C:/Users/Ben/Desktop/society-sim/WORKSPACE_POLICY.md)
- Decision index: [DECISIONS.md](C:/Users/Ben/Desktop/society-sim/DECISIONS.md)
- Simulation changelog: [CHANGELOG_SIM.md](C:/Users/Ben/Desktop/society-sim/CHANGELOG_SIM.md)
- Validation cadence: [VALIDATION_CADENCE.md](C:/Users/Ben/Desktop/society-sim/docs/VALIDATION_CADENCE.md)
- LLM collaboration protocol: [LLM_COLLAB_PROTOCOL.md](C:/Users/Ben/Desktop/society-sim/docs/LLM_COLLAB_PROTOCOL.md)

## HERB-Only Enforcement
Active simulation implementation namespace:
- `HERB/src/society`
- `HERB/boot/society`
- `HERB/programs/society`

Run guard locally:
```powershell
./scripts/enforce-herb-only.ps1
```

Run global purity gate locally:
```powershell
./scripts/enforce-herb-purity-global.ps1
```

Run determinism gate locally:
```powershell
./scripts/run-determinism-gate.ps1
```

Run weekly validation battery locally:
```powershell
./scripts/run-weekly-validation.ps1
```

## Design Standards
- No hidden magic constants in core logic.
- No direct writes to derived fields (especially legitimacy).
- No non-deterministic behavior in tick pipeline.
- No feature acceptance without falsification tests.

## Initial Execution Path
1. Finalize and ratify `SIM_SPEC.md` with domain owners.
2. Stand up CI with replay tests and invariant gates.
3. Implement kernel milestones (`SIM-001` to `SIM-008`).
4. Add institution policy engines and information ecology.
5. Harden for long-run stability, scale, and observability.

## Quality Gate Definition
Release candidate is blocked unless all are true:
- deterministic replay passes on benchmark seed suite
- no invariant violations across 100k ticks
- no hard lock-in pathologies on validation scenarios
- chronicle artifacts are causally linked and inspectable
