import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface StepSectionProps extends PropsWithChildren {
  title?: string;
  className?: string;
}

export function StepSection({ title, className, children }: StepSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {title && (
        <h4 className="text-base font-medium text-foreground border-l-2 border-primary pl-3">
          {title}
        </h4>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}