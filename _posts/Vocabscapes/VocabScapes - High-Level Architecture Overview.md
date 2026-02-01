
## Simplified System Architecture

```mermaid
graph TB
    subgraph "Client Layer - Firebase Hosting"
        FE[Frontend Application<br/>HTML + CSS + JavaScript<br/>Canvas-based Letter Wheel<br/>Real-time UI Updates]
    end

    subgraph "API Layer - Google Cloud Run"
        API[FastAPI Backend<br/>REST Endpoints<br/>Auth Middleware<br/>Business Logic]
    end

    subgraph "AI/ML Layer"
        AI[LangChain + LangGraph<br/>Multi-Agent Workflow<br/>Google Gemini Flash<br/>Structured Outputs]
    end

    subgraph "Data Layer - Supabase"
        DB[(PostgreSQL Database<br/>User Progress<br/>Level Data<br/>Level Progress)]
        AUTH[Supabase Auth<br/>JWT + Refresh Tokens<br/>Row Level Security]
    end

    subgraph "External Services"
        DICT[Dictionary API<br/>Definitions & Phonetics]
    end

    FE -->|HTTPS Requests| API
    API -->|Generate Puzzles| AI
    API -->|CRUD Operations| DB
    API -->|Auth Validation| AUTH
    AI -->|Fetch Definitions| DICT
    FE -->|Token Refresh| AUTH
    FE -->|Word Definitions| DICT

    style FE fill:#4f85e5,color:#fff
    style API fill:#2d3748,color:#fff
    style AI fill:#f7da21,color:#000
    style DB fill:#3ecf8e,color:#fff
    style AUTH fill:#3ecf8e,color:#fff
    style DICT fill:#ff6b6b,color:#fff
```

## Database Layer Architecture

### Database Models & Operations

