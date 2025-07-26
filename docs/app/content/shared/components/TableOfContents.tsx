"use client";

import { useEffect, useState } from "react";
import { List, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Find all headings with IDs on the page
    const headings = document.querySelectorAll("h2[id], h3[id], h4[id]");
    const items: TocItem[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      title: heading.textContent || "",
      level: parseInt(heading.tagName.substring(1)),
    }));
    
    setTocItems(items);

    // Set up intersection observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -80% 0%",
        threshold: 0,
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (tocItems.length === 0) return null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentSection = tocItems.find(item => item.id === activeId);
  const currentSectionIndex = tocItems.findIndex(item => item.id === activeId);

  return (
    <div className={cn("fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block", className)}>
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg max-w-xs">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 w-full p-3 text-sm font-medium hover:bg-muted/50 transition-colors rounded-t-lg"
        >
          <List className="size-4" />
          <span>Contents</span>
          <ChevronRight 
            className={cn(
              "size-4 ml-auto transition-transform",
              isExpanded && "rotate-90"
            )} 
          />
        </button>
        
        {!isExpanded && currentSection && (
          <div className="px-3 pb-3">
            <div className="text-xs text-muted-foreground mb-1">
              {currentSectionIndex + 1} of {tocItems.length}
            </div>
            <div className="text-xs font-medium text-foreground">
              {currentSection.title}
            </div>
          </div>
        )}
        
        {isExpanded && (
          <nav className="max-h-96 overflow-y-auto border-t">
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2 px-2">
                {tocItems.length} sections • {currentSectionIndex + 1} of {tocItems.length} active
              </div>
              <ul className="space-y-1">
                {tocItems.map((item, index) => {
                  const isActive = activeId === item.id;
                  const isPassed = index < currentSectionIndex;
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "block w-full text-left text-xs px-2 py-1.5 rounded hover:bg-muted/50 transition-colors relative",
                          item.level === 2 && "font-medium",
                          item.level === 3 && "pl-4 text-muted-foreground",
                          item.level === 4 && "pl-6 text-muted-foreground",
                          isActive && "bg-primary/10 text-primary font-medium",
                          isPassed && "text-green-600 dark:text-green-400"
                        )}
                      >
                        {isPassed && (
                          <span className="absolute left-0.5 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400">
                            ✓
                          </span>
                        )}
                        <span className={cn(isPassed && "ml-3")}>
                          {item.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}