import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageSquareText } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { articles } from "@/data/content";
import { createMetadata, safeJsonLd } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article ? { ...createMetadata(article.title, article.excerpt, `/blog/${slug}`), openGraph: { title: article.title, description: article.excerpt, url: `${siteConfig.url}/blog/${slug}`, type: "article", images: [{ url: `${siteConfig.url}${article.image}` }] } } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const related = articles.filter((item) => item.slug !== slug);
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, image: `${siteConfig.url}${article.image}`, mainEntityOfPage: `${siteConfig.url}/blog/${slug}`, publisher: { "@type": "Organization", name: siteConfig.name } };
  return <article className="section article-page"><div className="container max-w-6xl">
    <Breadcrumbs items={[{ label: "Новости", href: "/blog" }, { label: article.title }]} />
    <Link className="article-back mt-8" href="/blog"><ArrowLeft size={17} />Все материалы</Link>
    <header className="article-header mt-8"><div><p className="eyebrow">Новости компании</p><h1 className="display mt-5">{article.title}</h1></div><p className="lede">{article.excerpt}</p></header>
    <div className="article-cover mt-10"><div className="relative" style={{ aspectRatio: article.imageAspect }}><Image src={article.image} alt={article.title} fill priority quality={95} sizes="(max-width: 1200px) 100vw, 1150px" className="object-cover" /></div><span>ABA Medical · Кыргызстан</span></div>
    <div className="article-content mt-12"><div className="prose article-prose">{article.body.map((paragraph, index) => <p className={index === 0 ? "article-lead" : ""} key={paragraph}>{paragraph}</p>)}</div><aside><MessageSquareText /><strong>Хотите уточнить детали?</strong><p>Свяжитесь со специалистом ABA Medical по вопросам оборудования, обучения и мероприятий.</p><Link href="/contacts#consultation">Задать вопрос <ArrowRight size={17} /></Link></aside></div>
    <section className="article-related mt-20"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Продолжить чтение</p><h2>Другие материалы</h2></div><Link href="/blog">Все новости <ArrowRight size={17} /></Link></div><div>{related.map((item) => <article key={item.slug}><Link href={`/blog/${item.slug}`}><div className="relative" style={{ aspectRatio: item.imageAspect }}><Image src={item.image} alt="" fill quality={90} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div><span><small>Практика компании</small><strong>{item.title}</strong><em>Читать <ArrowRight size={15} /></em></span></Link></article>)}</div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />
  </div></article>;
}
