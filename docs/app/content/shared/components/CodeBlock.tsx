import { ComponentProps } from "react";
import { CodeBlock as CodeBlockComponent } from "@/app/code-block";
import { cx } from "class-variance-authority";

export const CodeBlock = (props: ComponentProps<typeof CodeBlockComponent>) => (
  <CodeBlockComponent className={cx(props.className, "mb-6")} {...props} />
);