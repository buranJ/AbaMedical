import Link from "next/link";
import type { ReactNode } from "react";

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  return <Link className={`btn btn-${variant}`} href={href}>{children}</Link>;
}
