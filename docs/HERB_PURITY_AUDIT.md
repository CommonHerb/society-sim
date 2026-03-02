# HERB Purity Audit

As of: March 2, 2026  
Audit target: `C:\Users\Ben\Desktop\society-sim\handoff\incoming-pass\HERB - Copy`

## Scope and Method
- Scope includes tracked source/tooling files in the handoff repo (`git ls-files`).
- Purity definition used for code files:
  - Allowed: `.herb`, `.asm`, `.inc`, `.ld`
  - Violations: `.py`, `.c`, `.h`, `.json`, `.sh`

## Executive Verdict
- **Current state is not HERB-pure.**
- Tracked code purity is **32.30%**.
- Build and verification paths are still dependent on Python and JSON.

## Measured Results
- `TRACKED_CODE_TOTAL=161`
- `TRACKED_CODE_PURE=52`
- `TRACKED_CODE_IMPURE=109`
- `TRACKED_CODE_PURITY_PCT=32.30`

Impure tracked code by extension:
- `.py`: 78
- `.json`: 18
- `.c`: 10
- `.sh`: 2
- `.h`: 1

Impure tracked code by top-level path:
- `src`: 90
- `programs`: 18
- `boot`: 1

## Critical Findings
1. Build pipeline is Python-driven.
  - Evidence: [makefile](C:/Users/Ben/Desktop/society-sim/handoff/incoming-pass/HERB%20-%20Copy/boot/makefile)
  - Current build calls `py ../src/herb_compile.py` and Python one-liners for image assembly/padding.

2. Program source of truth is still dual-format (`.herb` + `.herb.json`).
  - Evidence: `programs/*.herb` and `programs/*.herb.json` co-exist.
  - This duplicates semantics and keeps JSON in the critical path.

3. Runtime/toolchain legacy in C and Python remains tracked.
  - Evidence: `src/herb_runtime*.c`, `src/herb_freestanding.c`, and many Python runtime/compiler files.

4. Purity boundary is not enforced globally.
  - Existing guarding in `society-sim` only targets a narrow namespace and does not hard-fail repository-wide impurity.

## Positive Signals
- In-kernel compiler direction is real and strong.
  - Evidence from commit history in handoff repo:
    - `c318d04` ("In-kernel HERB compiler: assembly compiles .herb source to binary")
- Assembly-heavy kernel/runtime direction is already advanced.
  - Evidence:
    - `28f448e` ("HERB OS is assembly + HERB only. Zero C, zero GCC.")

## Risk if Left Unchanged
- Architectural contradiction: stated purity vs actual toolchain.
- Long-term maintainability risk from dual truth formats and split runtimes.
- Regression risk: future work can silently reintroduce non-pure dependencies.

