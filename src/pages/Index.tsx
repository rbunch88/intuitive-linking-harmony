import { motion } from "framer-motion";
import { Settings2, Image, FileText, RotateCcw, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [writingStyle, setWritingStyle] = useState("default");

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
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">Claude</h1>
        <div className="flex items-center space-x-2">
          <span className="text-primary">Professional Plan</span>
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
            <div className="w-full h-full rounded-full border-2 border-primary border-t-transparent" />
          </motion.div>
          <h2>Good afternoon</h2>
        </div>

        {/* Writing Style Selection */}
        <div className="max-w-2xl mx-auto bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Choose writing style</h3>
          <RadioGroup
            defaultValue="default"
            value={writingStyle}
            onValueChange={setWritingStyle}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { value: "default", label: "Default", description: "Clear and direct communication" },
              { value: "casual", label: "Casual", description: "Friendly and conversational" },
              { value: "professional", label: "Professional", description: "Formal and business-like" },
              { value: "academic", label: "Academic", description: "Scholarly and research-oriented" },
              { value: "creative", label: "Creative", description: "Imaginative and expressive" },
              { value: "technical", label: "Technical", description: "Precise and detailed" },
            ].map((style) => (
              <div key={style.value} className="flex items-start space-x-3 p-4 rounded-lg bg-background hover:bg-accent cursor-pointer">
                <RadioGroupItem value={style.value} id={style.value} className="mt-1" />
                <Label htmlFor={style.value} className="flex-1 cursor-pointer">
                  <div className="font-medium mb-1">{style.label}</div>
                  <div className="text-sm text-muted-foreground">{style.description}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Messages */}
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-2xl p-4 rounded-lg ${
                msg.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-4 border-t">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can Claude help you today?"
              className="w-full pl-4 pr-20 py-3 rounded-lg"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <Button type="button" variant="ghost" size="icon">
                <Image className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <FileText className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-4 flex items-center space-x-4 overflow-x-auto pb-2">
            <Button variant="secondary">
              Provide stakeholder perspective
            </Button>
            <Button variant="secondary">
              Extract insights from report
            </Button>
            <Button variant="secondary">
              Polish your prose
            </Button>
            <div className="flex-1" />
            <Button variant="ghost" size="icon">
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default Index;