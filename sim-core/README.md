# sim-core

Deterministic simulation kernel and core contracts.

## Scope
- canonical types and state contracts
- deterministic tick orchestration
- RNG stream partitioning
- invariant validation
- telemetry emission

## Development Notes
- Core tick logic is intentionally minimal at this stage; structure is locked first.
- All subsystem execution order must follow `docs/SIM_SPEC.md`.
- Any change to tick order requires spec revision and migration rationale.

