import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return <footer className="site-footer text-white"><div className="brand-ribbon" aria-hidden />
    <div className="container pt-14"><div className="footer-cta"><div><p className="eyebrow text-white/65">Есть клиническая задача?</p><h2>Поможем подобрать решение</h2></div><Link className="footer-cta-link" href="/contacts#consultation">Получить консультацию <ArrowUpRight size={19} /></Link></div></div>
    <div className="container footer-main-grid grid gap-10 py-14">
      <div><span className="footer-logo"><Image className="h-auto w-[170px]" src="/images/brand/logo-cropped.png" alt="ABA Medical" width={720} height={164} /></span><p className="mt-5 max-w-sm text-sm leading-6 text-white/62">Медицинское оборудование и расходные материалы для клиник и специалистов Кыргызстана.</p><div className="mt-6 flex gap-4 text-sm font-bold text-white/75"><a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a></div></div>
      <div><h2 className="text-sm font-bold uppercase tracking-[.14em] text-white/45">Разделы</h2><div className="footer-links mt-5 grid gap-3 text-sm"><Link href="/catalog">Каталог</Link><Link href="/services">Услуги</Link><Link href="/blog">Новости</Link><Link href="/about">О компании</Link><Link href="/payment">Оплата</Link></div></div>
      <div><h2 className="text-sm font-bold uppercase tracking-[.14em] text-white/45">Направления</h2><div className="footer-links mt-5 grid gap-3 text-sm"><Link href="/catalog/surgery">Хирургия</Link><Link href="/catalog/cardiology">Кардиология</Link><Link href="/catalog/diabetes">Сахарный диабет</Link><Link href="/catalog/neurosurgery">Нейрохирургия</Link><Link href="/catalog/anesthesiology">Анестезиология</Link></div></div>
      <div><h2 className="text-sm font-bold uppercase tracking-[.14em] text-white/45">Контакты</h2><div className="footer-links mt-5 grid gap-3 text-sm"><a className="text-lg font-bold text-white" href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><p>{siteConfig.address}</p><p>{siteConfig.hours}</p></div></div>
    </div><div className="container flex flex-wrap justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/45"><span>© {new Date().getFullYear()} ABA Medical</span><span>Информация на сайте не заменяет консультацию медицинского специалиста.</span></div>
  </footer>;
}