```mermaid
graph TB
    subgraph "Database Models - db/"
        subgraph "level_data.py"
            LD_MODEL[LevelData Model<br/>━━━━━━━━━━<br/>level_id: str<br/>level_number: int<br/>base_word: str<br/>word_list: list<br/>target_words: list<br/>sentence: str<br/>final_sentence: str<br/>improved_count: int<br/>critc_verdict: str<br/>critc_verdict_reason: str<br/>explanation_deck: Optional]
            
            LD_STORE[store_level<br/>Insert new level]
            LD_GET_IDS[get_level_ids_for_level<br/>Fetch IDs by level number<br/>Filter: critc_verdict=PASSED<br/>Optional: exclude_id]
            LD_FETCH[fetch_level<br/>Get level by ID]
            LD_REPORT[report_level<br/>Mark as FAILED<br/>Append USER REPORTED]
        end
        
        subgraph "user.py"
            UP_MODEL[UserProgress Model<br/>━━━━━━━━━━<br/>user_id: str<br/>current_level: int<br/>level_id: str<br/>total_coins: int<br/>hints_remaining: int]
            
            UP_CREATE[create_user_progress<br/>Initialize new user<br/>Set level=1, coins=1000<br/>hints=3]
            UP_GET[get_user_progress<br/>Fetch user stats]
            UP_UPDATE[update_user_progress<br/>Save progress]
            UP_HINT[update_hint_remaining<br/>Decrement hints]
        end
        
        subgraph "level_progress.py"
            LP_MODEL[LevelProgress Model<br/>━━━━━━━━━━<br/>user_id: str<br/>level_number: int<br/>level_id: str<br/>found_words: list<br/>bonus_words: list<br/>is_completed: bool<br/>completed_at: str]
            
            LP_UPDATE[update_level_progress<br/>Upsert on conflict<br/>Keys: user_id + level_number]
            LP_GET[get_level_progress<br/>Fetch specific level state]
        end
        
        subgraph "table_names.py"
            TBL_NAMES[Tables Class<br/>━━━━━━━━━━<br/>user_progress<br/>level_progress<br/>level_data<br/>word_timestamps]
        end
    end
    
    subgraph "Supabase PostgreSQL"
        TBL_USER[user_progress Table<br/>━━━━━━━━━━<br/>PK: user_id<br/>Tracks: coins, hints, current level]
        
        TBL_LEVEL_PROG[level_progress Table<br/>━━━━━━━━━━<br/>PK: user_id + level_id<br/>Tracks: found/bonus words<br/>completion status]
        
        TBL_LEVEL_DATA[level_data Table<br/>━━━━━━━━━━<br/>PK: level_id<br/>Stores: puzzles, sentences<br/>verdict, explanation deck]
        
        TBL_TIMESTAMPS[word_timestamps Table<br/>━━━━━━━━━━<br/>Analytics: word discovery times]
        
        RLS[Row Level Security<br/>auth.uid policies]
    end
    
    subgraph "API Endpoints - main.py"
        EP_GEN["/generate_level/level"]
        EP_FETCH["/fetch_level/level_id"]
        EP_DEMO["/demo_level"]
        EP_REPORT["/report_level/level_id"]
        EP_USER_GET["/user/progress GET"]
        EP_USER_POST["/user/progress POST"]
    end
    
    %% LevelData connections
    LD_MODEL --> LD_STORE
    LD_MODEL --> LD_GET_IDS
    LD_MODEL --> LD_FETCH
    LD_MODEL --> LD_REPORT
    
    LD_STORE --> TBL_LEVEL_DATA
    LD_GET_IDS --> TBL_LEVEL_DATA
    LD_FETCH --> TBL_LEVEL_DATA
    LD_REPORT --> TBL_LEVEL_DATA
    
    %% UserProgress connections
    UP_MODEL --> UP_CREATE
    UP_MODEL --> UP_GET
    UP_MODEL --> UP_UPDATE
    UP_MODEL --> UP_HINT
    
    UP_CREATE --> TBL_USER
    UP_GET --> TBL_USER
    UP_UPDATE --> TBL_USER
    UP_HINT --> TBL_USER
    
    %% LevelProgress connections
    LP_MODEL --> LP_UPDATE
    LP_MODEL --> LP_GET
    
    LP_UPDATE --> TBL_LEVEL_PROG
    LP_GET --> TBL_LEVEL_PROG
    
    %% Table names reference
    TBL_NAMES -.->|References| TBL_USER
    TBL_NAMES -.->|References| TBL_LEVEL_PROG
    TBL_NAMES -.->|References| TBL_LEVEL_DATA
    TBL_NAMES -.->|References| TBL_TIMESTAMPS
    
    %% API to Model connections
    EP_GEN --> LD_GET_IDS
    EP_GEN --> LD_STORE
    EP_FETCH --> LD_FETCH
    EP_DEMO --> LD_GET_IDS
    EP_DEMO --> LD_FETCH
    EP_REPORT --> LD_REPORT
    
    EP_USER_GET --> UP_GET
    EP_USER_GET --> LP_GET
    EP_USER_POST --> UP_UPDATE
    EP_USER_POST --> LP_UPDATE
    
    %% RLS protection
    TBL_USER -.->|Protected by| RLS
    TBL_LEVEL_PROG -.->|Protected by| RLS
    
    style LD_MODEL fill:#3b82f6,color:#fff
    style UP_MODEL fill:#8b5cf6,color:#fff
    style LP_MODEL fill:#ec4899,color:#fff
    style TBL_NAMES fill:#64748b,color:#fff
    style TBL_USER fill:#3ecf8e,color:#fff
    style TBL_LEVEL_PROG fill:#3ecf8e,color:#fff
    style TBL_LEVEL_DATA fill:#3ecf8e,color:#fff
    style RLS fill:#f59e0b,color:#fff
```

### Database Operations Flow

