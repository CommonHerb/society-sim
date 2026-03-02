# HERB Purity PR Checklist

Use this sequence in order. Do not parallelize steps that alter build contract.

## PR-001: Global Purity Gate
Goal:
- Add repository-wide tracked-file purity checker.

Checklist:
- Add script to fail on tracked `.py`, `.c`, `.h`, `.json`, `.sh` in active implementation paths.
- Add required CI workflow check: `purity-global`.
- Add local pre-merge command in docs.

Acceptance:
- Intentional impurity file in active path fails CI.

## PR-002: Build Path Python Removal
Goal:
- Remove Python invocation from `boot/makefile`.

Checklist:
- Replace `py ../src/herb_compile.py ...` path.
- Replace Python image concat/pad commands.
- Keep same output image contract and boot behavior.

Acceptance:
- Build and run succeed with no Python executable available.

## PR-003: `.herb.json` Cutover
Goal:
- Remove JSON from active program compilation path.

Checklist:
- Ensure each program compiles from `.herb` source.
- Remove JSON dependency from build rules.
- Preserve byte-equivalence checks where applicable.

Acceptance:
- `programs/*.herb.json` no longer required to build/boot.

## PR-004: Source Runtime Purge (Python)
Goal:
- Move legacy Python runtime/compiler/test helpers out of active `src` path.

Checklist:
- Identify active vs archival Python files.
- Remove active references/imports.
- Preserve historical artifacts in archive namespace only.

Acceptance:
- Active runtime path has no Python modules.

## PR-005: Source Runtime Purge (C)
Goal:
- Remove active C runtime files from `src`.

Checklist:
- Verify assembly equivalent exists and is live.
- Remove C headers/sources from active path.
- Verify no linker/build references remain.

Acceptance:
- Active runtime path has no C/H files.

## PR-006: Test Harness Purity
Goal:
- Replace Python/Shell test harnesses in merge-critical checks.

Checklist:
- Implement assembly/HERB-native deterministic tests.
- Move legacy Python/Shell tests to archive/non-gating lane.

Acceptance:
- Required CI checks execute without Python/Shell.

## PR-007: Contract Lock and Documentation
Goal:
- Make purity contract explicit and enforceable.

Checklist:
- Update charter and build docs to HERB/ASM-only wording.
- Document "no exception" policy in repo governance.
- Confirm branch protection requires purity + determinism checks.

Acceptance:
- Purity policy is both documented and technically enforced.

## Per-PR Evidence Requirements
- What changed.
- Why replacement is equivalent or better.
- Determinism impact statement.
- Build/boot/test evidence.
- Rollback plan.

