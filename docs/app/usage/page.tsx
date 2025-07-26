"use client";

import { Link as LinkIcon } from "lucide-react";
import { ComponentProps, PropsWithChildren } from "react";
import { cx } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { BasicUsage } from "../content/basic-usage/BasicUsage";

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

export default function UsagePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
      <div className="py-8 sm:py-12 space-y-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Basic Usage
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Learn how to use Better Auth with Convex after installation.
          </p>
        </div>
        
      </div>

      <BasicUsage />
    </div>
  );
}