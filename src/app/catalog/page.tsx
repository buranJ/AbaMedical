import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowRight, Brain, HeartPulse, Scissors, Syringe } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CatalogExplorer } from "@/components/catalog/CatalogExplorer";
import { products } from "@/data/products";
import { categories } from "@/data/content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("Каталог медицинского оборудования", "Каталог оборудования и расходных материалов ABA Medical по медицинским направлениям и категориям.", "/catalog");

const directionImages = { surgery: "/images/directions/surgery.webp", cardiology: "/images/directions/cardiology.webp", diabetes: "/images/directions/diabetes.webp", neurosurgery: "/images/directions/neurosurgery.webp", anesthesiology: "/images/directions/anesthesiology.webp" };
const clinicalTasks = [
  { icon: Scissors, title: "Оснащение операционной", text: "Электрохирургия, сшивающие инструменты и лапароскопические решения.", href: "/catalog/surgery" },
  { icon: HeartPulse, title: "Интервенционные процедуры", text: "Стенты, баллоны, проводники и решения для сосудистого доступа.", href: "/catalog/cardiology/interventional-surgery" },
  { icon: Activity, title: "Контроль сердечного ритма", text: "Кардиостимуляция, диагностика и электрофизиология.", href: "/catalog/cardiology/electrophysiology" },
  { icon: Syringe, title: "Контроль диабета", text: "Инсулиновые помпы, инфузионные системы и мониторинг.", href: "/catalog/diabetes" },
  { icon: Brain, title: "Нейрохирургическая навигация", text: "Навигационные и моторные системы для операционной.", href: "/catalog/neurosurgery" },
] as const;

function countBranches(category: (typeof categories)[number]) {
  return category.subcategories.length || products.filter((product) => product.direction === category.slug).length;
}

export default function CatalogPage() {
  return (
    <div className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: "Каталог" }]} />
        <header className="catalog-hero mt-10">
          <div className="catalog-hero-copy">
            <p className="eyebrow text-white/65">ABA Medical</p>
            <h1 className="catalog-hero-title heading mt-4 text-white"><span>Каталог медицинского</span>{" "}<span>оборудования</span></h1>
            <p className="lede mt-5 max-w-3xl text-white/70">Решения для операционных, кардиологии, нейрохирургии, анестезиологии и контроля диабета — от проверенных мировых производителей.</p>
            <a className="catalog-hero-link mt-8" href="#assortment">Найти оборудование <ArrowRight size={18} /></a>
          </div>
          <nav className="catalog-hero-directions" aria-label="Медицинские направления">
            {categories.map((category) => <Link href={`/catalog/${category.slug}`} key={category.slug}><span>{category.title}</span><ArrowRight size={17} /></Link>)}
          </nav>
        </header>

        <section id="directions" className="py-12">
          <p className="eyebrow">По специализации</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="heading max-w-2xl">Медицинские направления</h2>
          </div>
          <div className="category-bento mt-8">
            {categories.map((category, index) => <Link className={`category-tile category-tile-${index + 1} group`} key={category.slug} href={`/catalog/${category.slug}`}><Image src={directionImages[category.slug]} alt="" fill quality={90} sizes="(max-width: 640px) 100vw, 50vw" className="content-photo object-cover transition duration-700 group-hover:scale-105" /><div className="category-tile-shade" /><div className="category-tile-content"><div className="flex items-center justify-between gap-4">{category.subcategories.length > 0 && <p className="text-xs font-semibold uppercase tracking-[.14em] text-white/65">{countBranches(category)} категории</p>}<span className="category-tile-arrow ml-auto"><ArrowRight size={20} /></span></div><div><h3 className="text-2xl font-bold text-white md:text-3xl">{category.title}</h3><p className="mt-2 max-w-lg text-sm leading-6 text-white/70">{category.description}</p></div></div></Link>)}
          </div>
        </section>

        <section className="clinical-task-section">
          <div className="clinical-task-head"><div><p className="eyebrow">По задаче</p><h2 className="heading mt-3">Не знаете название оборудования?</h2></div></div>
          <div className="clinical-task-grid">{clinicalTasks.map(({ icon: Icon, title, text, href }) => <Link href={href} key={title}><Icon size={22} strokeWidth={1.7} /><span><strong>{title}</strong><small>{text}</small></span><ArrowRight size={18} /></Link>)}</div>
        </section>

        <section id="assortment" className="border-t border-[var(--border)] pt-12">
          <p className="eyebrow">Поиск</p>
          <h2 className="mt-3 text-3xl font-bold">Весь ассортимент</h2>
          <p className="mt-3 max-w-2xl text-slate-600">Если вы знаете название оборудования, найдите его сразу по каталогу.</p>
          <div className="mt-8"><CatalogExplorer products={products} /></div>
        </section>
      </div>
    </div>
  );
}
