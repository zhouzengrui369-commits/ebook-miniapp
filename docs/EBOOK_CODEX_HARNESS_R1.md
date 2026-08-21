# EBOOK_CODEX_HARNESS_R1

> Repository：`zhouzengrui369-commits/ebook-miniapp`  
> Program：`ECOSYSTEM-CODEX-HARNESS-R1`  
> State：`QUEUED_OPTIONAL / PLANNING_ONLY`  
> Execution owner：ebook-miniapp Project PM  
> Central capability：`zhouzengrui369-commits/knowme-ecosystem@8ccb543804a7881fd37b31e1ce35085ca7285a76`  
> Central Draft PR：`knowme-ecosystem#21`  
> Reference Gateway plan：`chatgpt-parent-pm#12`  
> Creation base：`chatgpt/v03-reading-knowledge-plan-r1@fd932b30b8917f6a41293b494a48a63dc04c860e`

## 1. Decision

Codex Harness adoption is optional. Do not implement it merely for architectural uniformity.

Activation requires one named engineering or reader-value use case that materially benefits from a bounded engineering Agent Runtime.

Correct non-activation result：

```text
NOT_ACTIVATED_NO_CUSTOMER_OR_ENGINEERING_VALUE
```

## 2. Allowed R1 uses

- source/test engineering for reader, TTS or AI QA;
- public-domain or synthetic content fixtures;
- bounded migration/adapter/test work;
- exact source/test/build receipts;
- read-only diagnostics.

## 3. Forbidden R1 uses

- default recording of page turns, playback, microphone, location or device activity;
- complete copyrighted/private books in ordinary Codex context or public evidence;
- treating Codex Harness as the reading knowledge engine or digital twin;
- automatic contribution of reading history to KnowMe;
- implementing Story Atlas/3D without a named comprehension task;
- direct main, merge or release;
- silent model/provider fallback.

## 4. Model and data policy

```text
CODING_PROFILE=Luna/xhigh
PRODUCT_EXPERIENCE_PROFILE=Sol/xhigh
SILENT_FALLBACK=FORBIDDEN
CONTRACT_LABEL_strongest=FORBIDDEN
INITIAL_DATA=PUBLIC_DOMAIN_OR_SYNTHETIC_D0
NETWORK=DENY_BY_DEFAULT
MAX_APPROVAL=A2_TEST_BUILD
```

## 5. Activation prerequisites

- [ ] live reader/TTS/AI QA/mobile/offline/Runtime truth restored;
- [ ] named use case and measurable value;
- [ ] Human Owner accepts activation;
- [ ] copyright/privacy/test-data boundary;
- [ ] central Gateway/Binary/Protocol Lock accepted;
- [ ] exact Luna/xhigh profile available;
- [ ] repository-local GOAL/TASK/PLAN/RESULT/EVIDENCE/commands.log;
- [ ] fresh task worktree and isolated `CODEX_HOME`;
- [ ] exact allowed paths/commands and rollback.

Until then：`EBOOK_HARNESS_STATE=QUEUED_OPTIONAL`.

## 6. Optional milestones

### EH0 — Value and activation Gate

Define:

- named use case;
- problem and expected engineering/reader value;
- why the Harness is needed rather than ordinary tooling;
- data/copyright/privacy boundary;
- exact acceptance and stop condition.

If value is not demonstrated, close as `NOT_ACTIVATED_NO_VALUE`.

### EH1 — Read-only source/test Pilot

Map one bounded reader/TTS/AI QA module using source-only/public-safe context, Luna/xhigh, read-only sandbox, no network and terminal receipt.

### EH2 — Bounded test-first engineering Pilot

After EH1 acceptance, perform one exact-file synthetic-fixture correction with RED test, write/test approvals, focused/regression checks and Draft PR only.

### EH3 — Optional product adapter

Only when tied to a named reader journey. Harness source/test evidence remains separate from mobile/offline/product-experience evidence.

### EH4 — Human Owner controlled-adoption decision

Assess value, security, cost, rollback and whether continuing the integration is justified.

## 7. Required evidence

- central/Gateway/Binary/Schema/model pins;
- source/final SHA and task identity;
- public-domain/synthetic fixture manifest;
- copyright/privacy scan;
- approvals/commands/checks/diff;
- network/process state;
- first blocker and claim ceiling;
- independent product evidence when product behavior is claimed.

## 8. Claim ceiling

```text
PLANNING_ONLY
MIGRATION_STATE=QUEUED_OPTIONAL
CODEX_HARNESS_PILOT=NOT_STARTED
PRODUCT_RUNTIME_CHANGE=NO
AMBIENT_OR_DEVICE_CAPTURE_EXPANSION=NO
COPYRIGHT_PRIVATE_SOURCE_CONTEXT=NO
GENERIC_KNOWLEDGE_ENGINE=NO
STORY_ATLAS_OR_3D_CLAIM=NO
AUTO_MERGE_RELEASE=NO
PROJECT_PM_ACTIVATION_REQUIRED
```
