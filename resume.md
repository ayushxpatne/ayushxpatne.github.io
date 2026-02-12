---
layout: resume
title: Resume
permalink: /resume/
---

# education

## msc advanced computer science (ai)
**university of leeds | september 2025 – september 2026**

## b.tech ai & data science
**viit, pune | january 2022 – may 2025**

# experience

## ai engineer · hopps
**september 2024 – june 2025 | pune, india**

* developed  ai recommendation system using ::b::gemini api:: and ::p::gcp cloud functions::, delivering real-time dining suggestions for ::y::70+ restaurant listings:: across beta testing phase.
* implemented ::y::objectbox local caching strategy::, reducing firestore read operations by ::y::98.6%:: (from 70 to ~1 read per user) and optimizing api costs against a 1,000 mau baseline.
* built serverless backend using ::b::firebase cloud functions:: to handle ai content generation pipeline for both consumer and partner-facing applications.
* prototyped ::p::embedding-based retrieval system:: to llm based recsys, achieving ::y::60-80% api latency reduction:: (5s to 1-2s) and enabling potential on-device ml inference for cost optimization.
* engineered api safeguards including ::y::rate limiting:: (3 requests/user/day), quota management, api key rotation, and graceful degradation patterns to maintain service reliability under free-tier constraints.
* coordinated cross-functional delivery across ::y::8-member team:: spanning engineering, operations, and business development, translating ai capabilities into business value for restaurant partners.
* mentored 2 interns for 3 months on ::b::llm-to-embedding migration strategies:: and synthetic data pipeline design using gemini through regular briefings.
* resolved malformed llm output issues through ::p::iterative system prompt refinement::.
* implemented comprehensive error handling and debug logging across all cloud functions, enabling systematic troubleshooting and monitoring via ::y::gcp ai playground dashboards::.

## research intern · iim udaipur
**september 2023 – april 2024 | remote**

* built automated classification system for ::y::250,000+ nft records:: using hugging face to differentiate ai-generated vs. human content.
* engineered asynchronous scraping infrastructure (::b::beautifulsoup4::) processing ::y::113,000+ web pages::, optimizing pipeline throughput.
* explored distributed scraping architecture on ::p::gcp cloud functions:: for ip rotation, demonstrating initiative despite resource constraints.
* contributed to ::y::two research manuscripts:: by developing automated data preprocessing workflows and applying nlp techniques for market analysis.

## ai intern · konverge.ai
**august 2023 – october 2023 | nagpur, india**

* applied statistical modeling for customer segmentation, purchase prediction, and profitability analysis.
* built ::b::sentiment classification model:: using nlp to extract actionable insights from user review data.

# projects

## vocabscapes · multi-agent puzzle generation system  [live demo](https://vocabscapes.web.app)

* architected production ::p::5-agent langgraph pipeline:: (writer, critic, improver, finalizer, explainer) on ::b::google cloud run:: with jwt authentication, serving ::y::12+ restful endpoints:: and pre-generating 140+ puzzle variants.
* implemented ::y::8-point validation system:: ensuring lexical integrity and contextual quality with 2-cycle average validation convergence across puzzle generation workflow.
* achieved ::y::95% reduction in api overhead:: for 1,000 mau benchmark by architecting a ::b::postgresql/supabase:: threshold-based caching layer that decoupled operational costs from user growth.
* engineered database architecture with ::y::row level security (rls):: and upsert patterns for data isolation and conflict resolution.
* developed a scalable relational backend with ::b::fastapi and supabase::, optimizing for asynchronous performance and relational data integrity to support multi-agent generation workflows.

## maira · context-aware ai companion with memory architecture  [live demo](https://trymaira.web.app/early-access/landing)

