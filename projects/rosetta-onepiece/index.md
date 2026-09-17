---
layout: project-stub
title: "Rosetta & OnePiece: portable LLM representations and memory"
permalink: /projects/rosetta-onepiece/
year: 2026
status: pre-prints in progress
stack: [PyTorch, Transformers, Representation Learning, vLLM, Retrieval / RAG]
---

Two linked research projects: a model-agnostic way to represent LLM embeddings, and a tiny memory retriever built on top of it.

* **Rosetta** is a ::p::model-agnostic, fixed-size (32-D):: token embedding representation method. It validated the RSA premise across 136 model pairs and reached ::y::0.955 MRR:: on a custom Wikipedia retrieval bank with ::y::~90%:: cross-model retention on MTEB.
* **OnePiece** is a light-weight, plug-and-play memory scorer built on Rosetta. It selects the most relevant stored memories for a conversation, designed to give an LLM long-term memory without retraining.
* The ::b::~1K-parameter:: bilinear scorer matches the bge-reranker-base cross-encoder (::y::AUC 0.738 vs. 0.741::) with ::y::~278,000× fewer parameters::; cross-model training kept pace with same-model (0.738 vs. 0.736) on 5,149 held-out query–memory pairs.
