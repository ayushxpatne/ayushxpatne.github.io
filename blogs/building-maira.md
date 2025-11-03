## Introduction

Building an AI companion that feels genuinely helpful and emotionally aware is harder than it sounds. After months of experimentation with Gemini 2.0, Flutter, and Firebase, I finally shipped Maira—an AI assistant that remembers context, understands emotions, and maintains meaningful conversations over time.

This post breaks down the architecture, challenges, and key learnings from building a production-ready conversational AI system.

## The Problem: Context and Memory

Most AI chatbots suffer from amnesia. They forget what you told them five messages ago, let alone last week. This breaks the illusion of talking to something "intelligent."

The core challenge was: **How do you give an AI long-term memory without running out of context window?**

### Initial Approach

My first attempt was naive:
- Store every conversation in Firebase
- Load all messages on app start
- Pass them to Gemini

This worked... until it didn't. After about 50 messages, the app became sluggish, and Gemini's context window started hitting limits.

```python
# Don't do this
def get_conversation_history():
    messages = db.collection('messages').get()
    return [msg.to_dict() for msg in messages]  # Returns 1000+ messages
```

## The Solution: Embeddings + Timeline Architecture

I needed a smarter approach. Enter **embedding-based memory retrieval**.

### How it Works

1. **Store conversations as embeddings**: Every message gets converted to a vector using Gemini's embedding model
2. **Semantic search**: When a user asks something, find the top-K most relevant past messages
3. **Timeline markers**: Store important events (first meeting, user preferences) separately
4. **Context window management**: Only load what's relevant + timeline markers

```javascript
// Simplified embedding storage
async function storeMessage(message) {
  const embedding = await getEmbedding(message.text);
  
  await db.collection('messages').add({
    text: message.text,
    embedding: embedding,
    timestamp: new Date(),
    importance: calculateImportance(message)
  });
}
```

### Results

- **10x reduction** in context size
- Conversations feel natural even after weeks
- App stays responsive with 1000+ stored messages

## Emotional Intelligence Layer

Making Maira emotionally aware required more than just sentiment analysis. I built a system that:

1. **Detects emotional state** from text
2. **Tracks mood over time**
3. **Adjusts tone** based on user's emotional state

### Implementation

```javascript
function analyzeEmotion(text) {
  // Using Gemini for nuanced emotion detection
  const prompt = `Analyze the emotional tone of: "${text}"
  Return JSON: {"primary": "happy/sad/anxious/...", "intensity": 0-10}`;
  
  return callGemini(prompt);
}
```

This feeds into the conversation prompt, allowing Maira to be empathetic when needed and celebratory when appropriate.

## The Tech Stack

- **Frontend**: Flutter (cross-platform iOS/Android)
- **Backend**: Firebase (Firestore + Cloud Functions)
- **AI Model**: Gemini 2.0 Flash
- **State Management**: GetX
- **Vector Storage**: Firebase with custom indexing

![Architecture Diagram](../images/maira-architecture.png)

## Key Learnings

### 1. Prompt Engineering is 80% of the Work

The difference between a mediocre and great AI companion is in the prompt. I spent more time iterating on prompts than writing code.

**Bad prompt:**
```
You are an AI assistant. Answer the user's question.
```

**Good prompt:**
```
You are Maira, a supportive AI companion. The user has been feeling stressed about work lately (see timeline). Respond with warmth and practical suggestions. Keep responses under 3 sentences unless asked for detail.
```

### 2. Embeddings Are Magic

Semantic search with embeddings is incredibly powerful. Instead of keyword matching, you get actual meaning-based retrieval.

Example: User asks "How do I deal with burnout?" → Retrieves their message from 2 weeks ago about feeling overwhelmed at work.

### 3. Latency Matters

Users expect instant responses. Optimizations I made:
- Streaming responses (show text as it generates)
- Preload embeddings for likely next queries
- Aggressive caching of common patterns

## Challenges and Failures

### The Hallucination Problem

Early versions of Maira would occasionally "remember" conversations that never happened. This was due to:
- Overly aggressive semantic matching
- No timestamp validation
- Gemini filling in gaps creatively

**Fix**: Added strict timestamp checks and relevance thresholds.

### The Cold Start Problem

New users had no context, making early conversations feel robotic.

**Fix**: Created an onboarding flow that extracts key info (interests, goals, communication style) in first 5 minutes.

## What's Next

Current features I'm building:
- Voice mode using Gemini's multimodal capabilities
- Daily check-ins and mood tracking
- Integration with calendar for proactive suggestions
- Shared memories for couples/families

## Conclusion

Building Maira taught me that creating truly intelligent AI systems requires:
1. Understanding the problem deeply
2. Smart architecture (embeddings > brute force)
3. Obsessive prompt engineering
4. Real user testing

If you're building conversational AI, focus on memory and context first. Everything else is polish.

---

**GitHub**: [Check out the code](https://github.com/ayushxpatne/maira) (if you're interested in the implementation details)

**Try Maira**: [Download on iOS](https://apps.apple.com/...) | [Android](https://play.google.com/...)

Questions? Reach out on [LinkedIn](https://linkedin.com/in/ayushpatne) or [email me](mailto:ayushpatne@gmail.com).