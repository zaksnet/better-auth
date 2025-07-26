"use client";

import { Link as LinkIcon } from "lucide-react";
import { ComponentProps, PropsWithChildren } from "react";
import { cx } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useSelectedVariant } from "@/app/code-block-variant-store";
import { GettingStarted } from "../content/getting-started/GettingStarted";
import { InstallationGuide } from "../content/shared/components";

const SectionLink = ({
  href,
  children,
}: PropsWithChildren<{
  href: string;
  children: React.ReactNode;
}>) => (
  <a
    href={href}
    className="inline-flex items-center rounded-md -ml-2 px-2 py-1 cursor-pointer hover:bg-muted/50 transition-colors group"
  >
    {children}
    <LinkIcon className="ml-2 size-4 opacity-0 group-hover:opacity-50 transition-opacity" />
  </a>
);

const P = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <p className={cx(className, "font-light mb-6 leading-relaxed")}>{children}</p>
);

export default function InstallationPage() {
  const selectedFramework = useSelectedVariant("framework");
  const selectedPackageManager = useSelectedVariant("package-manager");
  
  return (
    <>
      {/* Fixed Installation Guide at top */}
      <InstallationGuide />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 md:pt-28">
        <div className="py-8 sm:py-20 space-y-6 sm:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 sm:mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Installation Guide
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Get Better Auth working with Convex in your project.
          </p>
        </div>


        <GettingStarted />
      </div>
    </>
  );
}