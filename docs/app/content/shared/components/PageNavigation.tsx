import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageLink {
  title: string;
  href: string;
  description?: string;
}

interface PageNavigationProps {
  previous?: PageLink;
  next?: PageLink;
  className?: string;
}

export function PageNavigation({ previous, next, className }: PageNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav className={cn("flex items-center justify-between pt-8 mt-12 border-t", className)}>
      <div className="flex-1">
        {previous && (
          <a
            href={previous.href}
            className="group flex items-center gap-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors text-left max-w-sm"
          >
            <ChevronLeft className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div className="min-w-0">
              <div className="text-xs font-medium text-muted-foreground mb-1">Previous</div>
              <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                {previous.title}
              </div>
              {previous.description && (
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {previous.description}
                </div>
              )}
            </div>
          </a>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {next && (
          <a
            href={next.href}
            className="group flex items-center gap-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors text-right max-w-sm"
          >
            <div className="min-w-0">
              <div className="text-xs font-medium text-muted-foreground mb-1">Next</div>
              <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                {next.title}
              </div>
              {next.description && (
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {next.description}
                </div>
              )}
            </div>
            <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
        )}
      </div>
    </nav>
  );
}