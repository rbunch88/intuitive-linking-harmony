import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { Camera, FileImage, Link as LinkIcon } from "lucide-react";

interface MessageInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const MessageInput = ({ message, onMessageChange, onSubmit }: MessageInputProps) => {
  const isMobile = useIsMobile();

  return (
    <form onSubmit={onSubmit} className="max-w-4xl mx-auto p-2 sm:p-4">
      <div className="space-y-3 sm:space-y-4">
        <div className="relative bg-background rounded-lg border">
          <Textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="How can I help you today?"
            className="min-h-[80px] sm:min-h-[100px] p-3 sm:p-4 pr-20 sm:pr-24 resize-none"
          />
          <div className="absolute right-2 bottom-2 flex items-center space-x-1 sm:space-x-2">
            <Button type="button" variant="ghost" size={isMobile ? "sm" : "icon"} className="text-muted-foreground">
              <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button type="button" variant="ghost" size={isMobile ? "sm" : "icon"} className="text-muted-foreground">
              <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button type="button" variant="ghost" size={isMobile ? "sm" : "icon"} className="text-muted-foreground">
              <FileImage className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};