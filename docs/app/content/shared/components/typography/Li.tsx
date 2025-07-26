import { PropsWithChildren } from "react";

export const Li = ({ children }: PropsWithChildren) => (
  <li className="mb-2">{children}</li>
);