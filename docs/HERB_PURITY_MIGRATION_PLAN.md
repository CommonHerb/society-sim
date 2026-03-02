# HERB Purity Migration Plan

Objective: reach and sustain HERB Purism (`.herb` + `.asm` only for implementation paths) without destabilizing active OS progress.

As of: March 2, 2026

## Principles
- No new non-pure code enters the active line.
- Replace mechanism, do not stack adapters.
- Preserve bootability and deterministic behavior at each phase.
- Cutover by bounded vertical slices, not broad half-migrations.

## Target End State
- Program logic source of truth: `.herb` only.
- Runtime/mechanism boundary: `.asm` only.
- No Python/C/JSON/Shell dependencies in active build or test-critical paths.
- Global purity gate blocks violations at commit/PR time.

## Phase Plan

## Phase 0: Freeze and Boundary Hardening
Deliverables:
- Mark current handoff as `reference snapshot`.
- Create active purity branch (separate from ongoing parallel HERB work).
- Add global purity scanner for tracked files.

Acceptance:
- Any tracked `.py`, `.c`, `.h`, `.json`, `.sh` in active implementation paths fails CI.

## Phase 1: Toolchain Decoupling (No Python in Build)
Deliverables:
- Replace Python compile steps in `boot/makefile`.
- Remove Python one-liner usage for image assembly/padding in build.
- Build uses only toolchain binaries + assembly + HERB artifacts.

Acceptance:
- Clean build succeeds with Python uninstalled.
- `make`, `make run`, and test target execute without invoking Python.

## Phase 2: Program Representation Cutover (`.herb`-only)
Deliverables:
- Remove `.herb.json` from active path.
- Compile from `.herb` source using assembly compiler path.
- Ensure kernel main program is compiled from source at boot/load boundary or prebuilt by assembly tool path only.

Acceptance:
- `programs/*.herb.json` not required for build or runtime.
- Boot path validates source-compiled binaries.

## Phase 3: Runtime Purge (Python/C Legacy Removal from Active Core)
Deliverables:
- Retire Python runtime/compiler modules from active `src` path.
- Retire C runtime artifacts from active `src` path.
- Keep legacy content only in explicit archival namespace (non-shipping).

Acceptance:
- Active `src`/`boot`/`programs` contain only `.herb`, `.asm`, `.inc`, `.ld`, and non-code docs.
- No runtime-critical references to Python/C symbols remain.

## Phase 4: Test System Purification
Deliverables:
- Replace Python/Shell test harnesses with HERB/ASM-native or in-kernel self-tests.
- Standardize deterministic test vectors executable without Python.

Acceptance:
- Determinism, boot, and policy tests run without Python or shell scripts.

## Phase 5: Governance Lock
Deliverables:
- Global purity CI required check.
- Branch rules require purity + determinism for merge.
- Written exception policy set to "none" for implementation code.

Acceptance:
- Branch cannot merge impurity regressions.

## Dependency Order (Non-Negotiable)
1. Phase 0 before all.
2. Phase 1 before Phase 2 (no point cutting format while Python build remains).
3. Phase 2 before Phase 3 (remove legacy only after `.herb` source is authoritative).
4. Phase 4 after core toolchain is pure.
5. Phase 5 once checks are stable and trusted.

## Migration Risk Controls
- Keep bootable checkpoint tags per phase.
- Maintain deterministic fixtures at each cut.
- Add rollback note for each PR before merge.
- For each removal, map exact replacement path first.

## Strict Definition of Done
- Active implementation line has zero tracked `.py`, `.c`, `.h`, `.json`, `.sh`.
- Build/test-critical path has zero runtime invocation of non-HERB/ASM code.
- CI gates enforce purity and determinism by default.

