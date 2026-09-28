import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, GraduationCap, HeartPulse, PackageCheck, Scissors, ShieldCheck, Syringe, Wind, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ProductCard } from "@/components/catalog/ProductCard";
import { categories, faq, articles } from "@/data/content";
import { products } from "@/data/products";
import { siteConfig } from "@/config/site";
import { safeJsonLd } from "@/lib/metadata";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { PartnerShowcase } from "@/components/home/PartnerShowcase";

const featuredSlugs = [
  "628711016-355907973891-insulinovaya-pompa",
  "628587038-926775995101-energeticheskaya-platforma-valleylab-ft1",
  "628721518-902257232661-stealthstation-s8",
];
const icons = { surgery: Scissors, cardiology: HeartPulse, diabetes: Syringe, neurosurgery: Brain, anesthesiology: Wind };
const directionImages = { surgery: "/images/directions/surgery.webp", cardiology: "/images/directions/cardiology.webp", diabetes: "/images/directions/diabetes.webp", neurosurgery: "/images/directions/neurosurgery.webp", anesthesiology: "/images/directions/anesthesiology.webp" };
export default function HomePage() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  const featured = featuredSlugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean);

  return <>
    <HeroShowcase />

    <PartnerShowcase />

    <section className="section" id="directions"><div className="container">
      <div className="max-w-3xl"><p className="eyebrow">Каталог</p><h2 className="heading mt-4">Оборудование по направлениям</h2></div>
      <div className="category-bento mt-10">{categories.map((category, index) => { const Icon = icons[category.slug]; return <Link className={`category-tile category-tile-${index + 1} group`} key={category.slug} href={`/catalog/${category.slug}`}><Image src={directionImages[category.slug]} alt="" fill quality={90} sizes="(max-width: 768px) 100vw, 50vw" className="content-photo object-cover transition duration-700 group-hover:scale-105" /><div className="category-shade" /><div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8"><div className="flex items-start justify-between"><span className="category-icon"><Icon size={22} strokeWidth={1.8} /></span></div><div><h3 className="text-2xl font-extrabold text-white">{category.title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-white/72">{category.description}</p><span className="category-open">Открыть направление <ArrowRight size={16} /></span></div></div></Link>; })}</div>
      <div className="mt-7"><ButtonLink href="/catalog" variant="secondary">Перейти в каталог</ButtonLink></div>
    </div></section>

    <section className="section bg-white"><div className="container"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Ассортимент</p><h2 className="heading mt-4">Популярное оборудование</h2></div><Link className="text-link" href="/catalog">Смотреть все <ArrowRight size={18} /></Link></div><div className="modern-card-grid mt-10 grid gap-6 lg:grid-cols-3">{featured.map((product) => <ProductCard key={product!.slug} product={product!} />)}</div></div></section>

    <section className="section trust-section"><div className="container">
      <div className="trust-layout"><div className="trust-story"><p className="eyebrow">ABA Medical</p><h2 className="heading mobile-two-line mt-4"><span>Не просто поставка, а</span>{" "}<span>решение для клиники</span></h2><p className="lede mt-5">Соединяем медицинские технологии, практические знания и сопровождение специалистов.</p><div className="mt-8"><ButtonLink href="/about" variant="secondary">Подробнее о компании</ButtonLink></div></div><div className="trust-photo relative overflow-hidden"><Image src="/images/company/event.webp" alt="Профессиональное мероприятие ABA Medical для медицинских специалистов" fill quality={90} sizes="(max-width: 1024px) 100vw, 48vw" className="clinical-event-photo object-cover" /><div><strong>Профессиональное обучение</strong><span>Практический обмен опытом медицинских специалистов</span></div></div></div>
      <div className="proof-grid"><article><PackageCheck /><strong>5 медицинских направлений</strong><p>Структурированный каталог оборудования и расходных материалов.</p></article><article><ShieldCheck /><strong>Подбор под задачу</strong><p>Специалист помогает проверить назначение, совместимость и комплектацию.</p></article><article><GraduationCap /><strong>Обучение специалистов</strong><p>Профессиональные мероприятия и практический обмен опытом.</p></article><article><Wrench /><strong>Сопровождение</strong><p>Поддержка по условиям поставки и дальнейшей эксплуатации.</p></article></div>
    </div></section>

    <section className="section editorial-section"><div className="container"><div className="section-heading-row flex items-end justify-between gap-4"><div><p className="eyebrow">Практика компании</p><h2 className="heading mobile-two-line mt-4"><span>События и</span>{" "}<span>профессиональный обмен</span></h2></div><Link href="/blog" className="text-link">Все материалы <ArrowRight size={18} /></Link></div><div className="editorial-feature mt-10"><article className="editorial-lead group"><Link href={`/blog/${articles[0].slug}`} className="relative block min-h-[390px] overflow-hidden"><Image src={articles[0].image} alt="" fill quality={90} sizes="(max-width: 1024px) 100vw, 50vw" className="content-photo object-cover transition duration-700 group-hover:scale-[1.025]" /><span className="editorial-kicker">Медицинские технологии</span><div><h3>{articles[0].title}</h3><p>{articles[0].excerpt}</p><span className="editorial-read">Читать материал <ArrowRight size={18} /></span></div></Link></article><div className="editorial-side">{articles.slice(1).map((article) => <article key={article.slug}><Link href={`/blog/${article.slug}`}><div className="relative overflow-hidden"><Image src={article.image} alt="" fill quality={90} sizes="(max-width: 767px) 100vw, 27vw" className="object-contain" /></div><span><small>Профессиональное обучение</small><strong>{article.title}</strong><em>Подробнее <ArrowRight size={15} /></em></span></Link></article>)}</div></div></div></section>

    <section className="section bg-white"><div className="container grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">Вопросы</p><h2 className="heading mt-4">Часто спрашивают</h2><Link className="text-link mt-7" href="/contacts">Задать свой вопрос <ArrowRight size={18} /></Link></div><div className="grid gap-3">{faq.slice(0, 3).map((item) => <details className="faq-item" key={item.question}><summary className="cursor-pointer list-none pr-10 text-lg font-extrabold">{item.question}</summary><p className="mt-4 max-w-2xl leading-7 text-slate-600">{item.answer}</p></details>)}</div></div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} /></section>

    <section className="section" id="consultation"><div className="consultation-shell container grid gap-10 p-6 md:p-10 lg:grid-cols-2 lg:p-14"><div><p className="eyebrow">Консультация</p><h2 className="heading mt-4">Найдём решение под вашу задачу</h2><p className="lede mt-5">Укажите направление и удобный способ связи. Специалист ответит в рабочее время.</p><div className="mt-8 grid gap-2 text-sm"><a className="font-bold" href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a><a className="font-bold" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div></div><div className="form-surface"><ConsultationForm /></div></div></section>
  </>;
}
