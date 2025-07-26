import { cx } from "class-variance-authority";
import { SectionLink } from "./SectionLink";

export const ContentHeading = ({
  className,
  id,
  title,
}: {
  className?: string;
  id: string;
  title: string;
}) => (
  <h4 id={id} className={cx(className, "font-semibold pt-2 mb-4")}>
    <SectionLink href={`#${id}`}>{title}</SectionLink>
  </h4>
);