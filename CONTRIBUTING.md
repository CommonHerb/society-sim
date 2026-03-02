# Contributing

This project is operated as a high-rigor simulation program.

## Non-Negotiable Engineering Rules
- Determinism first: any non-deterministic behavior in the core is a defect.
- Causality first: every visible output must map to explicit causes.
- Derivation integrity: derived state is computed, never manually patched.
- Reproducibility first: every experiment pins seed and parameter version.

## Workflow
1. Open issue with problem statement and acceptance criteria.
2. Propose implementation and risk notes.
3. If decision is architectural, submit ADR update.
4. Implement behind tests.
5. Run required checks and attach evidence.
6. Merge only when all quality gates pass.

## Required Checks Before Merge
- Unit tests pass.
- Property and invariant tests pass.
- Replay determinism tests pass.
- Lint/format checks pass.
- If behavior changed, update docs and changelog.

## Commit Conventions
Use prefixes:
- `sim:` core simulation logic
- `policy:` institution behavior
- `infra:` persistence/telemetry/ops
- `ui:` operator interface
- `docs:` specifications and architecture
- `test:` verification harnesses

Example: `sim: add hazard cooldown normalization`

## Pull Request Requirements
PR description must include:
- what changed
- why it changed
- invariants touched
- deterministic replay impact
- risk and rollback notes
- evidence (test outputs or benchmark deltas)

## Code Review Standards
Reviewers must evaluate:
- correctness under edge conditions
- invariant safety
- deterministic integrity
- coupling discipline
- observability and debuggability

## Spec and ADR Discipline
- `SIM_SPEC.md` changes require explicit version bump rationale.
- Tick-order changes are major version changes.
- ADR updates must state tradeoffs and rejected alternatives.

## Performance Standards
- Avoid superlinear algorithms in settlement-level loops.
- Document complexity of any new hot-path function.
- Add profiling evidence for optimization claims.

## Security and Safety
- No privileged bypasses in operator tooling.
- All mutable operations in admin surfaces must be auditable.