```mermaid
sequenceDiagram
    participant API as FastAPI Endpoint
    participant LevelData as level_data.py
    participant UserProg as user.py
    participant LevelProg as level_progress.py
    participant Tables as table_names.py
    participant DB as Supabase PostgreSQL

    Note over API,DB: Level Generation & Caching
    
    API->>LevelData: get_level_ids_for_level(level, exclude_id)
    LevelData->>Tables: Get table name
    Tables-->>LevelData: level_data
    LevelData->>DB: SELECT level_id WHERE<br/>level_number=X AND<br/>critc_verdict=PASSED<br/>AND level_id != exclude_id
    DB-->>LevelData: List of level IDs
    
    alt Cache Hit (IDs exist)
        LevelData-->>API: Return cached level IDs
        API->>LevelData: fetch_level(random_id)
        LevelData->>DB: SELECT * WHERE level_id=X
        DB-->>LevelData: Complete level data
        LevelData-->>API: LevelData object
    else Cache Miss (Generate new)
        API->>API: Run AI workflow
        API->>LevelData: store_level(level_data)
        LevelData->>DB: INSERT INTO level_data
        DB-->>LevelData: Stored level
        LevelData-->>API: New LevelData object
    end
    
    Note over API,DB: User Progress Tracking
    
    API->>UserProg: get_user_progress(user_id, token)
    UserProg->>UserProg: Set auth token
    UserProg->>Tables: Get table name
    Tables-->>UserProg: user_progress
    UserProg->>DB: SELECT * WHERE user_id=X<br/>(RLS check: auth.uid)
    DB-->>UserProg: User stats
    
    API->>LevelProg: get_level_progress(user_id, level_id, token)
    LevelProg->>Tables: Get table name
    Tables-->>LevelProg: level_progress
    LevelProg->>DB: SELECT * WHERE<br/>user_id=X AND level_id=Y<br/>(RLS check: auth.uid)
    
    alt Progress exists
        DB-->>LevelProg: Level state
    else No progress (new level)
        LevelProg->>LevelProg: Create default state<br/>found_words=[]<br/>is_completed=false
        LevelProg-->>API: Default LevelProgress
    end
    
    Note over API,DB: Progress Update
    
    API->>UserProg: update_user_progress(user_id, token, data)
    UserProg->>DB: UPDATE user_progress<br/>SET coins=X, hints=Y<br/>WHERE user_id=Z
    DB-->>UserProg: Success
    
    API->>LevelProg: update_level_progress(user_id, token, data)
    LevelProg->>DB: UPSERT level_progress<br/>ON CONFLICT (user_id, level_number)<br/>DO UPDATE
    DB-->>LevelProg: Success
    
    Note over API,DB: Level Reporting
    
    API->>LevelData: report_level(level_id)
    LevelData->>LevelData: fetch_level(level_id)
    LevelData->>DB: SELECT * WHERE level_id=X
    DB-->>LevelData: Current level data
    LevelData->>LevelData: Append [REPORTED BY USER]<br/>to critc_verdict_reason
    LevelData->>DB: UPDATE level_data<br/>SET critc_verdict=FAILED<br/>WHERE level_id=X
    DB-->>LevelData: Updated
    LevelData-->>API: Success
```

## AI Agent Workflow Architecture

### Multi-Agent Puzzle Generation System

