"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const directions = [
  ["surgery", "Хирургия"],
  ["cardiology", "Кардиология"],
  ["diabetes", "Сахарный диабет"],
  ["neurosurgery", "Нейрохирургия"],
  ["anesthesiology", "Анестезиология"],
  ["other", "Другой вопрос"],
] as const;

export function ConsultationForm({ initialProduct = "", initialDirection = "other" }: { initialProduct?: string; initialDirection?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState(initialDirection);
  const [comment, setComment] = useState("");
  const [directionOpen, setDirectionOpen] = useState(false);
  const directionRoot = useRef<HTMLDivElement>(null);
  const directionLabel = directions.find(([value]) => value === direction)?.[1] || "Другой вопрос";
  useEffect(() => {
    function close(event: MouseEvent) { if (!directionRoot.current?.contains(event.target as Node)) setDirectionOpen(false); }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") setDirectionOpen(false); }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", escape); };
  }, []);
  async function submit(formData: FormData) {
    setState("loading");
    const payload = { ...Object.fromEntries(formData), consent: formData.get("consent") === "on" };
    const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    setState(response.ok ? "success" : "error");
  }
  if (state === "success") return <div className="form-success" role="status"><Check size={24} /><h3>Заявка принята</h3><p>Спасибо. Специалист ABA Medical свяжется с вами в рабочее время.</p></div>;
  return <form action={submit} className="grid gap-4" aria-label="Форма консультации">
    <div className="hidden" aria-hidden><label>Ваш сайт<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <input type="hidden" name="direction" value={direction} /><input type="hidden" name="comment" value={comment} />{initialProduct && <input type="hidden" name="product" value={initialProduct} />}
    <div className="form-progress"><span className={step >= 1 ? "is-active" : ""}><b>1</b>Задача</span><i><em style={{ width: step === 2 ? "100%" : "0%" }} /></i><span className={step === 2 ? "is-active" : ""}><b>2</b>Контакты</span></div>
    {step === 1 ? <div className="form-step" key="task">
      {initialProduct && <div className="selected-products-field"><p>Выбранное оборудование</p><div>{initialProduct.split("; ").map((item) => <span key={item}><Check size={14} />{item}</span>)}</div></div>}
      <div className="form-field" ref={directionRoot}><span>Направление</span><button className="form-select-trigger" type="button" role="combobox" aria-label="Направление" aria-expanded={directionOpen} aria-controls="consultation-directions" onClick={() => setDirectionOpen((current) => !current)}><strong>{directionLabel}</strong><ChevronDown className={directionOpen ? "rotate-180" : ""} size={18} /></button>{directionOpen && <div className="form-select-options" id="consultation-directions" role="listbox">{directions.map(([value, label]) => <button type="button" role="option" aria-selected={value === direction} key={value} onClick={() => { setDirection(value); setDirectionOpen(false); }}><span>{label}</span>{value === direction && <Check size={17} />}</button>)}</div>}</div>
      <label className="form-field"><span>Кратко опишите задачу <em>необязательно</em></span><textarea value={comment} onChange={(event) => setComment(event.target.value)} maxLength={1000} placeholder="Например: подобрать комплект для операционной" /></label>
      <button className="btn btn-primary" type="button" onClick={() => setStep(2)}>Продолжить <ChevronDown className="-rotate-90" size={18} /></button>
    </div> : <div className="form-step" key="contacts">
      <div className="form-two-columns"><label className="form-field"><span>Имя</span><input name="name" required minLength={2} autoComplete="name" /></label><label className="form-field"><span>Телефон</span><input name="phone" type="tel" required minLength={7} autoComplete="tel" placeholder="+996 ___ ___ ___" /></label></div>
      <label className="form-field"><span>Email <em>необязательно</em></span><input name="email" type="email" autoComplete="email" /></label>
      <fieldset><legend className="text-sm font-bold">Как удобнее ответить</legend><div className="mt-3 flex flex-wrap gap-2">{[["phone", "Позвонить"], ["whatsapp", "WhatsApp"], ["email", "Email"]].map(([value, label], index) => <label className="cursor-pointer rounded-md border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold has-[:checked]:border-[var(--primary)] has-[:checked]:bg-[var(--lavender-soft)]" key={value}><input className="sr-only" type="radio" name="contactMethod" value={value} defaultChecked={index === 0} />{label}</label>)}</div></fieldset>
      <label className="flex gap-3 text-sm leading-5 text-slate-600"><input className="mt-1 size-4 accent-[var(--primary)]" type="checkbox" name="consent" required />Я согласен на обработку данных для ответа на заявку.</label>
      <div className="form-step-actions"><button type="button" onClick={() => setStep(1)}>Назад</button><button className="btn btn-primary" type="submit" disabled={state === "loading"}>{state === "loading" ? "Отправляем…" : "Получить консультацию"}</button></div>
    </div>}
    {state === "error" && <p className="text-sm text-[var(--danger)]" role="alert">Не удалось отправить заявку. Позвоните нам или попробуйте еще раз.</p>}
  </form>;
}
