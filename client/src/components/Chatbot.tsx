import { useState, useEffect, useRef } from "react";
import { sendChatMessage, initialMessage, type ChatMessage } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";
import gsap from "gsap";
import { MessagesSquare, X, Send, Bot } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { theme } = useTheme();
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Animate new messages
  useEffect(() => {
    if (messages.length > 0 && isOpen) {
      gsap.from(".chat-bubble:last-child", {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [messages, isOpen]);
  
  // Animate chatbot open/close
  useEffect(() => {
    const chatbox = document.getElementById('chatbox');
    if (chatbox) {
      if (isOpen) {
        gsap.to(chatbox, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      } else {
        gsap.to(chatbox, {
          scale: 0.95,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in"
        });
      }
    }
  }, [isOpen]);
  
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
    <div className="z-50">
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`size-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 ${
          isOpen ? "bg-accent text-accent-foreground rotate-90" : "bg-primary text-primary-foreground"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessagesSquare size={24} />}
      </button>
      
      {/* Chat panel */}
      <div 
        id="chatbox"
        className={`absolute bottom-16 right-0 w-80 md:w-96 rounded-2xl shadow-xl overflow-hidden card-3d bg-card opacity-0 scale-95 origin-bottom-right`}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="p-4 bg-primary text-primary-foreground">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold font-display">AI Assistant</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div 
          ref={messagesContainerRef}
          className="h-80 overflow-y-auto p-4 bg-card" 
          id="chat-messages"
        >
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex mb-4 ${message.role === "user" ? "justify-end" : ""}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot size={16} className="text-primary" />
                </div>
              )}
              
              <div 
                className={`max-w-[85%] rounded-xl p-3 chat-bubble ${
                  message.role === "user" 
                    ? "bg-primary/10" 
                    : "bg-muted"
                }`}
              >
                <p className="text-sm text-foreground">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 flex-shrink-0">
                <Bot size={16} className="text-primary" />
              </div>
              <div className="max-w-[85%] bg-muted rounded-xl p-3 chat-bubble">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-3 border-t border-border bg-card">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 py-2 px-3 bg-muted rounded-md focus:outline-none focus:ring-1 focus:ring-primary" 
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70"
              disabled={isLoading}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
