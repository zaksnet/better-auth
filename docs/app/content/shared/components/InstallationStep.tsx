"use client";

import { useState, useEffect } from "react";
import { Check, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstallationStepProps {
  id: string;
  title: string;
  stepNumber: number;
  estimatedTime?: string;
  children: React.ReactNode;
  className?: string;
}

export function InstallationStep({ 
  id, 
  title, 
  stepNumber, 
  estimatedTime, 
  children, 
  className 
}: InstallationStepProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === id) {
            setIsVisible(entry.isIntersecting);
          }
        });
      },
      {
        rootMargin: "-20% 0% -60% 0%",
        threshold: 0.1,
      }
    );

    const element = document.getElementById(id);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [id]);

  return (
    <div 
      id={id} 
      className={cn(
        "relative border rounded-lg transition-all duration-300 mb-8",
        isVisible 
          ? "border-primary/30 bg-primary/5 shadow-lg" 
          : "border-border bg-background/50",
        className
      )}
    >
      {/* Step Header */}
      <div className={cn(
        "flex items-center gap-3 p-4 border-b transition-colors",
        isVisible ? "border-primary/20 bg-primary/5" : "border-border"
      )}>
        <div className={cn(
          "flex items-center justify-center size-8 rounded-full font-semibold text-sm transition-colors",
          isVisible 
            ? "bg-primary text-primary-foreground" 
            : isCompleted
              ? "bg-green-500 text-white"
              : "bg-muted text-muted-foreground"
        )}>
          {isCompleted ? (
            <Check className="size-4" />
          ) : (
            stepNumber
          )}
        </div>
        
        <div className="flex-1">
          <h3 className={cn(
            "text-lg font-semibold transition-colors",
            isVisible ? "text-primary" : "text-foreground"
          )}>
            {title}
          </h3>
          {estimatedTime && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Clock className="size-3" />
              <span>~{estimatedTime}</span>
            </div>
          )}
        </div>

        <ChevronRight className={cn(
          "size-5 transition-colors",
          isVisible ? "text-primary" : "text-muted-foreground"
        )} />
      </div>

      {/* Step Content */}
      <div className="p-6">
        {children}
      </div>

      {/* Progress indicator */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1 rounded-l-lg transition-all duration-300",
        isVisible ? "bg-primary" : "bg-transparent"
      )} />
    </div>
  );
}