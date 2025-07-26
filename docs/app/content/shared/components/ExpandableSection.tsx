"use client";

import { useState, ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export function ExpandableSection({
  title,
  children,
  defaultExpanded = false,
  className,
  triggerClassName,
  contentClassName,
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center justify-between w-full p-4 text-left font-medium hover:bg-muted/50 transition-colors",
          triggerClassName
        )}
        aria-expanded={isExpanded}
      >
        <span className="text-sm font-semibold">{title}</span>
        {isExpanded ? (
          <ChevronDown className="size-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="size-4 text-muted-foreground" />
        )}
      </button>
      
      {isExpanded && (
        <div className={cn("px-4 pb-4 border-t bg-muted/20", contentClassName)}>
          {children}
        </div>
      )}
    </div>
  );
}