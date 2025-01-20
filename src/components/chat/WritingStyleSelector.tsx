import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WritingStyle } from "@/types/chat";

interface WritingStyleSelectorProps {
  styles: WritingStyle[];
  selectedStyle: WritingStyle;
  onStyleSelect: (style: WritingStyle) => void;
  onAddStyle: (style: Partial<WritingStyle>) => void;
}

export const WritingStyleSelector = ({
  styles,
  selectedStyle,
  onStyleSelect,
  onAddStyle,
}: WritingStyleSelectorProps) => {
  const [newStyle, setNewStyle] = React.useState<Partial<WritingStyle>>({ name: "", description: "" });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 w-full sm:w-auto">
          <span>Choose style</span>
          <span className="text-muted-foreground">▼</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {styles.map((style) => (
          <DropdownMenuItem
            key={style.id}
            onClick={() => onStyleSelect(style)}
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
                Add a new writing style to customize responses
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
              <Button onClick={() => {
                onAddStyle(newStyle);
                setNewStyle({ name: "", description: "" });
              }}>Add Style</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};