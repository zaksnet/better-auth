"use client";

import { Link as LinkIcon } from "lucide-react";
import { ComponentProps, PropsWithChildren } from "react";
import { cx } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { WhatIsThis } from "../content/introduction/WhatIsThis";
import { Examples } from "../content/examples/Examples";

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

export default function IntroductionPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
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
      </div>

      <WhatIsThis />
      <Examples />
    </div>
  );
}