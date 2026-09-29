"use client";

import Link from "next/link";
import { Check, ChevronRight, ClipboardList, Trash2, X } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types/content";

type SelectionItem = Pick<Product, "slug" | "title" | "brand" | "categoryLabel" | "image">;
type SelectionContextValue = {
  items: SelectionItem[];
  has: (slug: string) => boolean;
  toggle: (product: Product) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);
const storageKey = "aba-medical-selection";

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<SelectionItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) setItems(JSON.parse(saved));
      } catch { /* Ignore malformed or unavailable local storage. */ }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<SelectionContextValue>(() => ({
    items,
    has: (slug) => items.some((item) => item.slug === slug),
    toggle: (product) => setItems((current) => current.some((item) => item.slug === product.slug) ? current.filter((item) => item.slug !== product.slug) : current.length < 8 ? [...current, { slug: product.slug, title: product.title, brand: product.brand, categoryLabel: product.categoryLabel, image: product.image }] : current),
    remove: (slug) => setItems((current) => current.filter((item) => item.slug !== slug)),
    clear: () => setItems([]),
  }), [items]);

  return <SelectionContext.Provider value={value}>{children}<SelectionTray /></SelectionContext.Provider>;
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) throw new Error("useSelection must be used inside SelectionProvider");
  return context;
}

export function SelectionToggle({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { has, toggle, items } = useSelection();
  const selected = has(product.slug);
  const full = items.length >= 8 && !selected;
  return <button className={`selection-toggle${compact ? " selection-toggle-compact" : ""}${selected ? " is-selected" : ""}`} type="button" onClick={() => toggle(product)} disabled={full} aria-pressed={selected} title={full ? "Можно выбрать не более восьми товаров" : undefined}>{selected ? <Check size={16} /> : <ClipboardList size={16} />}<span>{selected ? "В заявке" : "Добавить в заявку"}</span></button>;
}

function SelectionTray() {
  const { items, remove, clear } = useSelection();
  const [open, setOpen] = useState(false);
  const drawer = useRef<HTMLElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!items.length) setOpen(false);
  }, [items.length]);

  useEffect(() => {
    if (!open || !items.length) return;
    closeButton.current?.focus();

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = drawer.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      trigger.current?.focus();
    };
  }, [open, items.length]);

  if (!items.length) return null;
  const query = encodeURIComponent(items.map((item) => item.title).join("; "));
  return <div className={`selection-tray${open ? " is-open" : ""}`}>
    {open && <button className="selection-backdrop" type="button" aria-label="Закрыть список" onClick={() => setOpen(false)} />}
    <button ref={trigger} className="selection-bar" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="selection-drawer" aria-label={`Открыть заявку на оборудование: ${items.length}`} title="Заявка на оборудование"><ClipboardList size={21} /><b>{items.length}</b></button>
    {open && <aside ref={drawer} id="selection-drawer" className="selection-drawer" role="dialog" aria-modal="true" aria-labelledby="selection-drawer-title"><header><div><small>Мультизаявка</small><h2 id="selection-drawer-title">Выбранное оборудование</h2><p>{items.length} {items.length === 1 ? "позиция" : items.length < 5 ? "позиции" : "позиций"}</p></div><button ref={closeButton} type="button" onClick={() => setOpen(false)} aria-label="Закрыть"><X /></button></header><div className="selection-list">{items.map((item) => <article key={item.slug}><div><small>{item.categoryLabel}{item.brand ? ` · ${item.brand}` : ""}</small><strong>{item.title}</strong></div><button type="button" onClick={() => remove(item.slug)} aria-label={`Убрать ${item.title}`}><Trash2 size={18} /></button></article>)}</div><footer><p>Специалист уточнит совместимость, комплектацию и условия поставки.</p><Link href={`/contacts?product=${query}#consultation`} onClick={() => setOpen(false)}>Отправить заявку <ChevronRight size={18} /></Link><button type="button" onClick={clear}>Очистить список</button></footer></aside>}
  </div>;
}
