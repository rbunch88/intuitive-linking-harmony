import { useAutoResizeTextarea } from "@/components/hooks/use-auto-resize-textarea";
import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface AutoResizeTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: number;
  maxHeight?: number;
}

export function AutoResizeTextarea({ 
  value, 
  onChange, 
  placeholder,
  className,
  minHeight = 100,
  maxHeight = 400
}: AutoResizeTextareaProps) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    adjustHeight();
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn(
        "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    />
  );
}