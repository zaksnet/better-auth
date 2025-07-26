import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep?: string;
  className?: string;
}

export function StepIndicator({ 
  steps, 
  currentStep, 
  className 
}: StepIndicatorProps) {
  const currentIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className={cn("mb-8", className)}>
      <nav aria-label="Progress">
        <ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => {
            const isCompleted = step.completed || index < currentIndex;
            const isCurrent = step.id === currentStep;
            const isUpcoming = !isCompleted && !isCurrent;

            return (
              <li key={step.id} className="md:flex-1">
                <div className={cn(
                  "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                  isCompleted && "border-green-600",
                  isCurrent && "border-primary",
                  isUpcoming && "border-muted-foreground/30"
                )}>
                  <span className="flex items-center text-sm font-medium">
                    <span className={cn(
                      "mr-2 flex h-6 w-6 items-center justify-center rounded-full text-xs",
                      isCompleted && "bg-green-600 text-white",
                      isCurrent && "bg-primary text-primary-foreground",
                      isUpcoming && "bg-muted text-muted-foreground"
                    )}>
                      {isCompleted ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </span>
                    <span className={cn(
                      isCompleted && "text-green-600",
                      isCurrent && "text-primary",
                      isUpcoming && "text-muted-foreground"
                    )}>
                      {step.title}
                    </span>
                  </span>
                  {step.description && (
                    <span className="mt-1 text-xs text-muted-foreground">
                      {step.description}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}