import rawArticles from "./articles.generated.json";
import rawCatalog from "./catalog.generated.json";
import type { Category, FAQItem, NewsArticle, Partner } from "@/types/content";

export const categories = rawCatalog.categories as Category[];
export const faq = rawCatalog.faq as FAQItem[];
export const partners = rawCatalog.partners as Partner[];
export const articles = rawArticles as NewsArticle[];
