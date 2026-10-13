import rawSiteConfig from "@/data/site.generated.json";

export const siteConfig = {
  ...rawSiteConfig,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://abamed.kg",
} as const;
