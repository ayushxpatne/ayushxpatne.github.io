---
layout: project-stub
title: "maybehere: group restaurant discovery"
permalink: /projects/maybe-here/
year: 2026
status: live
stack: [Vue, FastAPI, PostgreSQL/Supabase, Python, ONNX/FastEmbed, Firebase, Cloud Run, OSM, Overture]
links:
  - text: "Visit maybehere.app ↗"
    url: https://maybehere.app
---

A live group restaurant-discovery app: plan with friends, vote, and find somewhere to eat without anyone signing up.

* Designed and deployed the app with ::y::97K+ place profiles:: across ~200 UK towns and cities, with a no-signup plan/voting flow and semantic discovery for occasions, cuisines, price-sensitive queries and group preferences.
* Streamed ::y::500K+ entries:: from Overture Places data with Python; filtered eatery POIs, normalised town names, and enriched missing cuisine, place-type, focus, vibe and transit context using LLMs and ::b::OSM-derived geospatial features::; stored in Supabase.
* Built a low-cost retrieval service using ::p::BGE-small with ONNX/FastEmbed:: on Cloud Run, with ::y::<400ms:: average API response; embeddings live in SQLite in a separate service while relational metadata stays in PostgreSQL, to stay within free-tier limits.
