import { ArrowUpRight, BriefcaseMedical, Clock3, HeartPulse, Mail, MapPin, Phone, Scissors, Syringe } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("Контакты", "Контакты ABA Medical в Бишкеке: адрес, телефоны, email и профильные специалисты.", "/contacts");
const specialists = [
  { role: "Кардиология и периферия · Abbott", phone: "+996 551 383 733", email: "cardio@abamed.kg", icon: HeartPulse },
  { role: "Продукция Medtronic (Covidien)", phone: "+996 551 009 733", email: "manager@abamed.kg", icon: Scissors },
  { role: "Продукция Medtronic (Covidien)", phone: "+996 555 250 733", email: "sales@abamed.kg", icon: BriefcaseMedical },
  { role: "Продукция для сахарного диабета · Medtronic", phone: "+996 557 257 225", email: "diabet@abamed.kg", icon: Syringe },
];

export default async function ContactsPage({ searchParams }: { searchParams: Promise<{ product?: string; direction?: string }> }) {
  const query = await searchParams;
  const product = typeof query.product === "string" ? query.product.slice(0, 1200) : "";
  const direction = typeof query.direction === "string" ? query.direction : "other";
  return <div>
    <section className="section pb-10"><div className="container"><Breadcrumbs items={[{ label: "Контакты" }]} />
      <div className="contact-hero mt-10"><div><p className="eyebrow text-white/65">Бишкек</p><h1 className="display mt-5 text-white">Свяжитесь с ABA Medical</h1><p className="mt-6 max-w-xl text-lg leading-8 text-white/65">Общие вопросы, подбор оборудования и консультации профильных специалистов — выберите удобный способ связи.</p></div><a className="contact-hero-phone" href={`tel:${siteConfig.phoneHref}`}><span>Основной телефон</span><strong>{siteConfig.phone}</strong><ArrowUpRight size={22} /></a></div>
      <div className="contact-methods">
        <a className="contact-method" href={`tel:${siteConfig.phoneHref}`}><span><Phone size={22} /></span><div><small>Позвонить</small><strong>{siteConfig.phone}</strong></div><ArrowUpRight size={18} /></a>
        <a className="contact-method" href={`mailto:${siteConfig.email}`}><span><Mail size={22} /></span><div><small>Написать</small><strong>{siteConfig.email}</strong></div><ArrowUpRight size={18} /></a>
        <div className="contact-method"><span><MapPin size={22} /></span><div><small>Посетить офис</small><strong>Исанова 79, каб. 801</strong></div></div>
      </div>
    </div></section>

    <section className="section pt-10"><div className="container grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
      <div className="contact-map-real"><iframe title="ABA Medical на Яндекс Картах" src="https://yandex.ru/map-widget/v1/?mode=search&text=%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA%2C%20%D1%83%D0%BB.%20%D0%98%D1%81%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0%2079&z=17&lang=ru_RU" loading="lazy" allowFullScreen /><div className="contact-map-caption"><span><MapPin size={20} /><strong>ул. Исанова 79, каб. 801</strong></span><span><Clock3 size={18} />{siteConfig.hours}</span><div><a href="https://yandex.ru/maps/?mode=routes&rtext=~%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA%2C%20%D1%83%D0%BB.%20%D0%98%D1%81%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0%2079&rtt=auto" target="_blank" rel="noopener noreferrer">Открыть маршрут <ArrowUpRight size={17} /></a></div></div></div>
      <div className="specialists-panel"><p className="eyebrow">Прямые контакты</p><h2 className="mt-4 text-3xl font-bold">Профильные специалисты</h2><div className="mt-7 grid gap-3 sm:grid-cols-2">{specialists.map((item) => { const Icon = item.icon; return <article className="specialist-card" key={item.email}><Icon size={20} /><h3>{item.role}</h3><a href={`tel:${item.phone.replaceAll(" ", "")}`}>{item.phone}</a><a href={`mailto:${item.email}`}>{item.email}</a></article>; })}</div></div>
    </div></section>

    <section className="section pt-8"><div id="consultation" className="consultation-shell container grid gap-10 p-7 md:p-10 lg:grid-cols-[.85fr_1.15fr] lg:p-14"><div><p className="eyebrow">Заявка</p><h2 className="heading mt-4">Получить консультацию</h2><p className="mt-5 max-w-md leading-7 text-white/65">Укажите направление и удобный способ связи. Если вы пришли со страницы товара, он уже добавлен в заявку.</p></div><div className="form-surface"><ConsultationForm initialProduct={product} initialDirection={direction} /></div></div></section>
  </div>;
}
