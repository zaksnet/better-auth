import { PropsWithChildren } from "react";

export const Ul = ({ children }: PropsWithChildren) => (
  <ul className="list-disc font-light mb-6 leading-relaxed ml-4">{children}</ul>
);