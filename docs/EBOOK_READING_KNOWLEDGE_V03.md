# ebook-miniapp v0.3 Reading Knowledge Integration Plan

> **Plan ID**: `EBOOK-READING-KNOWLEDGE-V03-R1`  
> **State**: `QUEUED_OPTIONAL / PLANNING_ONLY`  
> **Execution owner**: ebook-miniapp Project PM  
> **Ecosystem authority**: `zhouzengrui369-commits/knowme-ecosystem@e46c4be501c465884486a4417adca2e158a58ccc`  
> **Ecosystem PR**: `knowme-ecosystem#17`  
> **Date**: 2026-08-11

---

## 1. Purpose

Define an optional, user-controlled way for ebook-miniapp to preserve reading progress, excerpts, concepts, people/characters, questions and grounded answers through the Shared Knowledge Engine.

This plan activates only when a named book/reader journey proves that persistent knowledge materially improves reading or listening value. Ecosystem alignment alone is not sufficient reason to add collection, storage, graph or Agent complexity.

---

## 2. Protected current truth

Before activation, the ebook Project PM must read current repository governance, product status, open candidate/issue truth and the existing optional Geo/Story Atlas planning PR #1.

Hard protection:

- no current reader, TTS, AI QA, mobile/offline or release behavior changes through this planning branch;
- no default collection of all reading behavior, microphone use, device activity or location;
- no real book/private user content enters GitHub, CI, screenshots or public issues;
- the existing Geo/Story Atlas plan remains optional and separate;
- migration remains `QUEUED_OPTIONAL` until a real customer journey and activation authority exist.

---

## 3. Product ownership boundary

ebook-miniapp owns:

- reading/listening UX;
- book/chapter navigation and progress;
- TTS and playback state;
- annotations/excerpts selected by the user;
- reading-specific AI QA and source display;
- optional story/character/concept exploration;
- mobile/offline behavior and content-license constraints.

ebook-miniapp consumes Shared Knowledge Engine contracts for:

- stable object and source identity;
- provenance, time, review and privacy;
- full-text/vector/graph retrieval;
- permission-scoped context and Agent/model receipts;
- export, deletion, backup and optional synchronization.

It does not build a generic knowledge engine, personal digital twin or ambient data-capture system.

---

## 4. Candidate reading objects

### `ReadingSource`

- book/document identity and edition;
- license/source and local content reference;
- chapter/section anchors;
- source revision/hash;
- permitted excerpt and model-use scope.

### `ReadingProgress`

- source/chapter/position;
- observed time;
- device/session identity as needed;
- private by default;
- sync/conflict policy.

### `Excerpt`

- exact source anchor;
- user selection vs system suggestion;
- optional note/tags;
- privacy and export permission.

### `Concept` / `PersonOrCharacter` / `Relation`

- sourced definition or narrative role;
- temporal/chapter scope to avoid spoilers;
- fact vs interpretation label;
- relation source and confidence.

### `ReadingQuestion` / `GroundedAnswer`

- question, context and source scope;
- answer claims and citations;
- unknown/ambiguous/spoiler policy;
- model/provider/recipe receipt;
- user feedback.

### `ReadingInsight`

- user-declared insight or model proposal;
- source refs and review state;
- optional contribution to KnowMe only through explicit user action/grant.

---

## 5. Milestone plan

### E0 — Value and activation Gate

The Project PM selects one real journey, for example:

```text
read/listen to a long book across sessions
→ preserve progress and selected excerpts
→ ask a sourced question within the current spoiler boundary
→ revisit concepts/characters later
→ optionally add one confirmed insight to personal knowledge
```

Deliverables:

- repository-local Goal/TASK/PLAN/RESULT/EVIDENCE/commands.log;
- accepted ecosystem commit and Shared Knowledge Engine contract pin;
- content-license and test-data boundary;
- current product/candidate protection;
- measurable reading-value hypothesis.

Gate:

> Persistent knowledge is necessary for the named journey and can be delivered without broad device/ambient collection.

### E1 — Explicit reading capture

- user-controlled progress and excerpt capture;
- source/edition/chapter anchors;
- local-first persistence;
- visible pause/delete/export controls;
- no capture outside the chosen sources;
- truthful partial/failure/recovery behavior.

