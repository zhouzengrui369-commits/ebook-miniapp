# EBOOK_CODEX_HARNESS_R1

> Repository: `zhouzengrui369-commits/ebook-miniapp`  
> Program: `ECOSYSTEM-CODEX-HARNESS-R1`  
> State: `QUEUED_OPTIONAL / PLANNING_ONLY`  
> Owner: ebook-miniapp Project PM  
> Central capability: `zhouzengrui369-commits/knowme-ecosystem@fd01ef7619a31b7ffca5dd2205a2e31a96fac834`  
> Central PR: `knowme-ecosystem#21`  
> Parent PM Gateway/Runner: `chatgpt-parent-pm#12` / `chatgpt-parent-pm#14`  
> Runner plan: [`EBOOK_SELF_HOSTED_RUNNER_ADOPTION_R1.md`](./EBOOK_SELF_HOSTED_RUNNER_ADOPTION_R1.md)

## 1. Decision

Codex Harness adoption is optional. Do not implement it for architectural uniformity.

Activation requires one named engineering or reader-value use case that materially benefits from a bounded engineering Agent Runtime.

Correct non-activation result:

```text
NOT_ACTIVATED_NO_CUSTOMER_OR_ENGINEERING_VALUE
```

## 2. Execution-plane boundary

```text
GitHub Self-hosted Runner
  = optional exact-SHA local build/test/offline execution plane

Codex Harness
  = optional Luna/xhigh engineering Agent inside a Runner request
```

Neither becomes the reading knowledge engine, digital twin, automatic reading-history collector, Product Experience reviewer or release authority.

## 3. Allowed R1 uses

- source/test engineering for reader, TTS or AI QA;
- public-domain/synthetic fixtures;
- bounded migration/adapter/test work;
- exact source/test/build receipts;
- read-only diagnostics.

## 4. Forbidden R1 uses

- default page-turn/playback/microphone/location/device capture;
- complete copyrighted/private books in ordinary context/evidence;
- Runner/Harness as reading knowledge truth;
- automatic KnowMe contribution;
- Story Atlas/3D without a named comprehension task;
- direct public PR/fork execution on the Mac mini;
- direct main, merge or release;
- silent model/provider/network fallback.

## 5. Policy

```text
CODING_PROFILE=Luna/xhigh
PRODUCT_EXPERIENCE_PROFILE=Sol/xhigh
SILENT_FALLBACK=FORBIDDEN
CONTRACT_LABEL_strongest=FORBIDDEN
INITIAL_DATA=PUBLIC_DOMAIN_OR_SYNTHETIC_D0
NETWORK=DENY_BY_DEFAULT
MAX_APPROVAL=A2_TEST_BUILD
RUNNER_REQUEST_REQUIRED=YES
```

## 6. Activation prerequisites

- [ ] live reader/TTS/AI QA/mobile/offline/Runtime truth restored;
- [ ] named use case and measurable value;
- [ ] Human Owner accepts activation;
- [ ] copyright/privacy/test-data boundary;
- [ ] central Runner registration topology/Gateway accepted;
- [ ] stable Codex Binary/Protocol Lock and Luna/xhigh;
- [ ] repository-local GOAL/TASK/PLAN/RESULT/EVIDENCE/commands.log;
- [ ] fresh Runner worktree/task/evidence roots and isolated `CODEX_HOME`;
- [ ] exact allowed paths/commands and rollback.

Until then:

```text
EBOOK_HARNESS_STATE=QUEUED_OPTIONAL
```

## 7. Optional milestones

### EH0 — Value and activation Gate

Define named use case, problem/value, why Harness is needed, data/copyright/privacy boundary, exact acceptance and stop condition. If value is not demonstrated, close as `NOT_ACTIVATED_NO_CUSTOMER_OR_ENGINEERING_VALUE`.

### EH1 — Read-only source/test Pilot

Map one bounded reader/TTS/AI QA module using source-only/public-safe context, Luna/xhigh, read-only sandbox, no network and complete nested/outer receipts.

### EH2 — Bounded test-first engineering Pilot

After EH1 acceptance, perform one exact-file synthetic-fixture correction with RED test, bounded write/test approvals, focused/regression checks and Draft PR only.

### EH3 — Optional product adapter

Only when tied to a named reader journey. Harness source/test evidence remains separate from Runner local technical evidence and independent product experience.

### EH4 — Failure recovery and Human Owner decision

Runner/Harness failure returns to GitHub; Web Parent PM creates successor; no automatic Codex Runner repair. Human Owner decides controlled adoption or non-activation.

## 8. Required evidence

Record central Runner/Harness pins, RunnerProfile/request hashes, Binary/Schema/model, source/final SHA/task identity, public-domain/synthetic fixture manifest, copyright/privacy scan, approvals/commands/checks/diff, network/process state, nested/outer receipts, first blocker, claim ceiling and next authority.

## 9. Claim ceiling

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
