import { apiRequest } from "./queryClient";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  success: boolean;
  message: string;
  sessionId: string;
}

// Send a chat message to the backend
export const sendChatMessage = async (message: string, sessionId?: string): Promise<ChatResponse> => {
  const response = await apiRequest("POST", "/api/chat", { message, sessionId });
  return await response.json();
};

// Initial chatbot message
export const initialMessage: ChatMessage = {
  role: "assistant",
  content: "Hi there! 👋 I'm Hrishikesh's AI assistant. How can I help you learn more about his work in AI/ML and UI/UX development?"
};
