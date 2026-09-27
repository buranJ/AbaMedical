import rawProducts from "./legacy-products.generated.json";
import type { Product } from "@/types/content";

export const products = rawProducts as Product[];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);

import { categories } from "./content";