```mermaid
graph TB
    subgraph "Agent Workflow - LangGraph StateGraph"
        START([Workflow Start])
        
        subgraph "State Management"
            STATE[State Object<br/>level: int<br/>word_list: list<br/>difficulty_desc: dict<br/>sentence: str<br/>target_words: list<br/>critc_verdict: str<br/>improved_count: int<br/>final_sentence: str<br/>explanation_deck: dict]
        end
        
        subgraph "Writer Agent"
            WRITE[write_sentence<br/>━━━━━━━━━━<br/>Input: word_list + difficulty<br/>Process: Create contextual sentence<br/>Output: sentence + target_words]
            WRITE_PROMPT[System Prompt:<br/>- Select target words<br/>- Show meaning through context<br/>- Use specific nouns/verbs<br/>- Ban pronouns/acronyms<br/>- Follow difficulty settings]
            WRITE_MODEL[Gemini Flash<br/>temp=2.0<br/>max_tokens=300]
            WRITE_STRUCT[WriterAgentOutputStructure<br/>sentence: str<br/>target_words: list<br/>explanation: str]
        end
        
        subgraph "Critic Agent"
            CRITIQUE[critique_sentence<br/>━━━━━━━━━━<br/>Input: sentence + targets + word_list<br/>Process: Validate puzzle logic<br/>Output: PASSED or FAILED + reason]
            CRITIQUE_CHECKS[8 Critical Checks:<br/>1. Target word existence<br/>2. Answer key accuracy<br/>3. Proper noun violation<br/>4. Substring overlap<br/>5. Lexical integrity<br/>6. Acronym detection<br/>7. Contextual quality<br/>8. Output style]
            CRITIQUE_MODEL[Gemini Flash<br/>Structured validation]
            CRITIQUE_STRUCT[CriticAgentOutputStructure<br/>result: PASSED/FAILED<br/>reason: str]
        end
        
        subgraph "Decision Node"
            DECISION{should_improve?<br/>━━━━━━━━━━<br/>verdict == FAILED<br/>AND<br/>improved_count ≤ 5}
        end
        
        subgraph "Improver Agent"
            IMPROVE[improve_sentence<br/>━━━━━━━━━━<br/>Input: feedback + original attempt<br/>Process: Address critique issues<br/>Output: new_sentence + new_targets]
            IMPROVE_PROMPT[System Prompt:<br/>- Analyze feedback<br/>- Create NEW sentence<br/>- Address specific issues<br/>- Follow all original rules<br/>- Increment improved_count]
            IMPROVE_MODEL[Gemini Flash<br/>Creative rewrite]
            IMPROVE_STRUCT[ImprovedSentenceOutputStructure<br/>new_sentence: str<br/>new_target_words: list]
        end
        
        subgraph "Finalizer Agent"
            FINALIZE[finalize_sentence<br/>━━━━━━━━━━<br/>Input: approved sentence + targets<br/>Process: Create display version<br/>Output: final_sentence with blanks]
            FINALIZE_LOGIC["Replace target words with:<br/>blanks + length indicator<br/>Case-insensitive regex<br/>Word boundary detection"]
        end
        
        subgraph "Explainer Agent"
            EXPLAIN[explain_level<br/>━━━━━━━━━━<br/>Input: targets + sentence + dict data<br/>Process: Generate learning content<br/>Output: explanation_deck]
            EXPLAIN_DICT[Dictionary API Calls<br/>━━━━━━━━━━<br/>For each target word:<br/>fetch definitions,<br/>phonetics, examples]
            EXPLAIN_MODEL[Gemini Flash<br/>Context extraction]
            EXPLAIN_STRUCT[TargetWordsUsageOutput<br/>word_details: list<br/>- word: str<br/>- phonetic: str<br/>- contextual_meaning: str<br/>simplified_sentence: str]
        end
        
        END([Workflow End])
    end
    
    subgraph "External Dependencies"
        GEMINI_API[Google Gemini API<br/>gemini-flash-lite-latest]
        DICT_API[Dictionary API<br/>dictionaryapi.dev]
        DIFFICULTY[Difficulty Settings<br/>From difficulty_rating.py<br/>━━━━━━━━━━<br/>target_count<br/>sentence_length<br/>vocabulary_guidance<br/>complexity<br/>context_instruction<br/>forbidden patterns]
    end
    
    START --> STATE
    STATE --> WRITE
    WRITE --> WRITE_PROMPT
    WRITE_PROMPT --> WRITE_MODEL
    WRITE_MODEL --> GEMINI_API
    WRITE_MODEL --> WRITE_STRUCT
    WRITE_STRUCT --> STATE
    
    WRITE --> CRITIQUE
    CRITIQUE --> CRITIQUE_CHECKS
    CRITIQUE_CHECKS --> CRITIQUE_MODEL
    CRITIQUE_MODEL --> GEMINI_API
    CRITIQUE_MODEL --> CRITIQUE_STRUCT
    CRITIQUE_STRUCT --> STATE
    
    CRITIQUE --> DECISION
    
    DECISION -->|FAILED & count≤5| IMPROVE
    DECISION -->|PASSED or count>5| FINALIZE
    
    IMPROVE --> IMPROVE_PROMPT
    IMPROVE_PROMPT --> IMPROVE_MODEL
    IMPROVE_MODEL --> GEMINI_API
    IMPROVE_MODEL --> IMPROVE_STRUCT
    IMPROVE_STRUCT --> STATE
    IMPROVE --> CRITIQUE
    
    FINALIZE --> FINALIZE_LOGIC
    FINALIZE_LOGIC --> STATE
    FINALIZE --> EXPLAIN
    
    EXPLAIN --> EXPLAIN_DICT
    EXPLAIN_DICT --> DICT_API
    EXPLAIN_DICT --> EXPLAIN_MODEL
    EXPLAIN_MODEL --> GEMINI_API
    EXPLAIN_MODEL --> EXPLAIN_STRUCT
    EXPLAIN_STRUCT --> STATE
    
    EXPLAIN --> END
    
    DIFFICULTY -.->|Configures| WRITE_PROMPT
    DIFFICULTY -.->|Configures| IMPROVE_PROMPT
    
    style START fill:#4f85e5,color:#fff
    style END fill:#4f85e5,color:#fff
    style STATE fill:#e2e8f0,color:#000
    style WRITE fill:#10b981,color:#fff
    style CRITIQUE fill:#f59e0b,color:#fff
    style IMPROVE fill:#8b5cf6,color:#fff
    style FINALIZE fill:#06b6d4,color:#fff
    style EXPLAIN fill:#ec4899,color:#fff
    style DECISION fill:#ef4444,color:#fff
    style GEMINI_API fill:#f7da21,color:#000
    style DICT_API fill:#ff6b6b,color:#fff
```

