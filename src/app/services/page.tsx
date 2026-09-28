import Image from "next/image";
import { ArrowRight, GraduationCap, HeartHandshake, SearchCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("Услуги", "Подбор медицинского оборудования, обучение, мастер-классы и помощь в организации лечения.", "/services");

const services = [
  { icon: SearchCheck, label: "Подбор", title: "Решение под клиническую задачу", text: "Уточняем требования, совместимость и комплектацию, чтобы предложить подходящие позиции из доступного ассортимента.", tone: "blue" },
  { icon: GraduationCap, label: "Обучение", title: "Практика с медицинскими экспертами", text: "Организуем мастер-классы, презентации технологий и профессиональные встречи для врачей и клинических команд.", tone: "lilac" },
  { icon: HeartHandshake, label: "Поддержка", title: "Помощь в организации лечения", text: "Помогаем наладить коммуникацию с профильными специалистами и сопровождаем запрос до понятного следующего шага.", tone: "coral" },
] as const;

export default function ServicesPage() {
  return <div>
    <section className="section pb-12"><div className="container">
      <Breadcrumbs items={[{ label: "Услуги" }]} />
      <div className="services-hero mt-10">
        <div className="relative z-10 p-7 md:p-12 lg:p-16">
          <p className="eyebrow text-white/65">Экспертная поддержка</p>
          <h1 className="display mobile-display-two-line mt-6 text-white"><span>Не просто поставка</span>{" "}<span>Помощь на каждом этапе</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">От выбора оборудования до обучения команды и сопровождения внедрения в клиническую практику.</p>
          <a className="catalog-hero-link mt-8" href="#consultation">Обсудить задачу <ArrowRight size={18} /></a>
        </div>
        <figure className="services-hero-image">
          <Image src="/images/company/event.webp" alt="Обучающее мероприятие ABA Medical для врачей" fill priority quality={90} sizes="(max-width: 1024px) 100vw, 48vw" className="clinical-event-photo object-cover" />
          <figcaption><strong>Практические знания</strong><span>Мероприятия для медицинских специалистов</span></figcaption>
        </figure>
      </div>
    </div></section>

    <section className="section pt-14"><div className="container">
      <div className="grid items-end gap-6 lg:grid-cols-[1fr_.7fr]"><div><p className="eyebrow">Что мы делаем</p><h2 className="heading mobile-two-line mt-4 max-w-3xl"><span>Поддержка, встроенная</span>{" "}<span>в вашу работу</span></h2></div><p className="max-w-xl leading-7 text-slate-600">Каждый запрос начинается с задачи специалиста или клиники. Формат работы подбирается под неё — без универсальных пакетов и лишних этапов.</p></div>
      <div className="service-detail-grid mt-10">
        {services.map(({ icon: Icon, label, title, text, tone }) => <article className={`service-detail-card service-tone-${tone}`} key={title}><div className="service-detail-top"><span className="service-detail-icon"><Icon size={25} strokeWidth={1.8} /></span><span className="service-detail-label">{label}</span></div><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </div></section>

    <section className="section pt-6"><div className="container"><div className="support-band">
      <div><p className="eyebrow text-white/65">Результат</p><h2 className="heading mobile-two-line mt-4 text-white"><span>Понятное решение</span>{" "}<span>без лишней сложности</span></h2></div>
      <div className="support-points"><p>Проверка совместимости и комплектации</p><p>Коммуникация с профильным специалистом</p><p>Сопровождение после выбора оборудования</p></div>
    </div></div></section>

    <section className="section pt-6"><div id="consultation" className="consultation-shell container grid gap-10 p-7 md:p-10 lg:grid-cols-[.85fr_1.15fr] lg:p-14"><div><p className="eyebrow">Связаться</p><h2 className="heading mt-4">Расскажите, какая помощь нужна</h2><p className="mt-6 max-w-md leading-7 text-white/65">Опишите задачу в свободной форме. Специалист уточнит детали и предложит следующий шаг.</p></div><div className="form-surface"><ConsultationForm /></div></div></section>
  </div>;
}
