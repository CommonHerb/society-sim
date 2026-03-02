# LLM Collaboration Protocol

Use this request format for major tasks to maximize output quality:

## Required Request Fields
- `Objective`: what outcome is required.
- `Constraints`: technical and policy limits.
- `Done Criteria`: explicit pass/fail conditions.
- `Do Not Change`: files/systems that must remain untouched.

## Recommended Fields
- `Priority`: urgency and sequencing.
- `Review Lens`: correctness/performance/architecture/etc.
- `Validation Required`: which gates/tests to run before handoff.

## Example Template
```
Objective:
Constraints:
Done Criteria:
Do Not Change:
Priority:
Validation Required:
```

## Operating Agreement
- No hidden assumptions on critical decisions.
- All non-trivial changes include rationale.
- Any blocker is surfaced with concrete options.
- Quality gates are treated as contract, not suggestion.

