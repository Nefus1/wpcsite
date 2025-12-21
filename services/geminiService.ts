import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Initialize Gemini Client with mandatory named parameter
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "WPC Legal Assistant", an expert AI intake specialist for Western Pacific Counsel, a premier California law firm. 

Your goals:
1. Briefly greet the user.
2. Conversational Intake: Gather key details about their legal matter (What happened? When? Where? Who is involved?).
3. Scope: We handle Personal Injury, Employment Law, Estate Planning, and Business Litigation in Southern California (IE, LA, OC).
4. Disclaimer: You are NOT an attorney and cannot provide legal advice.
5. Action: If the user describes a potential case, suggest transferring the details to our secure contact form for attorney review.

Professional, empathetic, and concise. Avoid long paragraphs.
`;

export const streamChatResponse = async (
  history: { role: string; text: string }[],
  newMessage: string,
  onChunk: (text: string) => void
) => {
  if (!API_KEY) {
    onChunk("Error: API Key is missing. Please check your configuration.");
    return;
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessageStream({ message: newMessage });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n\n(System: I apologize, but I am currently experiencing high traffic. Please try again or use the contact form.)");
  }
};

export const summarizeChat = async (history: { role: string; text: string }[]) => {
  if (!API_KEY) return "Summary unavailable (API Key missing)";

  try {
    const conversation = history.map(m => `${m.role === 'model' ? 'Assistant' : 'User'}: ${m.text}`).join('\n');
    const prompt = `Based on the following intake conversation, provide a structured summary for a law firm partner. 
    Include:
    - Primary Legal Issue
    - Incident Date/Location (if mentioned)
    - Key Facts
    - User's Desired Outcome
    
    Format as a clean, professional report.
    
    Conversation:
    ${conversation}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Summary failed", error);
    return "Error generating summary.";
  }
};