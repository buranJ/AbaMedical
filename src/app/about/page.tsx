import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Handshake, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { createMetadata } from "@/lib/metadata";
import { categories } from "@/data/content";

export const metadata = createMetadata("О компании", "ABA Medical — поставщик медицинского оборудования и расходных материалов в Кыргызстане.", "/about");

const strengths = [
  { icon: Handshake, title: "Проверенные производители", text: "Компания представляет решения крупных международных производителей медицинского оборудования." },
  { icon: GraduationCap, title: "Обучение специалистов", text: "ABA Medical организует мастер-классы с участием хирургов и медицинских тренеров." },
  { icon: ShieldCheck, title: "Сопровождение поставки", text: "Подбор, консультация и сервисное сопровождение оборудования в рамках условий поставки." },
];
const partnerLogos = [
  ["Medtronic", "/images/partners/optimized/medtronic.png"],
  ["Abbott", "/images/partners/optimized/abbott.png"],
  ["Genoss", "/images/partners/optimized/genoss.png"],
  ["Merit Medical", "/images/partners/optimized/merit-medical.png"],
  ["St. Jude Medical", "/images/partners/optimized/st-jude-medical.png"],
  ["Concept Medical", "/images/partners/optimized/concept-medical.png"],
] as const;

export default function AboutPage() {
  return <div>
    <section className="section"><div className="container">
      <Breadcrumbs items={[{ label: "О компании" }]} />
      <div className="about-hero mt-12">
        <div className="about-hero-copy"><p className="eyebrow">ABA Medical</p><h1 className="display mt-5">Медицинские технологии для <span>практических задач</span></h1><p className="lede mt-6">Компания поставляет оборудование и расходные материалы для ключевых направлений медицины Кыргызстана и помогает специалистам внедрять современные решения.</p><div className="mt-8"><ButtonLink href="/contacts#consultation">Обсудить задачу</ButtonLink></div></div>
        <figure className="about-hero-image"><div className="relative h-full min-h-[430px] overflow-hidden"><Image src="/images/company/event.webp" alt="Профессиональное мероприятие ABA Medical" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /><div><strong>Знания в практику</strong><span>Профессиональный обмен опытом медицинских специалистов</span></div></div></figure>
      </div>
    </div></section>

    <section className="about-mission section"><div className="container grid gap-10 lg:grid-cols-[.35fr_1fr]"><p className="eyebrow">Миссия</p><div><h2 className="heading">Повышать эффективность работы врачей и качество медицинской помощи пациентам Кыргызской Республики.</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">ABA Medical объединяет поставку медицинских технологий, профессиональное обучение и сопровождение специалистов.</p></div></div></section>

    <section className="section"><div className="container"><p className="eyebrow">Подход к работе</p><h2 className="heading mt-4 max-w-3xl">От выбора решения до его применения</h2><div className="brand-grid mt-10 grid gap-px border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">{strengths.map(({ icon: Icon, title, text }) => <article className="bg-white p-7" key={title}><Icon className="text-[var(--primary)]" size={32} strokeWidth={1.6} /><h3 className="mt-8 text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div></div></section>

    <section className="border-y border-[var(--border)] bg-white py-14"><div className="container"><div className="grid gap-7 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><p className="eyebrow">Партнёрства</p><h2 className="heading mt-4">Решения международных производителей</h2></div><p className="max-w-2xl leading-7 text-slate-600">Перед поставкой специалист поможет проверить комплектацию, совместимость и регистрационные документы. Подтверждающие материалы предоставляются по запросу.</p></div><div className="mt-9 grid grid-cols-2 gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3 lg:grid-cols-6">{partnerLogos.map(([name, src]) => <div className="relative grid h-24 place-items-center bg-white px-5" key={name}><Image src={src} alt={name} width={170} height={60} className="max-h-12 w-auto max-w-full object-contain" /></div>)}</div></div></section>

    <section className="about-directions"><div className="container"><div className="about-directions-head"><div><p className="eyebrow">Экспертиза</p><h2 className="heading mt-4">Пять медицинских направлений</h2></div><p>Каталог организован вокруг реальных задач клинических команд — от хирургии и кардиологии до контроля диабета.</p></div><div className="about-direction-links">{categories.map((category) => <Link href={`/catalog/${category.slug}`} key={category.slug}><span>{category.title}</span><ArrowRight size={18} /></Link>)}</div></div></section>

    <section className="section"><div className="brand-panel container grid gap-8 border border-[var(--border)] p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="eyebrow">Сотрудничество</p><h2 className="heading mt-4">Подберём решение для вашей клиники</h2><p className="lede mt-4 max-w-2xl">Расскажите о направлении, задачах и требованиях к оборудованию.</p></div><ButtonLink href="/contacts#consultation">Получить консультацию</ButtonLink></div></section>
  </div>;
}