### Agent Workflow Execution Flow

```mermaid
sequenceDiagram
    participant Backend
    participant Workflow
    participant Writer
    participant Critic
    participant Improver
    participant Finalizer
    participant Explainer
    participant Gemini
    participant DictAPI

    Backend->>Workflow: run_workflow(level, word_list, difficulty)
    Workflow->>Workflow: Initialize State
    
    Note over Workflow: START NODE
    Workflow->>Writer: write_sentence(state)
    Writer->>Writer: Build system prompt
    Writer->>Gemini: Generate sentence
    Gemini-->>Writer: sentence + target_words
    Writer->>Workflow: Update state
    
    Note over Workflow: CRITIQUE NODE
    Workflow->>Critic: critique_sentence(state)
    Critic->>Critic: Run 8 validation checks
    Critic->>Gemini: Validate puzzle logic
    Gemini-->>Critic: PASSED/FAILED + reason
    Critic->>Workflow: Update state with verdict
    
    Note over Workflow: DECISION NODE
    Workflow->>Workflow: should_improve(state)
    
    alt Verdict is FAILED and count ≤ 5
        Note over Workflow: IMPROVE PATH
        Workflow->>Improver: improve_sentence(state)
        Improver->>Improver: Analyze critique feedback
        Improver->>Gemini: Generate improved sentence
        Gemini-->>Improver: new_sentence + new_targets
        Improver->>Workflow: Update state + increment count
        Workflow->>Critic: critique_sentence(state)
        Note over Workflow: Loop back to critique
    else Verdict is PASSED or count > 5
        Note over Workflow: FINALIZE PATH
        Workflow->>Finalizer: finalize_sentence(state)
        Finalizer->>Finalizer: Replace targets with blanks
        Finalizer->>Workflow: Update state with final_sentence
        
        Note over Workflow: EXPLAIN NODE
        Workflow->>Explainer: explain_level(state)
        
        loop For each target word
            Explainer->>DictAPI: GET /entries/en/{word}
            DictAPI-->>Explainer: definitions + phonetics
        end
        
        Explainer->>Explainer: Prepare dictionary data
        Explainer->>Gemini: Extract contextual meanings
        Gemini-->>Explainer: word_details + simplified_sentence
        Explainer->>Workflow: Update state with explanation_deck
    end
    
    Note over Workflow: END NODE
    Workflow-->>Backend: Complete state object

    Backend->>Backend: Store in database
    Backend-->>Frontend: Return level data
```

### Workflow State Transitions

```mermaid
stateDiagram-v2
    [*] --> Writing: START
    
    Writing --> Critiquing: sentence generated
    
    Critiquing --> Deciding: validation complete
    
    Deciding --> Improving: FAILED (count ≤ 5)
    Deciding --> Finalizing: PASSED
    Deciding --> Finalizing: FAILED (count > 5)
    
    Improving --> Critiquing: improved sentence
    
    Finalizing --> Explaining: blanks inserted
    
    Explaining --> [*]: explanation ready
    
    note right of Writing
        Agent: Writer
        Model: Gemini Flash
        Output: sentence + targets
    end note
    
    note right of Critiquing
        Agent: Critic
        Model: Gemini Flash
        Output: verdict + reason
    end note
    
    note right of Improving
        Agent: Improver
        Model: Gemini Flash
        Output: new sentence
        Counter: improved_count++
    end note
    
    note right of Finalizing
        Agent: Finalizer
        Logic: Regex replacement
        Output: display sentence
    end note
    
    note right of Explaining
        Agent: Explainer
        APIs: Dict API + Gemini
        Output: explanation_deck
    end note
```

### Agent Responsibilities & Constraints