* engineered ::p::rag-based memory system:: using ::b::sqlite embedding storage:: with ::y::200-500ms retrieval performance::, enabling context-aware conversations through semantic similarity search.
* designed parallel memory pipeline using ::y::google gemini api::: main thread for responses, background thread for memory extraction with ::b::importance scoring and redundancy detection::.
* built full-stack mobile application with firebase authentication, tracking ::y::emotional states and life events:: for realistic, judgment-free companionship.
* implemented ::p::imessage-style ux:: focusing on long-term context persistence and judgment-free companionship.
* implemented ::y::privacy-first architecture:: storing all memories locally on-device rather than cloud storage, ensuring user data remains private.

## privacy-preserving fraud detection via federated learning  [overview](https://ayushxpatne.github.io/ayushpatne/blog/fl-eth-dissertation)

* architected ::p::federated learning system:: for privacy-preserving training across ::y::3 distributed clients over 10 rounds::.
* engineered pipeline for ::y::90%+ class imbalance:: (ethereum transactions) using ::b::smote:: and hypothesis-driven feature engineering.
* achieved ::y::99.7% auc-roc and 96.6% recall:: using a custom fraud detection classifier.
* built ::b::flask-based dashboard:: for real-time monitoring of model performance metrics and fraud patterns.

## social media recommendation algorithm  [blog](https://ayushxpatne.github.io/ayushpatne/blog/social-media-algorithm)  [live demo](https://social-media-algo-code.onrender.com)

* engineered tiktok-style recommendation engine using ::b::faiss indexivf:: for semantic video retrieval.
* implemented ::p::approximate nearest neighbor search:: for ::y::3072-dimensional embeddings:: across 500+ objects.
* designed ::y::sliding window model:: (last 5 interactions) with ::y::70-30 exploitation-exploration split:: for content discovery.
* built multi-signal scoring system tracking ::b::6 interaction types:: (view time, shares, rewatches) to capture nuanced user preferences.

## brewstories · llm fine-tuning for creative writing

* fine-tuned ::b::tinyllama (1.1b):: on a ::y::10,000-story dataset:: using pytorch and hugging face, completing training in 8 hours.
* developed end-to-end pipeline: tokenization, dataset preparation, fine-tuning, and evaluation for narrative coherence.
* achieved ::p::runner-up recognition:: at visionary techfest 24 for stylistic consistency in creative text generation.

## undp climate survey analysis

* developed ::b::random forest classifier:: achieving ::y::89.76% auc-roc and 84.51% accuracy:: predicting high climate commitment support (≥85% threshold) across ::y::73,000+ respondents from 73 countries::.
* built ::p::linear regression model:: achieving ::y::r² 68.23% and rmse 8.47:: for continuous support prediction, comparing interpretability vs accuracy trade-offs across model types.
* engineered feature extraction pipeline for ::y::20,000+ null values:: using standardscaler and onehotencoding.
* segmented countries into ::b::6 typologies:: using k-means clustering and pca dimensionality reduction.
* created ::y::tableau visualizations:: to communicate global age-gap trends and demographic predictors.


# research

## "attention span and its correlation with mental health"
**richa shah, sarthak rak, ayush patne, dr. laxmi bewoor**
* 4th asian conference on innovation in technology (asiancon), august 2024

# technical skills

* **languages:** python (pandas, numpy, scikit-learn), dart (flutter), sql
* **ai & ml:** pytorch, tensorflow, hugging face, langchain/langgraph, rag, generative ai, llms, federated learning, fine-tuning (lora/peft)
* **web & backend:** fastapi, flask, firebase (auth, firestore, hosting), supabase (postgresql)
* **cloud & devops:** gcp (cloud functions, cloud run), aws, docker, git, ci/cd, tableau

# honors & certifications

* **runner-up, ai/ml domain** – visionary techfest 24 hackathon (binghamton university & visionary club)
* **machine learning specialization** – stanford online & deeplearning.ai
* **generative ai with large language models** – deeplearning.ai & amazon web services
* **aws cloud quest** – cloud practitioner & genai (in progress)

# leadership & extracurricular

* **hackathon lead organizer** – viz-a-thon, viit
* **video & photography team head** – ai student association, viit & indo-japan hyper-k workshop
* **media team head** – tedxviit
* **class representative** – academic year 2021-22