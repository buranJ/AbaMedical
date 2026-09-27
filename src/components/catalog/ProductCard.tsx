import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/content";
import { ProductImage } from "./ProductImage";
import { SelectionToggle } from "./SelectionProvider";

function productFacts(product: Product) {
  const text = (product.details || []).join("\n");
  const type = text.match(/(?:^|\n)Вид:\s*([^\n]+)/i)?.[1]?.trim();
  const country = text.match(/(?:^|\n)Страна производства:\s*([^\n]+)/i)?.[1]?.trim();
  return [product.brand, type, country].filter(Boolean).slice(0, 2) as string[];
}

export function ProductCard({ product, compareControl }: { product: Product; compareControl?: React.ReactNode }) {
  const facts = productFacts(product);
  return (
    <article className="product-card">
      <div className="product-card-media">
        <ProductImage src={product.image} alt={product.title} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-contain p-7" />
        <div className="product-card-compare">{compareControl}</div>
        {product.brand && <span className="product-brand">{product.brand}</span>}
      </div>
      <div className="product-card-body">
        <p className="product-category">{product.categoryLabel}</p>
        <h3>{product.title}</h3>
        <p className="product-summary">{product.summary}</p>
        {facts.length > 0 && <div className="product-card-facts">{facts.map((fact) => <span key={fact}>{fact}</span>)}</div>}
        <div className="product-card-actions">
          <SelectionToggle product={product} compact />
          <Link className="product-card-link" href={`/catalog/product/${product.slug}`}><span>Подробнее</span><i><ArrowUpRight size={18} aria-hidden /></i></Link>
        </div>
      </div>
    </article>
  );
}