|Agent|Primary Goal|Input|Output|Constraints|
|---|---|---|---|---|
|**Writer**|Create educational puzzle sentence|word_list, difficulty_desc|sentence, target_words, explanation|Must use SHOW DON'T TELL principle, no acronyms, no pronouns as targets|
|**Critic**|Validate puzzle quality & correctness|sentence, target_words, word_list|result (PASSED/FAILED), reason|8 critical checks must all pass|
|**Improver**|Fix failed sentences|critique_feedback, original_sentence|new_sentence, new_target_words|Max 5 improvement cycles, must address specific feedback|
|**Finalizer**|Create display version|approved sentence, target_words|final_sentence with blanks|Case-insensitive, word boundary aware|
|**Explainer**|Generate learning content|target_words, sentence, dict_data|word_details, simplified_sentence|Context-specific definitions, phonetics|

### Difficulty Configuration Impact

```mermaid
graph LR
    DIFF[Difficulty Settings]
    
    DIFF --> TC[target_count<br/>1-4 words]
    DIFF --> SL[sentence_length<br/>Short/Medium/Long]
    DIFF --> VG[vocabulary_guidance<br/>Elementary/Middle/Advanced]
    DIFF --> CX[complexity<br/>Casual/Formal/Academic]
    DIFF --> CI[context_instruction<br/>Explicit/Implicit]
    DIFF --> FB[forbidden<br/>Banned patterns]
    
    TC --> WRITE_A[Writer Agent]
    SL --> WRITE_A
    VG --> WRITE_A
    CX --> WRITE_A
    CI --> WRITE_A
    FB --> WRITE_A
    
    TC --> IMPROVE_A[Improver Agent]
    SL --> IMPROVE_A
    VG --> IMPROVE_A
    CX --> IMPROVE_A
    CI --> IMPROVE_A
    FB --> IMPROVE_A
    
    style DIFF fill:#4f85e5,color:#fff
    style WRITE_A fill:#10b981,color:#fff
    style IMPROVE_A fill:#8b5cf6,color:#fff
```

## Core Feature Flows

### 1. User Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Supabase

    User->>Frontend: Sign In/Up
    Frontend->>Backend: POST /sign_in or /sign_up
    Backend->>Supabase: Authenticate user
    Supabase-->>Backend: JWT + Refresh Token
    Backend-->>Frontend: User data + tokens
    Frontend->>Frontend: Store in localStorage
    Frontend->>Backend: GET /user/progress
    Backend->>Supabase: Fetch user data
    Supabase-->>Backend: User progress
    Backend-->>Frontend: Progress data
    Frontend->>Frontend: Load current level
```

### 2. Level Generation Flow

```mermaid
sequenceDiagram
    participant Frontend
    participant Backend
    participant LevelData
    participant Database
    participant AI
    participant DictAPI

    Frontend->>Backend: GET /generate_level/{level}
    Backend->>LevelData: get_level_ids_for_level(level, exclude_id)
    LevelData->>Database: Query level_data WHERE<br/>level_number=X AND<br/>critc_verdict=PASSED
    Database-->>LevelData: List of level IDs
    
    alt Cache Hit (≥2 levels exist)
        LevelData-->>Backend: Return level IDs
        Backend->>Backend: Select random ID
        Backend->>LevelData: fetch_level(level_id)
        LevelData->>Database: SELECT * FROM level_data
        Database-->>LevelData: Complete level data
        LevelData-->>Backend: LevelData object
        Backend-->>Frontend: Cached level with explanation_deck
    else Cache Miss (Generate new level)
        Backend->>Backend: get_seed_word(level)<br/>from seed.txt
        Backend->>Backend: AnagramEngine.get_valid_subwords
        Backend->>AI: Start workflow with word_list
        AI->>AI: Write sentence
        AI->>AI: Critique sentence
        loop Until passed or max iterations
            AI->>AI: Improve sentence
            AI->>AI: Critique again
        end
        AI->>AI: Finalize sentence
        AI->>DictAPI: Fetch word definitions
        DictAPI-->>AI: Definitions + phonetics
        AI->>AI: Generate explanation_deck
        AI-->>Backend: Complete level data
        Backend->>LevelData: store_level(level_data)
        LevelData->>Database: INSERT INTO level_data
        Database-->>LevelData: Stored
        Backend-->>Frontend: New level with explanation_deck
    end
    
    Frontend->>Frontend: setupLevelData()
    Frontend->>Frontend: Render UI
