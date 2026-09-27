"use client";

import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories } from "@/data/content";
import { products } from "@/data/products";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return products.filter((product) => `${product.title} ${product.brand || ""} ${product.categoryLabel} ${product.summary}`.toLowerCase().includes(normalized)).slice(0, 8);
  }, [query]);

  useEffect(() => {
    function keyboard(event: KeyboardEvent) {
      if (event.key === "/" && !open && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) { event.preventDefault(); setOpen(true); }
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", keyboard);
    return () => document.removeEventListener("keydown", keyboard);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const openSearch = () => setOpen(true);
    window.addEventListener("aba:open-search", openSearch);
    return () => window.removeEventListener("aba:open-search", openSearch);
  }, []);

  const close = () => { setOpen(false); setQuery(""); };
  return <>
    <button className="header-search-button" type="button" onClick={() => setOpen(true)} aria-label="Поиск по каталогу"><Search size={18} /><span>Поиск</span></button>
    {open && <div className="global-search" role="dialog" aria-modal="true" aria-label="Поиск по каталогу"><button className="global-search-backdrop" type="button" aria-label="Закрыть поиск" onClick={close} /><section><header><Search size={22} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Название, бренд или назначение" type="search" aria-label="Глобальный поиск по каталогу" /><button type="button" onClick={close} aria-label="Закрыть"><X /></button></header><div className="global-search-body">{!query && <><p>Медицинские направления</p><div className="global-search-directions">{categories.map((category) => <Link href={`/catalog/${category.slug}`} onClick={close} key={category.slug}>{category.title}<ArrowRight size={15} /></Link>)}</div><small>Начните вводить название оборудования, производителя или назначение.</small></>}{query && results.length > 0 && <><p>Найдено в каталоге</p><div className="global-search-results">{results.map((product) => <Link href={`/catalog/product/${product.slug}`} onClick={close} key={product.slug}><span><small>{product.categoryLabel}{product.brand ? ` · ${product.brand}` : ""}</small><strong>{product.title}</strong></span><ArrowRight size={17} /></Link>)}</div><Link className="global-search-all" href={`/catalog#assortment`} onClick={close}>Открыть весь каталог <ArrowRight size={17} /></Link></>}{query && results.length === 0 && <div className="global-search-empty"><strong>Ничего не найдено</strong><p>Попробуйте изменить запрос или перейти в полный каталог.</p><Link href="/catalog" onClick={close}>Открыть каталог</Link></div>}</div></section></div>}
  </>;
}
