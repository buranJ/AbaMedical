import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/catalog/ProductCard";
import { categories } from "@/data/content";
import { products } from "@/data/products";
import { categoryParams, findSubcategory, leafSlugs } from "@/lib/catalog";
import { createMetadata } from "@/lib/metadata";

const directionImages = {
  surgery: "/images/directions/surgery.webp",
  cardiology: "/images/directions/cardiology.webp",
  diabetes: "/images/directions/diabetes.webp",
  neurosurgery: "/images/directions/neurosurgery.webp",
  anesthesiology: "/images/directions/anesthesiology.webp",
};

export function generateStaticParams() {
  return categories.flatMap((category) => [
    { slug: [category.slug] },
    ...categoryParams(category.slug, category.subcategories),
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug[0]);
  if (!category) return {};
  const { node } = findSubcategory(category.subcategories, slug.slice(1));
  const current = node || category;
  return createMetadata(`${current.title} — каталог`, current.description, `/catalog/${slug.join("/")}`);
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug[0]);
  if (!category) notFound();

  const { node, trail } = findSubcategory(category.subcategories, slug.slice(1));
  if (slug.length > 1 && !node) notFound();

  const current = node || category;
  const children = node ? node.children || [] : category.subcategories;
  const validSubcategories = node ? leafSlugs(node) : category.subcategories.flatMap(leafSlugs);
  const items = products.filter(
    (product) => product.direction === category.slug && (!validSubcategories.length || validSubcategories.includes(product.subcategory)),
  );

  const breadcrumbItems = [
    { label: "Каталог", href: "/catalog" },
    ...(trail.length ? [{ label: category.title, href: `/catalog/${category.slug}` }] : [{ label: category.title }]),
    ...trail.map((item, index) => ({
      label: item.title,
      href: index < trail.length - 1 ? `/catalog/${[category.slug, ...trail.slice(0, index + 1).map((part) => part.slug)].join("/")}` : undefined,
    })),
  ];

  const basePath = `/catalog/${slug.join("/")}`;
  const countForChild = (child: (typeof children)[number]) => {
    const childLeaves = leafSlugs(child);
    return products.filter((product) => product.direction === category.slug && childLeaves.includes(product.subcategory)).length;
  };

  return (
    <div className="section">
      <div className="container">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="category-hero mt-10">
          <div className="category-hero-copy">
            <p className="eyebrow">Каталог оборудования</p>
            <h1 className="heading mt-4">{current.title}</h1>
            <p className="lede mt-4 max-w-3xl">{current.description}</p>
            <div className="category-hero-meta"><span><strong>{items.length}</strong> позиций в каталоге</span>{children.length > 0 && <span><strong>{children.length}</strong> категории</span>}</div>
          </div>
          <div className="category-hero-image relative min-h-64 overflow-hidden lg:min-h-full"><Image src={directionImages[category.slug]} alt={`Направление: ${category.title}`} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /><span>{category.title}</span></div>
        </div>

        {children.length > 0 && (
          <section className="py-12">
            <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Навигация</p><h2 className="mt-3 text-3xl font-bold">Категории направления</h2></div><p className="max-w-md text-sm leading-6 text-slate-600">Перейдите к нужной группе, чтобы сузить ассортимент и быстрее найти подходящее решение.</p></div>
            <div className="category-link-grid mt-7">
              {children.map((child) => (
                <Link className="category-link-card group" key={child.slug} href={`${basePath}/${child.slug}`}>
                  <span>{countForChild(child)} позиций</span><h3>{child.title}</h3><p>{child.description}</p><i><ArrowRight size={18} aria-hidden /></i>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="pt-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div><p className="eyebrow">Ассортимент</p><h2 className="mt-2 text-2xl font-bold">Оборудование и материалы</h2></div>
            <span className="text-sm text-slate-500">{items.length} позиций</span>
          </div>
          {items.length ? <div className="catalog-product-grid">{items.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <div className="border-y border-[var(--border)] py-10 text-slate-600">Ассортимент этой категории уточняется. Свяжитесь со специалистом ABA Medical.</div>}
        </section>
        <aside className="category-consult"><div><MessageSquareText /><span><strong>Нужна помощь с подбором?</strong><small>Опишите клиническую задачу — специалист поможет сориентироваться в ассортименте.</small></span></div><Link href="/contacts#consultation">Обсудить задачу <ArrowRight size={18} /></Link></aside>
      </div>
    </div>
  );
}