```

### 3. Gameplay Loop

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant UserProg as user.py
    participant LevelProg as level_progress.py
    participant Database

    User->>Frontend: Drag letters to form word
    Frontend->>Frontend: checkWord()<br/>Validate against target_words
    
    alt Word is correct
        Frontend->>Frontend: addFoundWord()<br/>Update gameState
        Frontend->>Frontend: updateSentenceBoard()<br/>Reveal word in sentence
        Frontend->>Frontend: updateFoundWordsUI()
        
        Frontend->>Frontend: checkIfLevelComplete()
        
        alt Level complete
            Frontend->>Frontend: calculateCoins()<br/>Based on time & bonus words
            Frontend->>Frontend: showSuccessModal()<br/>renderLevelBreakdown()
        end
        
        Frontend->>Backend: POST /user/progress<br/>{found_words, bonus_words,<br/>coins, hints, is_completed}
        
        Backend->>UserProg: update_user_progress(user_id, token, data)
        UserProg->>UserProg: Set auth token
        UserProg->>Database: UPDATE user_progress<br/>SET total_coins=X,<br/>hints_remaining=Y<br/>WHERE user_id=Z
        Database-->>UserProg: Success (RLS verified)
        
        Backend->>LevelProg: update_level_progress(user_id, token, data)
        LevelProg->>LevelProg: Set auth token
        LevelProg->>Database: UPSERT level_progress<br/>ON CONFLICT (user_id, level_number)<br/>SET found_words=X, bonus_words=Y
        Database-->>LevelProg: Success (RLS verified)
        
        Backend-->>Frontend: {success: true, coins, hints}
        Frontend->>Frontend: Update UI stats
    else Word is incorrect
        Frontend->>Frontend: showFeedback("Not a target word")
    end
```

### 4. Token Refresh Fallback

```mermaid
sequenceDiagram
    participant Frontend
    participant Backend
    participant Supabase

    Frontend->>Backend: API request with expired token
    Backend-->>Frontend: 401 Unauthorized
    Frontend->>Backend: POST /refresh_token
    Backend->>Supabase: Validate refresh token
    
    alt Refresh token valid
        Supabase-->>Backend: New JWT + Refresh Token
        Backend-->>Frontend: New tokens
        Frontend->>Frontend: Update localStorage
        Frontend->>Backend: Retry original request
    else Refresh token invalid
        Backend-->>Frontend: 401 Unauthorized
        Frontend->>Frontend: Logout user
        Frontend->>Frontend: Load demo level
    end
```

## Tech Stack Summary

|Layer|Technologies|Purpose|
|---|---|---|
|**Frontend**|HTML5, CSS3 (Tailwind), Vanilla JavaScript, Canvas API|Interactive game interface, letter wheel, drag & drop|
|**Backend**|Python FastAPI, Uvicorn, Pydantic|REST API, request validation, business logic|
|**AI/ML**|LangChain, LangGraph, Google Gemini Flash|Multi-agent workflow for puzzle generation & validation|
|**Database**|Supabase (PostgreSQL), Row Level Security|User data, level cache, progress tracking|
|**Auth**|Supabase Auth, JWT, Refresh Tokens|Secure authentication with token rotation|
|**Hosting**|Firebase Hosting (Frontend), Google Cloud Run (Backend)|Global CDN, serverless containerized backend|
|**External**|Dictionary API (dictionaryapi.dev)|Word definitions, phonetics, audio|

## Key Design Patterns

1. **Fallback Mechanisms**
    
    - Token expiry → Automatic refresh
    - No user session → Demo level mode
    - Missing level data → Generate on-demand
    - DB connection issues → Cached responses
2. **State Management**
    
    - Frontend: JavaScript objects (`gameState`, `userState`)
    - Backend: Stateless API with session validation
    - Database: Normalized tables with foreign keys
3. **Database Layer Pattern**
    
    - **Model Files**: Each table has dedicated Pydantic model class
        - `level_data.py` - Level generation and caching
        - `user.py` - User progress and statistics
        - `level_progress.py` - Per-level completion tracking
    - **Centralized Table Names**: `table_names.py` as single source of truth
    - **Smart Caching**: `get_level_ids_for_level()` filters by verdict=PASSED
    - **UPSERT Pattern**: `level_progress.py` uses conflict resolution
    - **Auth Injection**: All user operations pass token for RLS
    - **Lazy Generation**: Create levels only when cache has <2 items
    - **Quality Control**: `report_level()` removes bad puzzles from pool
