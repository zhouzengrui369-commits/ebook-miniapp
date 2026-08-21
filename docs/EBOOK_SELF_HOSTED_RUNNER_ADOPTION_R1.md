# EBOOK_SELF_HOSTED_RUNNER_ADOPTION_R1

> Repository: `zhouzengrui369-commits/ebook-miniapp`  
> Program: `ECOSYSTEM-CODEX-HARNESS-R1`  
> Capability: `github-self-hosted-runner@0.1.0-proposed`  
> State: `QUEUED_OPTIONAL / PLANNING_ONLY`  
> Owner: ebook-miniapp Project PM  
> Central capability: `zhouzengrui369-commits/knowme-ecosystem@fd01ef7619a31b7ffca5dd2205a2e31a96fac834`  
> Parent PM execution plane: `chatgpt-parent-pm#12` / `chatgpt-parent-pm#14`  
> Harness plan: [`EBOOK_CODEX_HARNESS_R1.md`](./EBOOK_CODEX_HARNESS_R1.md)

## 1. Decision

Self-hosted Runner adoption is optional. Do not implement it merely for architectural uniformity.

Activation requires one named engineering or reader-value use case that materially benefits from exact-SHA local execution on the Owner Mac mini.

Valid terminal state:

```text
NOT_ACTIVATED_NO_CUSTOMER_OR_ENGINEERING_VALUE
```

## 2. Role boundary

The Runner may provide local build/test/offline/mobile-support technical evidence. It is not the reading knowledge engine, digital twin, automatic reading-history collector, Story Atlas authority, Product Experience reviewer or release system.

Codex Harness may be used only as an optional engineering worker inside an authorized Runner request.

## 3. Allowed R1 uses

- local source/test/build for reader, TTS or AI QA;
- public-domain or synthetic content fixtures;
- offline/local engine integration tests;
- bounded mobile or desktop packaging diagnostics;
- exact artifact/process/evidence receipts;
- read-only diagnostics.

## 4. Forbidden R1 uses

- default capture of page turns, playback, microphone, location or device activity;
- complete copyrighted/private books in ordinary Runner/Harness context or public evidence;
- full personal reading history;
- treating Runner/Harness as reading knowledge truth;
- automatic contribution to KnowMe;
- Story Atlas/3D without a named comprehension task;
- direct public PR/fork execution on the Mac mini;
- direct main, merge or release;
- silent model/provider/network fallback.

## 5. Policy

```text
CODING_PROFILE=Luna/xhigh
PRODUCT_EXPERIENCE_PROFILE=Sol/xhigh
SILENT_FALLBACK=FORBIDDEN
INITIAL_DATA=PUBLIC_DOMAIN_OR_SYNTHETIC_D0
NETWORK=DENY_BY_DEFAULT
MAX_APPROVAL=A2_TEST_BUILD
AMBIENT_CAPTURE=NO
COPYRIGHT_PRIVATE_SOURCE_CONTEXT=NO
FRESH_WORKTREE_TASK_EVIDENCE_ROOT=REQUIRED
```

## 6. Activation prerequisites

- [ ] live reader/TTS/AI QA/mobile/offline/Runtime truth restored;
- [ ] named use case and measurable value;
- [ ] Human Owner accepts activation;
- [ ] central Runner registration topology and Gateway accepted;
- [ ] fresh Runner health/toolchain receipt;
- [ ] copyright/privacy/test-data boundary;
- [ ] repository-local GOAL/TASK/PLAN/RESULT/EVIDENCE/commands.log;
- [ ] exact source SHA/tree/paths/commands/artifacts;
- [ ] rollback and no-capture/no-release boundary.

Until then:

```text
EBOOK_RUNNER_STATE=QUEUED_OPTIONAL
```

## 7. Optional milestones

### ER0 — Value and activation Gate

Define named use case, why local Runner is needed, expected value, copyright/privacy boundary, exact acceptance and stop condition.

If value is not demonstrated, close as `NOT_ACTIVATED_NO_CUSTOMER_OR_ENGINEERING_VALUE`.

### ER1 — Request, profile and public fixture

Create exact LocalExecutionRequest with public-domain/synthetic D0 fixture, RunnerProfile, allowed/protected paths, commands, network, artifacts, claim ceiling and rollback.

### ER2 — Read-only or build Pilot

Run one low-risk exact-SHA source/test/build task with fresh worktree/task/evidence roots, no private content, complete receipt and no product claim escalation.

### ER3 — Optional named product technical Gate

Only for a Human Owner-approved reader journey, such as local TTS/offline QA/mobile build. Technical Runner evidence remains separate from independent product experience.

### ER4 — Failure recovery and Owner decision

Inject one bounded failure; Web ChatGPT Parent PM creates GitHub successor; no automatic Codex Runner repair. Human Owner decides controlled adoption or termination.

## 8. Codex Harness relationship

```text
LocalExecutionRequest
→ Runner outer authority
→ optional Luna/xhigh Harness session
→ nested Harness receipt
→ outer Runner ExecutionReceipt
```

Harness cannot widen data/copyright/network/write scope or repair Runner authority automatically.

## 9. Evidence contract

Required:

- central Runner/Harness pins;
- RunnerProfile/request hashes;
- source/final SHA/tree;
- public-domain/synthetic fixture manifest;
- copyright/privacy scan;
- commands/checks/artifacts;
- network/process/source cleanliness;
- nested/outer receipts;
- first blocker, claim ceiling and next authority.

## 10. Claim ceiling

```text
PLANNING_ONLY
MIGRATION_STATE=QUEUED_OPTIONAL
RUNNER_ADAPTER=NOT_STARTED
CODEX_HARNESS_PILOT=NOT_STARTED
PRODUCT_RUNTIME_CHANGE=NO
AMBIENT_OR_DEVICE_CAPTURE_EXPANSION=NO
COPYRIGHT_PRIVATE_SOURCE_CONTEXT=NO
GENERIC_KNOWLEDGE_ENGINE=NO
STORY_ATLAS_OR_3D_CLAIM=NO
AUTO_MERGE_RELEASE=NO
PROJECT_PM_ACTIVATION_REQUIRED
```

## 11. First takeover output

```text
EBOOK_SELF_HOSTED_RUNNER_TAKEOVER_COMPLETE
CURRENT_PRODUCT_STATE=
CENTRAL_CAPABILITY_SHA=
PARENT_PM_LOCAL_EXECUTION_PLANE_STATE=
EBOOK_RUNNER_STATE=QUEUED_OPTIONAL|ACTIVATED|BLOCKED|NOT_ACTIVATED_NO_CUSTOMER_OR_ENGINEERING_VALUE
NAMED_USE_CASE=
CUSTOMER_OR_ENGINEERING_VALUE=
COPYRIGHT_BOUNDARY=
DATA_CLASS=D0
RUNNER_HEALTH_STATE=
CURRENT_FIRST_BLOCKER=
NEXT_GOAL=
NEXT_AUTHORITY=
PRODUCT_RUNTIME_CHANGED=NO
AMBIENT_CAPTURE_EXPANDED=NO
MERGE_RELEASE_AUTHORIZED=NO
```
