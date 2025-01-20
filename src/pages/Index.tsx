import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WritingStyleSelector } from "@/components/chat/WritingStyleSelector";
import { MessageInput } from "@/components/chat/MessageInput";
import { QuickActions } from "@/components/chat/QuickActions";
import { WritingStyle, Message } from "@/types/chat";

const defaultStyles: WritingStyle[] = [
  { id: "default", name: "Normal", description: "Default responses" },
  { id: "concise", name: "Concise", description: "Brief and to the point" },
  { id: "explanatory", name: "Explanatory", description: "Detailed explanations" },
  { id: "formal", name: "Formal", description: "Professional and formal tone" },
  { id: "storyteller", name: "Intellectual Storyteller", description: "Engaging narrative style" },
  { id: "sales", name: "Sales Catalyst", description: "Persuasive and action-oriented" },
];

const Index = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [writingStyle, setWritingStyle] = useState<WritingStyle>(defaultStyles[0]);
  const [styles, setStyles] = useState<WritingStyle[]>(defaultStyles);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: message }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm a simulated AI response. This is just a placeholder response to demonstrate the UI." 
      }]);
    }, 1000);
    setMessage("");
  };

  const handleAddStyle = (newStyle: Partial<WritingStyle>) => {
    if (newStyle.name && newStyle.description) {
      const style: WritingStyle = {
        id: newStyle.name.toLowerCase().replace(/\s+/g, '-'),
        name: newStyle.name,
        description: newStyle.description,
      };
      setStyles(prev => [...prev, style]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">Claude</h1>
        <div className="flex items-center space-x-2">
          <span className="text-primary hidden sm:inline">Professional Plan</span>
          <Button variant="ghost" size="icon">
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-2 sm:p-4 space-y-4 sm:space-y-6">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 text-orange-400"
          >
            ✱
          </motion.div>
          <h2 className="text-2xl sm:text-4xl font-light">Good afternoon</h2>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[85%] sm:max-w-2xl p-3 sm:p-4 rounded-lg ${
                msg.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t bg-muted/50">
        <MessageInput
          message={message}
          onMessageChange={setMessage}
          onSubmit={handleSubmit}
        />
        <div className="max-w-4xl mx-auto px-2 sm:px-4 pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <WritingStyleSelector
                styles={styles}
                selectedStyle={writingStyle}
                onStyleSelect={setWritingStyle}
                onAddStyle={handleAddStyle}
              />
            </div>
            <QuickActions />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;