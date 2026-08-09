# EBOOK-STORY-ATLAS-R1 — Optional Planned Goal

Status: `DEFERRED_UNTIL_CONTENT_NEED`

## Decision

The ebook reader registers Geo Context so future content can reuse the ecosystem capability, but **no current runtime map is justified** by the existing reader/TTS/AI QA/bookmark scope.

## Activation examples

- history/geopolitics book with place/event progression;
- travel book with routes and place notes;
- aviation or military content with airport/route context;
- fiction requiring a world atlas or character migration map.

## First implementation if activated

1. author/content adapter maps chapter entities/locations to GeoScene;
2. lightweight 2D/static atlas inside the reading flow;
3. chapter deep links and evidence/source links;
4. offline/mobile performance tests;
5. optional 3D only if a real reading task proves added value.

## Boundary

Do not add Three.js, map assets, additional network data or location permissions to the current product until a real book requirement and separate Goal exist.
