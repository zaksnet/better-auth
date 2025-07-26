import { PropsWithChildren } from "react";
import { cx } from "class-variance-authority";
import { SectionLink } from "./SectionLink";

export const Section = ({
  id,
  title,
  className,
  children,
}: PropsWithChildren<{
  id: string;
  title: string;
  className?: string;
}>) => (
  <section id={id} className={cx(className, "pt-12 mb-16 scroll-mt-24")}>
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-2 tracking-tight">
        <SectionLink href={`#${id}`}>{title}</SectionLink>
      </h2>
      <div className="h-px bg-gradient-to-r from-border to-transparent w-full max-w-lg" />
    </div>
    <div className="space-y-8">{children}</div>
  </section>
);