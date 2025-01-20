import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.ComponentProps<typeof motion.div> {
  className?: string;
}

const DesktopSidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <motion.div
      className={cn(
        "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:w-72 lg:pb-4 lg:bg-sidebar lg:border-r lg:border-sidebar-border",
        className
      )}
      {...props}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold text-sidebar-foreground">
            Navigation
          </h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MobileSidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <motion.div
      className={cn(
        "lg:hidden fixed inset-0 z-50 bg-sidebar/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-sidebar border-r border-sidebar-border">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold text-sidebar-foreground">
              Navigation
            </h2>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};