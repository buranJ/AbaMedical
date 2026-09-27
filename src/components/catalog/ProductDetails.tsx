import { Check, FileText, PackageCheck, ShieldCheck } from "lucide-react";
import type { Product } from "@/types/content";

function splitDetails(details: string[]) {
  const bullets: string[] = [];
  const narrative: string[] = [];
  const clean = (value: string) => value.replace(/^\*+\s*/, "").replace(/([.!?])([А-ЯЁ])/g, "$1 $2").replace(/\s+/g, " ").trim();

  for (const paragraph of details) {
    const parts = paragraph.split(/\s*[·•]\s*/).map(clean).filter(Boolean);
    if (parts.length > 1) {
      narrative.push(parts.shift() || "");
      bullets.push(...parts);
    } else {
      narrative.push(clean(paragraph));
    }
  }

  return { narrative: narrative.filter(Boolean), bullets: bullets.filter((item) => item.length < 260) };
}

export function ProductDetails({ product }: { product: Product }) {
  const { narrative, bullets } = splitDetails(product.details || []);
  return <section className="mt-16 border-t border-[var(--border)] pt-12">
    <p className="eyebrow">О продукте</p>
    <h2 className="heading mt-4">Описание и характеристики</h2>
    <div className="product-facts mt-8">
      <div><PackageCheck /><p>Направление</p><strong>{product.categoryLabel}</strong></div>
      <div><ShieldCheck /><p>Производитель</p><strong>{product.brand || "Уточняется"}</strong></div>
      <div><FileText /><p>Комплектация</p><strong>По запросу</strong></div>
      <div><Check /><p>Подбор</p><strong>Со специалистом</strong></div>
    </div>
    {bullets.length > 0 && <div className="mt-10"><h3 className="text-2xl font-bold">Ключевые характеристики</h3><ul className="mt-6 grid gap-x-10 gap-y-4 md:grid-cols-2">{bullets.map((item, index) => <li className="flex gap-3 border-b border-[var(--border)] pb-4 leading-7 text-slate-700" key={`${index}-${item.slice(0, 32)}`}><Check className="mt-1 shrink-0 text-[var(--primary)]" size={18} />{item}</li>)}</ul></div>}
    <div className="product-copy mt-10"><h3 className="mb-5 text-2xl font-bold">Подробное описание</h3>{narrative.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>)}</div>
    <aside className="product-disclaimer mt-10 max-w-4xl">Характеристики и комплектация могут различаться. Совместимость, регистрационные документы и условия поставки необходимо подтвердить у специалиста ABA Medical.</aside>
  </section>;
}
