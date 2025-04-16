import { useState, useEffect, useRef } from "react";
import { sendChatMessage, initialMessage, type ChatMessage } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";
import gsap from "gsap";

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Animate new messages
  useEffect(() => {
    if (messages.length > 0) {
      gsap.from(".chat-bubble:last-child", {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await sendChatMessage(inputMessage, sessionId);
      
      // Save session ID for future messages
      if (response.sessionId) {
        setSessionId(response.sessionId);
      }
      
      // Add AI response to chat
      const aiMessage: ChatMessage = {
        role: "assistant",
        content: response.message
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden card-3d">
          <div className="p-6 md:p-8 bg-primary text-white">
            <h2 className="text-2xl md:text-3xl font-bold font-display">AI Assistant</h2>
            <p className="opacity-90">Ask me anything about Hrishikesh's work or skills</p>
          </div>
          
          <div 
            ref={messagesContainerRef}
            className="p-6 md:p-8 h-96 overflow-y-auto" 
            id="chat-messages"
          >
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex mb-4 ${message.role === "user" ? "justify-end" : ""}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <i className="fas fa-robot text-primary"></i>
                  </div>
                )}
                
                <div 
                  className={`max-w-xs md:max-w-md ${
                    message.role === "user" 
                      ? "bg-primary/10 text-dark" 
                      : "bg-gray-100"
                  } rounded-xl p-3 chat-bubble`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-robot text-primary"></i>
                </div>
                <div className="max-w-xs md:max-w-md bg-gray-100 rounded-xl p-3 chat-bubble">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 py-3 px-4 bg-gray-100 rounded-l-lg focus:outline-none" 
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="bg-primary text-white py-3 px-6 rounded-r-lg hover:bg-primary/90 transition-colors disabled:opacity-70"
                disabled={isLoading}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
