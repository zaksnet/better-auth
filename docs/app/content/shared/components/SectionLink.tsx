import { Link as LinkIcon } from "lucide-react";
import { PropsWithChildren } from "react";

export const SectionLink = ({
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