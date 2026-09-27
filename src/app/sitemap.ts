import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { categories, articles } from "@/data/content";
import { products } from "@/data/products";
import { categoryParams } from "@/lib/catalog";
export default function sitemap(): MetadataRoute.Sitemap { const paths = ["", "/catalog", "/services", "/contacts", "/about", "/payment", "/blog", ...categories.flatMap((category) => [`/catalog/${category.slug}`, ...categoryParams(category.slug, category.subcategories).map(({ slug }) => `/catalog/${slug.join("/")}`)]), ...products.map((product) => `/catalog/product/${product.slug}`), ...articles.map((article) => `/blog/${article.slug}`)]; return paths.map((path) => ({ url: `${siteConfig.url}${path}`, changeFrequency: path.includes("/product/") ? "monthly" : "weekly", priority: path === "" ? 1 : path === "/catalog" ? .9 : .7 })); }
