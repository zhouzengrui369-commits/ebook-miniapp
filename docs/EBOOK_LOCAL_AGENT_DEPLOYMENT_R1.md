# EBOOK_LOCAL_AGENT_DEPLOYMENT_R1

> Repository: `zhouzengrui369-commits/ebook-miniapp`  
> Visibility: `public`  
> Executor: `OWNER_DESIGNATED_LOCAL_AGENT`  
> Program: `ECOSYSTEM-CODEX-HARNESS-R1`  
> State: `QUEUED_OPTIONAL / PLANNING_ONLY`  
> Owner: ebook-miniapp Project PM

## 1. Decision

Local Agent deployment is optional. Do not activate it for architectural uniformity.

Valid terminal state:

```text
NOT_ACTIVATED_NO_CUSTOMER_OR_ENGINEERING_VALUE
```

## 2. Goal

For a named, Human Owner-approved use case, use a local Agent to run exact-SHA reader/TTS/AI QA source/test/build or offline/mobile-support technical work with public-domain or synthetic data.

No Self-hosted Runner is registered for this public repository.

## 3. Agent policy

The Project PM names the Agent.

When Codex is selected:

```text
DEPLOYMENT_OR_ENGINEERING=Luna/xhigh
PRODUCT_EXPERIENCE=Sol/xhigh
SILENT_FALLBACK=FORBIDDEN
```

Default deployment:

```text
SOURCE_MUTATION=NO
LOCAL_REPAIR=NO
PUSH=NO
MERGE=NO
AMBIENT_CAPTURE=NO
```

## 4. Allowed uses

- reader/TTS/AI QA source/test/build;
- public-domain/synthetic D0 fixtures;
- offline/local engine tests;
- bounded mobile/desktop packaging diagnostics;
- artifact/process evidence;
- read-only diagnostics.

## 5. Forbidden uses

- Self-hosted Runner workflow/registration;
- default page-turn/playback/microphone/location/device capture;
- complete copyrighted/private books in ordinary context/evidence;
- full personal reading history;
- Runner/Harness/Agent as reading knowledge truth;
- automatic KnowMe contribution;
- Story Atlas/3D without a named comprehension task;
- silent source repair or provider/network fallback;
- main/merge/release.

## 6. Activation prerequisites

- [ ] live reader/TTS/AI QA/mobile/offline truth restored;
- [ ] named use case and measurable value;
- [ ] Human Owner accepts activation;
- [ ] repository visibility freshly verified public;
- [ ] exact source SHA/tree/request hash;
- [ ] pinned LocalAgentProfile;
- [ ] public-domain/synthetic D0 fixture and copyright/privacy boundary;
- [ ] exact paths/commands/artifacts;
- [ ] fresh checkout/task/evidence roots;
- [ ] rollback.

## 7. Milestones

### ELA0 — Value and Agent selection

Define use case, expected value, exact Agent/profile, data/copyright boundary and stop condition.

### ELA1 — Fresh source/test/build Pilot

Fresh exact-SHA checkout, no source mutation, public-safe data, source/test/build receipt and no product claim escalation.

### ELA2 — Optional named product technical Gate

Only for an approved journey such as local TTS/offline QA/mobile build. Technical evidence remains separate from Product Experience.

### ELA3 — Failure handback and rollback

Agent returns the first blocker. Web Parent PM creates GitHub successor. No local repair.

### ELA4 — Human Owner continuation decision

Decide controlled adoption or `NOT_ACTIVATED_NO_CUSTOMER_OR_ENGINEERING_VALUE`.

## 8. Evidence receipt

- visibility/request/profile hashes;
- source SHA/tree;
- Agent identity/version/model/profile;
- public-domain/synthetic fixture manifest;
- copyright/privacy scan;
- commands/checks/artifacts;
- network/process/source pre/post state;
- first blocker or technical PASS;
- next authority.

## 9. Claim ceiling

```text
PLANNING_ONLY
SELF_HOSTED_RUNNER=FORBIDDEN_FOR_THIS_REPOSITORY
MIGRATION_STATE=QUEUED_OPTIONAL
LOCAL_AGENT_DEPLOYMENT=NOT_STARTED
PRODUCT_RUNTIME_CHANGE=NO
AMBIENT_OR_DEVICE_CAPTURE_EXPANSION=NO
COPYRIGHT_PRIVATE_SOURCE_CONTEXT=NO
GENERIC_KNOWLEDGE_ENGINE=NO
STORY_ATLAS_OR_3D_CLAIM=NO
AUTO_MERGE_RELEASE=NO
PROJECT_PM_ACTIVATION_REQUIRED
```

## 10. First takeover output

```text
EBOOK_LOCAL_AGENT_TAKEOVER_COMPLETE
CURRENT_PRODUCT_STATE=
REPOSITORY_VISIBILITY=public
EXECUTOR=LOCAL_AGENT
LOCAL_AGENT_PROFILE=
LOCAL_AGENT_STATE=QUEUED_OPTIONAL|ACTIVATED|BLOCKED|NOT_ACTIVATED_NO_CUSTOMER_OR_ENGINEERING_VALUE
NAMED_USE_CASE=
CUSTOMER_OR_ENGINEERING_VALUE=
COPYRIGHT_BOUNDARY=
DATA_CLASS=D0
CURRENT_FIRST_BLOCKER=
NEXT_AUTHORITY=
SELF_HOSTED_RUNNER=NO
AMBIENT_CAPTURE_EXPANDED=NO
MERGE_RELEASE_AUTHORIZED=NO
```
