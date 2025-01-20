import { Button } from "@/components/ui/button";
import { RotateCcw, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const QuickActions = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
      <Button variant="secondary" size="sm" className="flex-1 sm:flex-none whitespace-nowrap">
        Stakeholder view
      </Button>
      <Button variant="secondary" size="sm" className="flex-1 sm:flex-none whitespace-nowrap">
        Extract insights
      </Button>
      <Button variant="secondary" size="sm" className="flex-1 sm:flex-none whitespace-nowrap">
        Polish prose
      </Button>
      <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
        <RotateCcw className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};