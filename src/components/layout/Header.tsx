"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/content";
import { GlobalSearch } from "@/components/catalog/GlobalSearch";

const links = [["Главная", "/"], ["Услуги", "/services"], ["Новости", "/blog"], ["О компании", "/about"], ["Контакты", "/contacts"]];

export function Header() {
  const [open, setOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => !href.includes("#") && (href === "/" ? pathname === "/" : pathname.startsWith(href));
  return <header className="site-header sticky top-0 z-50">
    <div className="header-accent" aria-hidden />
    <div className="header-utility hidden md:block"><div className="container flex min-h-8 items-center justify-between gap-6"><p>Медицинские технологии для клиник Кыргызстана</p><div className="flex items-center gap-6"><a href={`mailto:${siteConfig.email}`}><Mail size={13} />{siteConfig.email}</a><span>{siteConfig.hours}</span></div></div></div>
    <div className="container header-shell flex min-h-[74px] items-center gap-5">
      <Link href="/" className="mr-auto" aria-label="ABA Medical — главная"><Image className="h-auto w-[174px]" src="/images/brand/logo-cropped.png" alt="ABA Medical" width={720} height={164} priority /></Link>
      <nav aria-label="Основная навигация" className="hidden items-center xl:flex">
        <Link className={`nav-link${isActive("/") ? " nav-link-active" : ""}`} href="/">Главная</Link>
        <div className="nav-catalog-shell" onMouseEnter={() => setCatalogOpen(true)} onMouseLeave={() => setCatalogOpen(false)} onFocus={() => setCatalogOpen(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setCatalogOpen(false); }}>
          <Link className={`nav-link nav-catalog-link${pathname.startsWith("/catalog") ? " nav-link-active" : ""}`} href="/catalog" aria-expanded={catalogOpen}>Каталог <span aria-hidden>⌄</span></Link>
          {catalogOpen && <div className="catalog-mega-wrap"><div className="catalog-mega container">
            <div className="catalog-mega-intro"><p className="eyebrow">Каталог</p><h2>Решения по медицинским направлениям</h2><p>Оборудование, расходные материалы и сопровождение специалистов.</p><Link href="/catalog" onClick={() => setCatalogOpen(false)}>Весь каталог <ArrowUpRight size={17} /></Link></div>
            <div className="catalog-mega-grid">{categories.map((category) => <section key={category.slug}><Link className="catalog-mega-title" href={`/catalog/${category.slug}`} onClick={() => setCatalogOpen(false)}>{category.title}<ArrowUpRight size={16} /></Link><div>{category.subcategories.slice(0, 4).map((subcategory) => <Link href={`/catalog/${category.slug}/${subcategory.slug}`} key={subcategory.slug} onClick={() => setCatalogOpen(false)}>{subcategory.title}</Link>)}{category.subcategories.length === 0 && <span>{category.description}</span>}</div></section>)}</div>
          </div></div>}
        </div>
        {links.slice(1).map(([label, href]) => <Link key={href} className={`nav-link${isActive(href) ? " nav-link-active" : ""}`} href={href} aria-current={isActive(href) ? "page" : undefined}>{label}</Link>)}
      </nav>
      <GlobalSearch />
      <a className="header-phone hidden items-center gap-2 lg:flex" href={`tel:${siteConfig.phoneHref}`}><Phone size={16} />{siteConfig.phone}</a>
      <Link className="header-cta hidden 2xl:inline-flex" href="/contacts#consultation">Консультация <ArrowUpRight size={17} /></Link>
      <button type="button" className="header-menu xl:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-menu" aria-label="Мобильная навигация" className="mobile-menu container xl:hidden"><div className="grid"><Link href="/" aria-current={isActive("/") ? "page" : undefined} onClick={() => setOpen(false)}>Главная<ArrowUpRight size={17} /></Link><Link href="/catalog" aria-current={pathname.startsWith("/catalog") ? "page" : undefined} onClick={() => setOpen(false)}>Каталог<ArrowUpRight size={17} /></Link><div className="mobile-directions">{categories.map((category) => <Link key={category.slug} href={`/catalog/${category.slug}`} onClick={() => setOpen(false)}>{category.title}</Link>)}</div>{links.slice(1).map(([label, href]) => <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17} /></Link>)}<a className="mobile-menu-phone" href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a></div></nav>}
  </header>;
}
