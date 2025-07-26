"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstallationStep {
  id: string;
  title: string;
  shortTitle: string;
  section: 'getting-started' | 'basic-usage' | 'done';
}

interface InstallationProgressProps {
  className?: string;
}

const installationSteps: InstallationStep[] = [
  {
    id: "prerequisites",
    title: "Prerequisites",
    shortTitle: "Prerequisites",
    section: "getting-started"
  },
  {
    id: "install-component",
    title: "Install Component",
    shortTitle: "Install",
    section: "getting-started"
  },
  {
    id: "set-environment-variables", 
    title: "Environment Setup",
    shortTitle: "Environment",
    section: "getting-started"
  },
  {
    id: "better-auth-instance",
    title: "Initialize Auth",
    shortTitle: "Initialize",
    section: "getting-started"
  },
  {
    id: "create-better-auth-client",
    title: "Client Setup", 
    shortTitle: "Client",
    section: "getting-started"
  },
  {
    id: "mount-handlers",
    title: "Mount Handlers",
    shortTitle: "Handlers",
    section: "getting-started"
  },
  {
    id: "setup-convex-client",
    title: "Provider Setup",
    shortTitle: "Provider", 
    section: "getting-started"
  },
  {
    id: "basic-usage-signing-in",
    title: "Test Authentication",
    shortTitle: "Test Auth",
    section: "basic-usage"
  }
];

export function InstallationProgress({ className }: InstallationProgressProps) {
  const [currentStep, setCurrentStep] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepFound = installationSteps.find(step => step.id === entry.target.id);
            if (stepFound) {
              setCurrentStep(entry.target.id);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0% -70% 0%",
        threshold: 0,
      }
    );

    // Observe installation step elements
    installationSteps.forEach(step => {
      const element = document.getElementById(step.id);
      if (element) observer.observe(element);
    });

    // Show after scrolling past intro
    const handleScroll = () => {
      const gettingStarted = document.getElementById('getting-started');
      if (gettingStarted) {
        const rect = gettingStarted.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight / 2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentIndex = installationSteps.findIndex(step => step.id === currentStep);
  const previousStep = currentIndex > 0 ? installationSteps[currentIndex - 1] : null;
  const nextStep = currentIndex < installationSteps.length - 1 ? installationSteps[currentIndex + 1] : null;
  const completedSteps = currentIndex;

  const scrollToStep = (stepId: string) => {
    const element = document.getElementById(stepId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50",
      "transition-opacity duration-300",
      isVisible ? "opacity-100" : "opacity-0",
      className
    )}>
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4 max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center size-6 bg-primary rounded-full">
            <Clock className="size-3 text-primary-foreground" />
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Installation Progress</div>
            <div className="text-xs text-muted-foreground">
              {completedSteps} of {installationSteps.length} steps
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps / installationSteps.length) * 100}%` }}
          />
        </div>

        {/* Navigation buttons */}
        <div className="space-y-2">
          {previousStep && (
            <button
              onClick={() => scrollToStep(previousStep.id)}
              className="group flex items-center gap-2 w-full p-2 rounded-md border hover:bg-muted/50 transition-colors"
            >
              <ChevronUp className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <div className="text-left min-w-0 flex-1">
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {previousStep.shortTitle}
                </div>
              </div>
              <Check className="size-4 text-green-500" />
            </button>
          )}

          {/* Current step */}
          {currentIndex >= 0 && (
            <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10 border border-primary/20">
              <div className="size-4 rounded-full bg-primary flex items-center justify-center">
                <div className="size-2 bg-primary-foreground rounded-full" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-primary">Current</div>
                <div className="text-sm font-medium text-foreground truncate">
                  {installationSteps[currentIndex]?.shortTitle}
                </div>
              </div>
            </div>
          )}

          {nextStep && (
            <button
              onClick={() => scrollToStep(nextStep.id)}
              className="group flex items-center gap-2 w-full p-2 rounded-md border hover:bg-muted/50 transition-colors"
            >
              <ChevronDown className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <div className="text-left min-w-0 flex-1">
                <div className="text-xs text-muted-foreground">Next</div>
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {nextStep.shortTitle}
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Completion message */}
        {currentIndex === installationSteps.length - 1 && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center gap-2 text-green-600">
              <Check className="size-4" />
              <span className="text-sm font-medium">Setup Complete!</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your Better Auth integration is ready to use.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}