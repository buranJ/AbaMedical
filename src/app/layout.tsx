import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { MobileDock } from "@/components/layout/MobileDock";
import { Analytics } from "@/components/layout/Analytics";
import { SelectionProvider } from "@/components/catalog/SelectionProvider";
import { siteConfig } from "@/config/site";
import { safeJsonLd } from "@/lib/metadata";
import "./globals.css";

const manrope = Manrope({ subsets: ["cyrillic", "latin"], display: "swap" });

export const metadata: Metadata = { metadataBase: new URL(siteConfig.url), title: { default: "ABA Medical — медицинское оборудование в Кыргызстане", template: "%s | ABA Medical" }, description: siteConfig.description, applicationName: siteConfig.name, icons: { icon: "/favicon.svg" }, verification: { google: process.env.GOOGLE_SITE_VERIFICATION, yandex: process.env.YANDEX_SITE_VERIFICATION } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, legalName: siteConfig.legalName, url: siteConfig.url, logo: `${siteConfig.url}/images/brand/logo.svg`, telephone: siteConfig.phoneHref, email: siteConfig.email, address: { "@type": "PostalAddress", streetAddress: "ул. Исанова 79, каб. 801", addressLocality: "Бишкек", addressCountry: "KG" }, openingHours: "Mo-Fr 09:00-18:00", sameAs: [siteConfig.instagram, siteConfig.tiktok] };
  return <html lang="ru" data-scroll-behavior="smooth"><body className={manrope.className}><SelectionProvider><a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-3" href="#main">Перейти к содержанию</a><Header /><main id="main">{children}</main><Footer /><FloatingContact /><MobileDock /><Analytics /></SelectionProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(organization) }} /></body></html>;
}
