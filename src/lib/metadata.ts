import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function createMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: siteConfig.name, locale: "ru_KG", type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export const safeJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c");
