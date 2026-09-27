import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { safeJsonLd } from "@/lib/metadata";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const all = [{ label: "Главная", href: "/" }, ...items];
  const data = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: all.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, ...(item.href ? { item: new URL(item.href, siteConfig.url).toString() } : {}) })) };
  return <><nav aria-label="Хлебные крошки" className="breadcrumbs">{all.map((item, index) => <span key={`${item.label}-${index}`}>{index > 0 && <ChevronRight size={14} aria-hidden />}{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} /></>;
}
