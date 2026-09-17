---
layout: resume
title: Resume
permalink: /resume/
---

# education

## msc advanced computer science (artificial intelligence)
**university of leeds | 2025 – 2026 | leeds, uk**

* Scholarships: International Excellence Award · International Regional Award (India)

## b.tech artificial intelligence & data science
**university of pune | 2022 – 2025 | pune, india**

# experience

## research assistant (llm systems) · university of leeds
**jun 2026 – jul 2026 | leeds, uk**

* Architected a ::p::multi-agent two-phase pipeline:: that converts NHS/NICE clinical guidelines into machine-readable ontologies for a LIDA-funded project, grounding accepted facts in verbatim source evidence.
* Identified a context-window bottleneck in the LLM-based Phase 2 pipeline and replaced its LLM serializer with a ::b::deterministic JSON-to-Turtle serializer::, eliminating one model call per document and removing truncation failures.
* Self-hosted Qwen and Gemma backbones with ::b::vLLM::, using quantized models and speculative decoding to reach ::y::~240 output tok/s:: on an NVIDIA Blackwell 6000.

## ai engineer · hopps
**sep 2024 – jun 2025 | pune, india**

* Designed and built the cross-platform ::b::Flutter/GetX:: app, integrating Firebase Authentication, Firestore, Storage, Cloud Functions and Hosting alongside the recommendation stack.
* Re-engineered the restaurant recommendation pipeline from LLM-based fixed-vocabulary classification to ::p::BGE-small embedding retrieval::, cutting measured retrieval latency ::y::96% (707ms to 28ms):: while removing per-query LLM inference dependency.
* Compared Gemini and BGE-small across extraction and ranking stages, finding near-parity in extraction quality (::y::nDCG@10 0.738 vs. 0.744::) but a ranking advantage for Gemini (::y::nDCG@10 0.549 vs. 0.366::), making the quality–latency–cost trade-off explicit on a 60-query human-in-the-loop benchmark.
* Reduced Firebase reads by ::y::98.6%:: through ::b::ObjectBox:: local caching and served recommendations through GCP Cloud Functions across ~70 venues during alpha testing.

## ml intern · indian institute of management, udaipur
**sep 2023 – apr 2024 | remote**

* Built an asynchronous ::b::BeautifulSoup4:: scraping pipeline processing ::y::113,000+ pages:: across 200 brands for Doc2Vec-based marketing vs. user-response analysis.
* Crafted inference pipeline to classify ::y::250,000+ NFT records:: as AI-generated vs. human using a Hugging Face model and Transformers.

## ai intern · konverge.ai
**aug 2023 – oct 2023 | remote**

* Built ML/NLP workflows for customer segmentation, profitability analysis and sentiment classification.

# projects & research

## maybehere · group restaurant discovery  [live](https://maybehere.app)
**Vue, FastAPI, PostgreSQL/Supabase, Python, ONNX/FastEmbed, Firebase, Cloud Run, OSM, Overture | 2026**

* Designed and deployed a live group restaurant-discovery app with ::y::97K+ place profiles:: across ~200 UK towns/cities; designed the no-signup plan/voting flow and a semantic discovery experience for occasions, cuisines, price-sensitive queries and group preferences.
* Streamed ::y::500K+ entries:: from Overture Places data with Python; cleaned the data by filtering eatery POIs, normalising town names, and enriching missing cuisine, place-type, focus, vibe and transit context using LLMs and ::b::OSM-derived geospatial features::; stored in Supabase.
* Built a low-cost retrieval service using ::p::BGE-small with ONNX/FastEmbed:: on Cloud Run, with ::y::<400ms:: average API response; stored embeddings in SQLite in a separate service while retaining relational metadata in PostgreSQL to stay within free-tier limits.

## trace · reward hacking in rl fine-tuning  [write-up](/projects/trace/)
**PyTorch, Transformers, LoRA SFT, GRPO, Mechanistic Interpretability | 2026**

* Designed a controlled study of reward hacking in RL fine-tuning: trained ::b::SmolLM2-360M-Instruct:: with LoRA SFT then GRPO on a synthetic rule-reasoning task (infer rules from agreeing facts, 5 difficulty tiers); SFT raised exact-match accuracy on 200 held-out tasks from ::y::45.5% to 65%::.
* Compared two GRPO reward verifiers: the weak one paid for the right word anywhere in the rule list, so ::y::35%:: of its answers added extra rules (66.5% exact match); the strong one reached ::y::93%:: with 0% extra rules but through a shortcut, copying the queried property's direction and stating one rule instead of the full rule set, so accuracy alone overstated learning.
* Applied ::p::logit lens, logistic-regression probes on hidden states, activation-vector analysis, PCA and attention analysis:: to localise the reward-induced divergence to ::y::layers 23–29::, where the two models differ in whether they continue or end a rule list.

## rosetta & onepiece · pre-prints in progress
**PyTorch, Transformers, Representation Learning, vLLM, Retrieval / RAG | 2026**

* Developed Rosetta, a ::p::model-agnostic, fixed-size (32-D):: token embedding representation method; validated the RSA premise across 136 model pairs; reached ::y::0.955 MRR:: on a custom Wikipedia retrieval bank with ::y::~90%:: cross-model retention on MTEB.
* Built OnePiece on top of Rosetta: a light-weight, plug-and-play memory scorer that selects the most relevant stored memories for a conversation, designed to give an LLM long-term memory without retraining.
* The ::b::~1K-parameter:: bilinear scorer matches the bge-reranker-base cross-encoder (::y::AUC 0.738 vs. 0.741::) with ::y::~278,000× fewer parameters::; cross-model training kept pace with same-model (0.738 vs. 0.736) on 5,149 held-out query–memory pairs.

## vocabscapes · multi-agent puzzle generation  [page](/projects/vocabscapes/)  [eval harness](/projects/puzzle-eval-harness/)  [live](https://vocabscapes.web.app)
**LangGraph, Model-Eval Framework, Python, Google Gemini API, PostgreSQL/Supabase, Firebase, FastAPI | 2026**

* Built a ::p::five-agent word-puzzle generation pipeline::: writer, judge, improver, finalizer and explanation agents, with bounded retries and persistent caching of two passed variants per level to eliminate repeat generation calls.
* Built and calibrated an ::b::LLM-as-judge evaluation harness:: across four model pairs; calibration shifted judge-bias by up to ::y::39 points:: against blind-human ratings.

# technical skills

* **languages, frameworks & tools:** Python, SQL, Flutter/Dart, Vue, Git, Claude Code
* **machine learning:** PyTorch, Hugging Face Transformers, scikit-learn, NumPy, Pandas, SciPy
* **research & interpretability:** LoRA SFT, GRPO, Reward/Verifier Design, Logit Lens, Probing, PCA, Attention Analysis, RSA
* **llm & genai:** vLLM, LangGraph, Quantization & Speculative Decoding, LLM-as-judge & LLM Evaluation, ONNX, Embedding Models, FastEmbed, RAG Systems, FAISS
* **backend & deployment:** FastAPI, Docker, GCP (Cloud Run, Cloud Functions), PostgreSQL/Supabase, SQLite, Firebase, ObjectBox
