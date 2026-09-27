import { ArrowRight, BadgeCheck, CreditCard, FileCheck2, MessageSquareText, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata("Оплата и доставка", "Этапы консультации, оплаты и доставки оборудования ABA Medical.", "/payment");

const stages = [
  { icon: MessageSquareText, label: "Обсуждение", title: "Уточняем клиническую задачу", text: "Специалист проверяет назначение, требования к совместимости и подходящие позиции каталога." },
  { icon: FileCheck2, label: "Документы", title: "Согласовываем комплектацию", text: "До оформления подтверждаем состав поставки, регистрационные документы, стоимость и сроки." },
  { icon: CreditCard, label: "Расчёт", title: "Выбираем способ оплаты", text: "Безналичная оплата производится по выставленному счёту. Другие доступные способы уточняются при оформлении." },
  { icon: Truck, label: "Поставка", title: "Передаём оборудование", text: "Условия и география доставки подтверждаются специалистом до оплаты заказа." },
] as const;

export default function PaymentPage() {
  return <div>
    <section className="section pb-10"><div className="container"><Breadcrumbs items={[{ label: "Оплата и доставка" }]} />
      <div className="payment-hero mt-10"><div><p className="eyebrow text-white/65">Порядок работы</p><h1 className="display mt-5 text-white">От запроса до поставки — прозрачно</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">Сначала подтверждаем задачу и комплектацию. Только после этого согласовываем документы, оплату и доставку.</p><div className="mt-8"><ButtonLink href="/contacts#consultation">Обсудить поставку <ArrowRight size={18} /></ButtonLink></div></div><div className="payment-assurance"><BadgeCheck size={34} /><p>Все существенные условия заказа подтверждаются специалистом до оплаты.</p></div></div>
    </div></section>

    <section className="section pt-10"><div className="container"><div className="grid items-end gap-6 lg:grid-cols-[1fr_.65fr]"><div><p className="eyebrow">Как проходит заказ</p><h2 className="heading mt-4">Понятный рабочий процесс</h2></div><p className="leading-7 text-slate-600">Без автоматических обещаний и скрытых условий: каждый этап привязан к конкретной задаче и составу поставки.</p></div><div className="payment-flow mt-10">{stages.map(({ icon: Icon, label, title, text }) => <article className="payment-stage" key={title}><div className="payment-stage-icon"><Icon size={24} strokeWidth={1.7} /></div><p>{label}</p><h3>{title}</h3><span>{text}</span></article>)}</div></div></section>

    <section className="section pt-6"><div className="container"><div className="payment-note"><div><p className="eyebrow">Важно</p><h2 className="mt-4 text-3xl font-bold">Стоимость и сроки зависят от комплектации</h2><p className="mt-4 max-w-3xl leading-7 text-slate-600">Наличие, совместимость, регистрационные документы, доставка и сервисные условия необходимо подтвердить до оформления заказа.</p></div><ButtonLink href="/contacts#consultation" variant="secondary">Получить расчёт</ButtonLink></div></div></section>
  </div>;
}
