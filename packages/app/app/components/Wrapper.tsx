import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className="max-w-6xl mx-auto px-6">{children}</div>
);

export { Wrapper };
