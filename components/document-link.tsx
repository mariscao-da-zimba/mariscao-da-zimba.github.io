import type { AnchorHTMLAttributes } from "react";
// Pages has no RSC server. Use document navigation and hydrate each page.
export default function DocumentLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props}>{children}</a>;
}
