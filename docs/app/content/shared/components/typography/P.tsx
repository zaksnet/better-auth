import { PropsWithChildren } from "react";
import { cx } from "class-variance-authority";

export const P = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <p className={cx(className, "text-base leading-7 text-muted-foreground mb-4")}>{children}</p>
);