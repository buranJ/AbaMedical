export type DirectionId = "surgery" | "cardiology" | "diabetes" | "neurosurgery" | "anesthesiology";

export interface Subcategory {
  slug: string;
  title: string;
  description: string;
  children?: Subcategory[];
}

export interface Category {
  slug: DirectionId;
  title: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Product {
  slug: string;
  legacyPath: string;
  title: string;
  brand?: string;
  direction: DirectionId;
  subcategory: string;
  categoryLabel: string;
  summary: string;
  details?: string[];
  image?: string;
  imageSource?: string;
  gallery?: string[];
  gallerySources?: string[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  date: string | null;
  image: string;
  imageAspect: string;
}

export interface FAQItem { question: string; answer: string }
