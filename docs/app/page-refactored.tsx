"use client";

import { AlertTriangle } from "lucide-react";
import { useSelectedVariant } from "@/app/code-block-variant-store";

// Import all sections from the new structure
import { WhatIsThis } from "./content/introduction/WhatIsThis";
import { Examples } from "./content/examples/Examples";
import { GettingStarted } from "./content/getting-started/GettingStarted";
// Import all sections from the new structure
import { BasicUsage } from "./content/basic-usage/BasicUsage";
import { Integrations } from "./content/integrations/Integrations";
import { Guides } from "./content/guides/Guides";
import { LLMInstructions } from "./content/llm-instructions/LLMInstructions";

export default function Home() {
  const selectedFramework = useSelectedVariant("framework");
  const selectedPackageManager = useSelectedVariant("package-manager");
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:mt-12">
      <div className="py-8 sm:py-20 space-y-6 sm:space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 sm:mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Convex
          </h1>
          <span className="text-3xl sm:text-4xl font-light text-muted-foreground">
            +
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Better Auth
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Comprehensive, secure authentication with Better Auth for Convex.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 pt-2">
          <a
            href="https://github.com/get-convex/better-auth"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
          </a>
          <a
            href="https://labs.convex.dev/better-auth"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            API Reference
          </a>
        </div>
      </div>

      <div className="border-t pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-12">
          <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-100">
                  Component Status
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Beta - Expect potential changes
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-100">
                  Version Compatibility
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Requires Better Auth 1.2.12 (pinned)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatIsThis />
      <Examples />
      <GettingStarted />
      <BasicUsage />
      <Integrations />
      <Guides />
      <LLMInstructions />
    </div>
  );
}