import { motion } from "framer-motion";
import { Settings2, Image, FileText, RotateCcw, X, Link as LinkIcon, Camera, FileImage } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WritingStyle {
  id: string;
  name: string;
  description: string;
}

const defaultStyles: WritingStyle[] = [
  { id: "default", name: "Normal", description: "Default responses from Claude" },
  { id: "concise", name: "Concise", description: "Brief and to the point" },
  { id: "explanatory", name: "Explanatory", description: "Detailed explanations" },
  { id: "formal", name: "Formal", description: "Professional and formal tone" },
  { id: "storyteller", name: "Intellectual Storyteller", description: "Engaging narrative style" },
  { id: "sales", name: "Sales Catalyst", description: "Persuasive and action-oriented" },
];

const Index = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [writingStyle, setWritingStyle] = useState<WritingStyle>(defaultStyles[0]);
  const [styles, setStyles] = useState<WritingStyle[]>(defaultStyles);
  const [newStyle, setNewStyle] = useState<Partial<WritingStyle>>({ name: "", description: "" });

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

  const handleAddStyle = () => {
    if (newStyle.name && newStyle.description) {
      const style: WritingStyle = {
        id: newStyle.name.toLowerCase().replace(/\s+/g, '-'),
        name: newStyle.name,
        description: newStyle.description,
      };
      setStyles(prev => [...prev, style]);
      setNewStyle({ name: "", description: "" });
    }
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
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 text-orange-400"
          >
            ✱
          </motion.div>
          <h2 className="text-4xl font-light">Good afternoon</h2>
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
      <footer className="border-t bg-muted/50">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
          <div className="space-y-4">
            {/* Input with Tools */}
            <div className="relative bg-background rounded-lg border">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can Claude help you today?"
                className="min-h-[100px] p-4 pr-24 resize-none"
              />
              <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
                  <LinkIcon className="h-5 w-5" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
                  <Camera className="h-5 w-5" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
                  <FileImage className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Writing Style and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <span>Choose style</span>
                      <span className="text-muted-foreground">▼</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {styles.map((style) => (
                      <DropdownMenuItem
                        key={style.id}
                        onClick={() => setWritingStyle(style)}
                        className="flex flex-col items-start"
                      >
                        <span className="font-medium">{style.name}</span>
                        <span className="text-sm text-muted-foreground">{style.description}</span>
                      </DropdownMenuItem>
                    ))}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start">
                          Create & Edit Styles
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Writing Style</DialogTitle>
                          <DialogDescription>
                            Add a new writing style to customize Claude's responses
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Style Name</Label>
                            <Input
                              id="name"
                              value={newStyle.name}
                              onChange={(e) => setNewStyle(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                              id="description"
                              value={newStyle.description}
                              onChange={(e) => setNewStyle(prev => ({ ...prev, description: e.target.value }))}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleAddStyle}>Add Style</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm">
                  Provide stakeholder perspective
                </Button>
                <Button variant="secondary" size="sm">
                  Extract insights from report
                </Button>
                <Button variant="secondary" size="sm">
                  Polish your prose
                </Button>
                <Button variant="ghost" size="icon">
                  <RotateCcw className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default Index;