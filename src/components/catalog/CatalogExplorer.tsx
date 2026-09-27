"use client";

import Link from "next/link";
import { Check, ChevronDown, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types/content";
import { ProductCard } from "./ProductCard";
import { ProductImage } from "./ProductImage";
import { SelectionToggle } from "./SelectionProvider";

const directionNames: Record<string, string> = { surgery: "Хирургия", cardiology: "Кардиология", diabetes: "Сахарный диабет", neurosurgery: "Нейрохирургия", anesthesiology: "Анестезиология" };
type Option = { value: string; label: string };

function FilterMenu({ label, value, options, onChange }: { label: string; value: string; options: Option[]; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value)?.label ?? options[0]?.label;

  useEffect(() => {
    function close(event: MouseEvent) { if (!root.current?.contains(event.target as Node)) setOpen(false); }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", escape); };
  }, []);

  return <div className="filter-menu" ref={root}>
    <button className="filter-menu-trigger" type="button" role="combobox" aria-label={label} aria-expanded={open} aria-controls={`filter-${label}`} onClick={() => setOpen((current) => !current)}><span><small>{label}</small><strong>{selected}</strong></span><ChevronDown className={open ? "rotate-180" : ""} size={18} /></button>
    {open && <div className="filter-menu-panel" id={`filter-${label}`} role="listbox" aria-label={label}>{options.map((option) => <button className="filter-menu-option" type="button" role="option" aria-selected={option.value === value} key={option.value} onClick={() => { onChange(option.value); setOpen(false); }}><span>{option.label}</span>{option.value === value && <Check size={17} />}</button>)}</div>}
  </div>;
}

export function CatalogExplorer({ products }: { products: Product[] }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [limit, setLimit] = useState(12);
  const [query, setQuery] = useState("");
  const [direction, setDirection] = useState("all");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [selected, setSelected] = useState<string[]>([]);
  const brands = [...new Set(products.map((product) => product.brand).filter(Boolean))].sort() as string[];
  const categories = [...new Set(products.filter((product) => direction === "all" || product.direction === direction).map((product) => product.categoryLabel))].sort();
  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = products.filter((product) => (!normalizedQuery || `${product.title} ${product.categoryLabel} ${product.brand || ""} ${product.summary}`.toLowerCase().includes(normalizedQuery)) && (direction === "all" || product.direction === direction) && (category === "all" || product.categoryLabel === category) && (brand === "all" || product.brand === brand));
    if (sort === "title") result.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    if (sort === "brand") result.sort((a, b) => (a.brand || "Я").localeCompare(b.brand || "Я", "ru"));
    return result;
  }, [query, direction, category, brand, sort, products]);
  const compared = selected.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean) as Product[];
  const shown = visible.slice(0, limit);
  const reset = () => { setQuery(""); setDirection("all"); setCategory("all"); setBrand("all"); setSort("relevance"); setLimit(12); };
  const toggleCompare = (slug: string) => setSelected((current) => current.includes(slug) ? current.filter((item) => item !== slug) : current.length < 3 ? [...current, slug] : current);
  const activeFilters = [direction, category, brand].filter((item) => item !== "all").length + (query ? 1 : 0);

  return <>
    <div className="catalog-toolbar">
      <div className="catalog-search-row">
        <label className="catalog-search"><span className="sr-only">Поиск по каталогу</span><Search size={22} /><input value={query} onChange={(event) => { setQuery(event.target.value); setLimit(12); }} placeholder="Найти оборудование или производителя" type="search" /></label>
        <div className="catalog-result-pill"><strong>{visible.length}</strong><span>позиций</span></div>
        <button className="catalog-reset" type="button" onClick={reset} aria-label="Сбросить фильтры"><RotateCcw size={19} /><span>Сбросить</span></button>
      </div>
      <button className="catalog-filter-toggle" type="button" aria-expanded={filtersOpen} aria-controls="catalog-filters" onClick={() => setFiltersOpen((current) => !current)}><span><SlidersHorizontal size={18} />Фильтры {activeFilters > 0 && <b>{activeFilters}</b>}</span><ChevronDown className={filtersOpen ? "rotate-180" : ""} size={19} /></button>
      <div className={`catalog-filter-row${filtersOpen ? " is-open" : ""}`} id="catalog-filters">
        <div className="catalog-filter-title"><SlidersHorizontal size={18} /><span>Фильтры</span>{activeFilters > 0 && <b>{activeFilters}</b>}</div>
        <div className="catalog-filter-control"><FilterMenu label="Направление" value={direction} options={[{ value: "all", label: "Все направления" }, ...Object.entries(directionNames).map(([value, label]) => ({ value, label }))]} onChange={(value) => { setDirection(value); setCategory("all"); setLimit(12); }} /></div>
        <div className="catalog-filter-control"><FilterMenu label="Категория" value={category} options={[{ value: "all", label: "Все категории" }, ...categories.map((item) => ({ value: item, label: item }))]} onChange={(value) => { setCategory(value); setLimit(12); }} /></div>
        <div className="catalog-filter-control"><FilterMenu label="Производитель" value={brand} options={[{ value: "all", label: "Все производители" }, ...brands.map((item) => ({ value: item, label: item }))]} onChange={(value) => { setBrand(value); setLimit(12); }} /></div>
        <div className="catalog-filter-control"><FilterMenu label="Порядок" value={sort} options={[{ value: "relevance", label: "По релевантности" }, { value: "title", label: "По названию" }, { value: "brand", label: "По бренду" }]} onChange={(value) => { setSort(value); setLimit(12); }} /></div>
      </div>
    </div>
    {activeFilters > 0 && <div className="active-filter-chips" aria-label="Активные фильтры">{query && <button type="button" onClick={() => { setQuery(""); setLimit(12); }}>Поиск: {query}<X size={14} /></button>}{direction !== "all" && <button type="button" onClick={() => { setDirection("all"); setCategory("all"); setLimit(12); }}>{directionNames[direction]}<X size={14} /></button>}{category !== "all" && <button type="button" onClick={() => { setCategory("all"); setLimit(12); }}>{category}<X size={14} /></button>}{brand !== "all" && <button type="button" onClick={() => { setBrand("all"); setLimit(12); }}>{brand}<X size={14} /></button>}<button className="active-filter-clear" type="button" onClick={reset}>Очистить всё</button></div>}
    <div className="catalog-meta"><p aria-live="polite">Показано <strong>{visible.length}</strong> из {products.length}</p><p>Можно сравнить до трёх товаров</p></div>
    {compared.length > 0 && <section className="compare-panel mb-8" aria-label="Сравнение товаров"><div className="compare-panel-head"><div><small>Рабочая область</small><h3>Сравнение · {compared.length} из 3</h3></div><button type="button" onClick={() => setSelected([])}>Очистить сравнение</button></div><div className="overflow-x-auto"><table className="compare-table"><thead><tr><th className="compare-row-label">Товары</th>{compared.map((product) => <th key={product.slug}><button className="compare-remove" type="button" onClick={() => toggleCompare(product.slug)} aria-label={`Убрать ${product.title} из сравнения`}><X size={17} /></button><div className="compare-image"><ProductImage src={product.image} alt={product.title} sizes="180px" className="object-contain p-4" /></div><Link href={`/catalog/product/${product.slug}`}>{product.title}</Link><SelectionToggle product={product} compact /></th>)}</tr></thead><tbody><tr><th className="compare-row-label">Производитель</th>{compared.map((product) => <td key={product.slug}>{product.brand || "Не указан"}</td>)}</tr><tr><th className="compare-row-label">Категория</th>{compared.map((product) => <td key={product.slug}>{product.categoryLabel}</td>)}</tr><tr><th className="compare-row-label">Назначение</th>{compared.map((product) => <td className="leading-6 text-slate-600" key={product.slug}>{product.summary}</td>)}</tr></tbody></table></div></section>}
    {visible.length ? <><div className="catalog-product-grid">{shown.map((product) => <ProductCard key={product.slug} product={product} compareControl={<label className="compare-toggle"><input type="checkbox" checked={selected.includes(product.slug)} disabled={!selected.includes(product.slug) && selected.length >= 3} onChange={() => toggleCompare(product.slug)} /><span>{selected.includes(product.slug) ? "В сравнении" : "Сравнить"}</span></label>} />)}</div>{shown.length < visible.length && <div className="catalog-load-more"><div><span style={{ width: `${(shown.length / visible.length) * 100}%` }} /></div><p>Показано {shown.length} из {visible.length}</p><button type="button" onClick={() => setLimit((current) => current + 12)}>Показать ещё</button></div>}</> : <div className="card p-10 text-center"><h2 className="text-xl font-bold">Ничего не найдено</h2><p className="mt-2 text-slate-600">Измените запрос или сбросьте фильтры.</p><button className="btn btn-secondary mt-5" type="button" onClick={reset}>Сбросить фильтры</button></div>}
  </>;
}
