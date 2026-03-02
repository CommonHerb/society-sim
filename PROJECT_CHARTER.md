# Project Charter

## Name
Society Simulation Program (HERB-First)

## Scope
Build a persistent autonomous society simulation whose primary artifact is emergent historical behavior, not scripted gameplay progression.

## Non-Negotiables
- Core simulation logic is authored in `.herb`.
- Runtime boundary is `.asm` only when required.
- No scripted inevitabilities for war/collapse/growth.
- Information asymmetry is first-class.
- Legitimacy is derived, never directly set.
- Deterministic replay is mandatory for fixed inputs.

## Primary Success Criteria
- The world evolves meaningfully with no active player intervention.
- Distinct regimes emerge across seeds/parameter sets.
- Pathologies are detectable and mitigable, not hidden.
- Historical output is causally traceable and human-legible.

## Release-Blocking Quality Gates
1. Deterministic replay suite passes.
2. Invariant suite passes across long-horizon runs.
3. Pathology suite shows no irreversible lock-in by default.
4. Chronicle causal-link coverage passes threshold.
5. Recovery and rollback procedures are verified.

## Boundaries
- Authoritative workspace: `C:\Users\Ben\Desktop\society-sim`.
- Legacy/experimental artifacts outside this root are reference-only.
- Active simulation implementation path:
  - `HERB/src/society`
  - `HERB/boot/society`
  - `HERB/programs/society`