Gate:

> The reader can see what was saved, why, and remove it; restarting the app preserves accepted state.

### E2 — Grounded cross-session QA

- retrieve only permitted book/excerpt/concept objects;
- preserve spoiler and chapter boundary;
- cite source anchors;
- distinguish text fact, interpretation and model hypothesis;
- preserve question/answer/source/back continuity;
- store feedback only under the declared purpose.

Gate:

> Answers remain grounded and do not leak future chapters, unrelated private notes or inaccessible sources.

### E3 — Optional story/concept atlas

Activate only for a named comprehension problem.

- 2D/list view first;
- graph nodes/relations use stable objects and source anchors;
- chapter/time filters and spoiler protection;
- mobile and accessibility behavior;
- optional map/3D only when it materially helps the selected content;
- return to source text and reading state.

Gate:

> The atlas improves comprehension and does not become decorative complexity or expose spoilers.

### E4 — Optional KnowMe contribution

The user explicitly chooses which reading insights, concepts or goals become personal knowledge.

Required:

- preview of objects and source refs;
- destination namespace/purpose;
- fact vs personal reflection vs model proposal labels;
- confirmation and undo/delete;
- no automatic personality/value inference from reading history.

Gate:

> Reading activity does not silently define the user's beliefs, preferences or capabilities.

### E5 — Mobile/offline/sync acceptance

Where claimed:

- exact app/source identity;
- offline reading, TTS, capture and retrieval behavior;
- object-level sync and explicit conflicts;
- deletion/revocation propagation;
- performance/battery/storage budgets;
- independent mobile reading experience review;
- Human Owner customer-value Gate.

---

## 6. Privacy and content rules

- Reading history and progress are D1 by default and may become D2 when source/topic/context is sensitive.
- Private book files and full copyrighted text are not exported to ecosystem fixtures or public evidence.
- Cloud model use is explicit and limited to permitted excerpts/context.
- No silent local-to-cloud fallback.
- Third-party annotations or shared-library data use separate permissions.
- D3 or confidential work materials require a separate product/security Goal.
- Deleting a source covers derived excerpts, concepts, vectors/graph projections and QA context according to the declared lifecycle.

---

## 7. Stop-doing rules

Do not:

- add a generic Wiki/KG/RAG database independent of the shared contract;
- collect every page turn or playback event by default;
- infer permanent user values or personality from chosen books;
- add maps/3D because the capability exists;
- make the reader depend on Copilot UI or physical database tables;
- treat an AI response with citations as proof of mobile/offline product quality;
- activate integration before the base reader/TTS/QA product has a clear delivery path.

---

## 8. Claim vocabulary

Allowed:

```text
QUEUED_OPTIONAL
ACTIVATED_FOR_NAMED_READING_JOURNEY
READING_CAPTURE_CANDIDATE
GROUNDED_QA_CANDIDATE
STORY_ATLAS_OPTIONAL
KNOWME_CONTRIBUTION_USER_CONFIRMED
MOBILE_OFFLINE_ACCEPTANCE_PENDING
HUMAN_OWNER_GATE_REQUIRED
BLOCKED_<FACTUAL_CAUSE>
```

Forbidden:

- `KNOWS_USER` from reading history;
- `GROUNDED` without exact source anchors;
- `OFFLINE_PASS` from browser/API fixtures;
- `STORY_ATLAS_COMPLETE` without a real content task and source return path;
- `V03_COMPLETE` from this plan or one adapter.

---

## 9. Project PM first action

Return:

```text
EBOOK_CURRENT_PRODUCT_GOAL=
CURRENT_CANDIDATE_SHA=
CURRENT_GATE=
CURRENT_BLOCKER=
V03_MIGRATION_STATE=QUEUED_OPTIONAL|ACTIVATED|BLOCKED
NAMED_READING_JOURNEY=
ACTIVATION_PREREQUISITE=
PINNED_ECOSYSTEM_SHA=e46c4be501c465884486a4417adca2e158a58ccc
PINNED_SHARED_ENGINE_CONTRACT=NOT_YET_PINNED
NEXT_REPOSITORY_LOCAL_GOAL=
```

If no named journey exists, retain `QUEUED_OPTIONAL` and make no product changes.