4. **Security Layers**
    
    - HTTPS only
    - JWT authentication
    - Refresh token rotation
    - Row Level Security (RLS) in database
    - CORS configuration
5. **Performance Optimizations**
    
    - Level caching in database (reduces AI generation calls)
    - Lazy loading of definitions
    - Canvas rendering optimization
    - Anagram pre-computation
    - UPSERT prevents duplicate inserts

## Data Models

### Frontend State

```javascript
gameState = {
    baseWord: String,
    scrambledLetters: Array,
    targetWords: Array,
    allValidWords: Array,
    foundWords: Array,
    bonusWords: Array,
    fullSentence: String,
    sentenceRaw: String,
    explanationDeck: Object
}

userState = {
    isLoggedIn: Boolean,
    authToken: String,
    coins: Number,
    hintsRemaining: Number,
    currentLevel: Number,
    levelId: String
}
```

### Database Schema

```
user_progress (managed by user.py)
├── user_id (PK) - UUID from Supabase Auth
├── current_level - int (default: 1)
├── level_id - str (current puzzle ID)
├── total_coins - int (default: 1000)
└── hints_remaining - int (default: 3)
Operations: create_user_progress, get_user_progress, update_user_progress

level_progress (managed by level_progress.py)
├── user_id (PK) - UUID from Supabase Auth
├── level_id (PK) - UUID of specific puzzle
├── level_number - int
├── found_words - JSON array
├── bonus_words - JSON array
├── is_completed - boolean (default: false)
└── completed_at - timestamp (nullable)
Operations: update_level_progress (UPSERT on conflict)

level_data (managed by level_data.py)
├── level_id (PK) - UUID
├── level_number - int
├── base_word - str (seed word)
├── word_list - JSON array (all valid anagrams)
├── target_words - JSON array (answer key)
├── sentence - str (original sentence)
├── final_sentence - str (with blanks)
├── improved_count - int (AI revision cycles)
├── critc_verdict - str (PASSED/FAILED)
├── critc_verdict_reason - str
└── explanation_deck - JSON (nullable, TargetWordsUsageAgentOutputStructure)
Operations: store_level, get_level_ids_for_level, fetch_level, report_level

word_timestamps (referenced in table_names.py)
└── Analytics table for tracking word discovery times

Table names centralized in table_names.py:
- Tables.user_progress
- Tables.level_progress
- Tables.level_data
- Tables.word_timestamps
```

### Key Database Features

1. **Level Caching Strategy** (level_data.py)
    
    - `get_level_ids_for_level()` only returns PASSED levels
    - Filters out reported/failed levels automatically
    - Supports `exclude_id` parameter to avoid returning same level after report
    - Backend generates new level only if <2 cached levels exist
2. **User Progress Tracking** (user.py)
    
    - New users start with 1000 coins, 3 hints
    - Random level_id assigned from existing level pool
    - Auth token passed to enable RLS verification
    - `update_user_progress()` updates coins and hints
3. **Level State Management** (level_progress.py)
    
    - UPSERT pattern prevents duplicate entries
    - Conflict resolution on (user_id, level_number)
    - Tracks found_words and bonus_words separately
    - `get_level_progress()` returns default state if not found
4. **Level Reporting Mechanism** (level_data.py)
    
    - `report_level()` marks level as FAILED
    - Appends "[REPORTED BY USER]" to verdict reason
    - Reported levels excluded from future caching
    - Frontend calls `/report_level/{level_id}` then loads new level with `exclude_id`
5. **Row Level Security**
    
    - All user-specific queries use `supabase.postgrest.auth(token)`
    - Database policies check `auth.uid()` matches `user_id`
    - Prevents users from accessing/modifying other users' data

## System Metrics & Constraints

- **Frontend**: Mobile-first responsive design, touch-optimized
- **Backend**: Containerized FastAPI on Cloud Run, auto-scaling
- **AI Generation**: Max 5 improvement cycles, ~10-30s generation time
- **Database**: Row-level security, real-time subscriptions disabled
- **Auth**: Access tokens expire in 1 hour, refresh tokens rotate
- **Dictionary**: 10,000 word English dictionary, O(1) lookup
