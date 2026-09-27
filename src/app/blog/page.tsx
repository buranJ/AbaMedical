import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, HeartPulse } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { articles } from "@/data/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("Новости", "Новости, события и профессиональные мероприятия ABA Medical.", "/blog");

export default function BlogPage() {
  return <div className="section"><div className="container">
    <Breadcrumbs items={[{ label: "Новости" }]} />
    <header className="news-index-hero mt-10">
      <div><p className="eyebrow">Пресс-центр</p><h1 className="heading mt-4">Практика, события и медицинские технологии</h1><p className="lede mt-5 max-w-3xl">Профессиональные мероприятия ABA Medical и новости медицинского сообщества Кыргызстана.</p></div>
      <div className="news-index-topics"><span><HeartPulse />Медицинские технологии</span><span><GraduationCap />Профессиональное обучение</span><span><BookOpen />Практика компании</span></div>
    </header>
    <section className="news-index-grid mt-12">
      <article className="news-feature"><Link href={`/blog/${articles[0].slug}`}><div className="relative min-h-[470px] overflow-hidden"><Image src={articles[0].image} alt={articles[0].title} fill priority sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" /><div className="news-feature-shade" /><span>Медицинские технологии</span><div><h2>{articles[0].title}</h2><p>{articles[0].excerpt}</p><em>Читать материал <ArrowRight size={18} /></em></div></div></Link></article>
      <div className="news-list">{articles.slice(1).map((article) => <article key={article.slug}><Link href={`/blog/${article.slug}`}><div className="relative"><Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 35vw" className="object-cover" /></div><span><small>Профессиональное обучение</small><h2>{article.title}</h2><p>{article.excerpt}</p><em>Открыть <ArrowRight size={16} /></em></span></Link></article>)}</div>
    </section>
  </div></div>;
}
