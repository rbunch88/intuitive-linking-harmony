import { motion } from "framer-motion";
import { Settings2, Image, FileText, RotateCcw, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: message }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm a simulated AI response. This is just a placeholder response to demonstrate the UI." 
      }]);
    }, 1000);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-[#1C1F21] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-xl font-semibold">Claude</h1>
        <div className="flex items-center space-x-2">
          <span className="text-indigo-400">Professional Plan</span>
          <Button variant="ghost" size="icon">
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-auto p-4 space-y-6">
        {/* Welcome Message */}
        <div className="flex items-center space-x-2 text-4xl font-light">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8"
          >
            <div className="w-full h-full rounded-full border-2 border-[#E88B5E] border-t-transparent" />
          </motion.div>
          <h2>Good afternoon</h2>
        </div>

        {/* Messages */}
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-2xl p-4 rounded-lg ${
                msg.role === "assistant" ? "bg-gray-800" : "bg-indigo-600"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-4 border-t border-gray-800">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can Claude help you today?"
              className="w-full bg-gray-800 border-gray-700 text-white pl-4 pr-20 py-3 rounded-lg"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Image className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <FileText className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-4 flex items-center space-x-4">
            <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700">
              Provide stakeholder perspective
            </Button>
            <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700">
              Extract insights from report
            </Button>
            <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700">
              Polish your prose
            </Button>
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default Index;