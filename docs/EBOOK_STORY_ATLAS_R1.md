# EBOOK-STORY-ATLAS-R1 — ebook-miniapp Project PM Delivery Plan

Status: `DEFERRED_UNTIL_CONTENT_NEED`
Execution owner: **ebook-miniapp Project PM**
Capability authority: `zhouzengrui369-commits/knowme-ecosystem@6edb5401084de24491038ac55525f584e9943bd7`
GeoScene schema SHA-256: `8695f3d9d376bf5591138d78b1460c17758845312aeca52a4a0597ee873032df`

## Ownership contract

The ebook-miniapp Project PM owns the decision to activate this capability, the implementation Goal, source changes, worker assignments, mobile/miniprogram deployment testing, independent review and final delivery. The ecosystem capability PM only supplies the shared contract and compatibility requirements.

This plan has zero runtime/product-completion weight until the ebook-miniapp PM activates it for a real book/content requirement.

## Product decision

The current reader/TTS/AI QA/bookmark product does **not** justify adding a map. Geo Context is registered so a future story or knowledge product can reuse the ecosystem capability without inventing a new incompatible map format later.

## Activation gate

The ebook-miniapp PM may activate `EBOOK-STORY-ATLAS-R1` only when all are true:
- a named book/story has a real geographic comprehension need;
- the expected reader value is explicit and testable;
- the feature does not displace higher-priority reader/TTS/QA quality gates without Owner reprioritization;
- the current central Geo Context version is revalidated by exact SHA/hash;
- required map data/source/license/privacy policy is defined.

Activation examples:
- history/geopolitics book with place/event progression;
- travel book with routes and place notes;
- aviation content with airport/route context;
- fiction requiring a world atlas or character migration map.

## Product outcome

Create a **Story / Knowledge Atlas** that improves chapter comprehension while staying inside the reading flow.

Primary renderer strategy: lightweight 2D/static first. 3D is a later optional decision only if reader testing proves added value.

## Milestones

### M0 — PM activation and content baseline

Record:
- target book/content ID/version;
- exact source/content snapshot;
- current app release baseline;
- central capability SHA/schema hash;
- expected reader journey and acceptance criteria;
- standard Goal/TASK/PLAN/RESULT/EVIDENCE chain.

Exit: a real content requirement exists; no speculative map work.

### M1 — Content-to-GeoScene adapter

Extract only evidence-backed locations/events/routes from chapter content or authorized structured metadata.

Exit:
- source chapter/reference preserved;
- uncertain/fictional locations labelled appropriately;
- no invented route coordinates;
- deterministic adapter tests/conformance pass.

### M2 — Lightweight 2D/static atlas in reading flow

Deliver the smallest useful reader experience:
- chapter map/atlas entry;
- location markers/regions;
- event or route sequence when supported by evidence;
- jump back to source paragraph/chapter;
- legend/source/time/uncertainty where material.

Exit:
- reader can use the atlas without leaving or breaking the normal reading flow;
- no additional location permission unless a separate user-location feature explicitly requires it.

### M3 — Offline/mobile/miniprogram hardening

The ebook-miniapp PM sets budgets for:
- bundle size;
- first-open/load latency;
- low-memory mobile behavior;
- offline/cached book use;
- static fallback;
- network/map-data failure recovery.

Exit:
- actual WeChat/miniprogram or target app runtime evidence;
- offline/static fallback works;
- no dependency on a heavy WebGL stack for core reading.

### M4 — AI QA / atlas context integration, only if useful

If the reader asks a spatial question, AI QA may use evidence-backed atlas context.

Exit:
- answer links back to chapter/source;
- uncertain spatial relations remain uncertain;
- atlas is not used to invent facts not present in content/source data.

### M5 — Exact-SHA product acceptance

Freeze one product candidate and assign normal local/mobile deployment testing.

Evidence:
- exact app SHA/build;
- named content snapshot;
- real target runtime/device;
- chapter→atlas→source journey;
- offline/failure path;
- screenshots/logs/artifact hashes.

### M6 — Independent reading/product-experience review

Review:
- comprehension benefit;
- reading-flow interruption cost;
- text/map hierarchy;
- source/uncertainty clarity;
- touch/mobile accessibility;
- loading/fallback;
- whether the atlas feels justified rather than decorative.

P0/P1 findings create successor candidates.

### M7 — Optional 3D gate

3D requires a separate PM decision and evidence that it improves the named reading task enough to justify bundle/performance/interaction cost. It is not inherited automatically from the upstream research Skill.

### M8 — Human Owner/customer-value gate

Release decision remains Human Owner-only through the ebook-miniapp project's normal delivery process.

## Explicit non-goals

- adding Three.js/map dependencies to the current product without a named content need;
- requesting device location merely to display book geography;
- copying upstream GPL Vue/Three.js source/templates/assets;
- auto-geocoding uncertain fictional/historic places and presenting them as fact;
- replacing reading with a map-first interface;
- starting runtime work because this plan PR exists.

## Definition of Done

Geo Context is considered delivered in ebook-miniapp only when the **ebook-miniapp Project PM** activates a real content Goal and completes exact-SHA target-runtime acceptance, independent review and Human Owner customer-value approval.
