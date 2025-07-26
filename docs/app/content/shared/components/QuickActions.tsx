"use client";

import { useState, useEffect } from "react";
import { Check, ChevronRight, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyLLMInstructionsButton } from "./CopyLLMInstructionsButton";

interface InstallationStep {
  id: string;
  title: string;
  description: string;
  href: string;
  estimated: string;
}

interface InstallationGuideProps {
  className?: string;
}

const installationSteps: InstallationStep[] = [
  {
    id: "prerequisites",
    title: "1. Prerequisites",
    description: "Convex project setup",
    href: "#prerequisites",
    estimated: "2 min"
  },
  {
    id: "install-component",
    title: "2. Install Component", 
    description: "npm install packages",
    href: "#install-component",
    estimated: "1 min"
  },
  {
    id: "set-environment-variables",
    title: "3. Environment Setup",
    description: "Configure secrets & URLs",
    href: "#set-environment-variables", 
    estimated: "3 min"
  },
  {
    id: "better-auth-instance",
    title: "4. Initialize Auth",
    description: "Create auth instance",
    href: "#better-auth-instance",
    estimated: "5 min"
  },
  {
    id: "create-better-auth-client",
    title: "5. Client Setup",
    description: "Frontend auth client", 
    href: "#create-better-auth-client",
    estimated: "3 min"
  },
  {
    id: "mount-handlers",
    title: "6. Mount Handlers",
    description: "Register auth routes",
    href: "#mount-handlers",
    estimated: "2 min"
  },
  {
    id: "setup-convex-client", 
    title: "7. Provider Setup",
    description: "Wrap app with provider",
    href: "#setup-convex-client",
    estimated: "2 min"
  }
];

export function InstallationGuide({ className }: InstallationGuideProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [activeStep, setActiveStep] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepFound = installationSteps.find(step => step.id === entry.target.id);
            if (stepFound) {
              setActiveStep(entry.target.id);
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

    return () => observer.disconnect();
  }, []);

  const handleStepClick = (step: InstallationStep) => {
    const element = document.querySelector(step.href);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 120; // Account for fixed header
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (isDismissed) return null;

  return (
    <>
      <div className={cn(
        "fixed top-0 left-0 right-0 z-[5] bg-background/95 backdrop-blur-sm border-b shadow-sm md:left-[var(--sidebar-width)] md:z-[5]",
        className
      )}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-6 bg-primary rounded-full">
                <Rocket className="size-3 text-primary-foreground" />
              </div>
              <div>
                <span className="font-medium text-sm text-foreground">Installation Guide</span>
                <span className="text-xs text-muted-foreground ml-2">
                  7 steps
                </span>
              </div>
            </div>
            

          </div>
          
          <div className="pb-3 border-t border-border/50">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 mt-3">
              {installationSteps.map((step, index) => {
                const isActive = activeStep === step.id;
                const currentIndex = installationSteps.findIndex(s => s.id === activeStep);
                const isCompleted = currentIndex > index;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step)}
                    className={cn(
                      "text-left p-2 rounded-md transition-colors group",
                      isActive 
                        ? "bg-primary/10 border border-primary/20" 
                        : "hover:bg-muted/50",
                      isCompleted && "bg-green-50 dark:bg-green-950/30"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "flex items-center justify-center size-5 rounded-full text-xs font-medium transition-colors",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : isCompleted 
                            ? "bg-green-500 text-white"
                            : "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground"
                      )}>
                        {isCompleted ? (
                          <Check className="size-3" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={cn(
                          "font-medium text-xs transition-colors truncate",
                          isActive 
                            ? "text-primary" 
                            : isCompleted 
                              ? "text-green-600 dark:text-green-400"
                              : "text-foreground group-hover:text-primary"
                        )}>
                          {step.title.replace(/^\d+\.\s*/, '')} {/* Remove number prefix */}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Copy LLM Instructions Button - Floating independently */}
      {!isDismissed && (
        <div className="fixed top-[var(--installation-guide-height,120px)] right-4 z-[6] md:right-8">
          <CopyLLMInstructionsButton />
        </div>
      )}
    </>
  );
}