import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Initialize Gemini Client
// Note: In a real production app, you might proxy this through a backend to hide the key,
// but for this client-side demo, we use the env var directly as per instructions.
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "WPC Legal Assistant", an AI intake specialist for Western Pacific Counsel, a California law firm serving the Inland Empire, LA, and Orange County. 

Your role is to:
1. Briefly greet the user and ask how you can help with their legal inquiry.
2. Collect basic information about their legal issue (e.g., type of case, location, timeline) in a conversational manner.
3. Provide general information about common legal topics (Personal Injury, Estate Planning, Business Law) if asked.
4. IMPORTANT: You are NOT a lawyer. You cannot give legal advice. You must explicitly state this if the user asks for specific legal strategy or outcomes.
5. Keep responses professional, concise, and empathetic.
6. If the user seems ready to proceed, encourage them to fill out the contact form or call the office.

Tone: Professional, modern, calm, and authoritative yet accessible.
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
      model: 'gemini-2.5-flash',
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
    const prompt = `Please summarize the following conversation between a legal assistant AI and a potential client. 
    Focus on the user's legal issue, location, and any specific details provided. 
    Format it as a concise note for an attorney to review before contacting the client.
    
    Conversation:
    ${conversation}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Summary failed", error);
    return "Error generating summary.";
  }
};