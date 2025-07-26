import { PropsWithChildren } from "react";
import { cx } from "class-variance-authority";
import { SectionLink } from "./SectionLink";

export const Subsection = ({
  id,
  title,
  className,
  children,
}: PropsWithChildren<{
  id: string;
  title: string;
  className?: string;
}>) => (
  <div id={id} className={cx(className, "pt-8 mb-12 scroll-mt-20")}>
    <h3 className="text-2xl font-semibold mb-6 tracking-tight text-foreground">
      <SectionLink href={`#${id}`}>{title}</SectionLink>
    </h3>
    <div className="space-y-6">{children}</div>
  </div>
);