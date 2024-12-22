import { DBdata } from "@/data/data";

export function generatePrompt(userQuery: string) {
    // Aggregate all text from DBdata
    const context = DBdata.map(entry => entry.text).join('\n\n');

    // Create a dynamic prompt
    const prompt = `
You are an advanced AI assistant with expertise in operating systems concepts. Use the following reference text, which contains multiple sections, to answer user queries accurately:

### Reference Text:
${context}

### User Query:
"${userQuery}"

### Task:
1. Refer to the reference text.
2. Search the reference text for relevant sections.
3. Generate a concise and clear response directly answering the query.
4. If the query is unclear, ask a clarifying question.

### Example Query and Response:
**User Query:** "Explain Producer-Consumer Problem."
**Response:** "The Producer-Consumer Problem is a classic synchronization problem where producers generate data and place it in a shared buffer, while consumers retrieve it. Synchronization is achieved using semaphores: Empty, Full, and Mutex."

Now respond to the user's query.
`;

    return prompt;
}