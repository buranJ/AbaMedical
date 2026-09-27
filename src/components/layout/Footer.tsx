import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { siteConfig } from "@/config/site";
import { TikTokIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  return <footer className="site-footer text-white"><div className="brand-ribbon" aria-hidden />
    <div className="container pt-14"><div className="footer-cta"><div><p className="eyebrow text-white/65">Есть клиническая задача?</p><h2>Поможем подобрать решение</h2></div><Link className="footer-cta-link" href="/contacts#consultation">Получить консультацию <ArrowUpRight size={19} /></Link></div></div>
    <div className="container footer-main-grid grid gap-10 py-14">
      <div><span className="footer-logo"><Image className="h-auto w-[170px]" src="/images/brand/logo-cropped.png" alt="ABA Medical" width={720} height={164} /></span><p className="mt-5 max-w-sm text-sm leading-6 text-white/62">Медицинское оборудование и расходные материалы для клиник и специалистов Кыргызстана.</p><div className="footer-socials mt-6"><a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="ABA Medical в Instagram"><Instagram size={18} />Instagram</a><a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" aria-label="ABA Medical в TikTok"><TikTokIcon width={17} height={17} />TikTok</a></div></div>
      <div><h2 className="text-sm font-bold uppercase tracking-[.14em] text-white/45">Разделы</h2><div className="footer-links mt-5 grid gap-3 text-sm"><Link href="/catalog">Каталог</Link><Link href="/services">Услуги</Link><Link href="/blog">Новости</Link><Link href="/about">О компании</Link><Link href="/payment">Оплата</Link></div></div>
      <div><h2 className="text-sm font-bold uppercase tracking-[.14em] text-white/45">Направления</h2><div className="footer-links mt-5 grid gap-3 text-sm"><Link href="/catalog/surgery">Хирургия</Link><Link href="/catalog/cardiology">Кардиология</Link><Link href="/catalog/diabetes">Сахарный диабет</Link><Link href="/catalog/neurosurgery">Нейрохирургия</Link><Link href="/catalog/anesthesiology">Анестезиология</Link></div></div>
      <div><h2 className="text-sm font-bold uppercase tracking-[.14em] text-white/45">Контакты</h2><div className="footer-links mt-5 grid gap-3 text-sm"><a className="text-lg font-bold text-white" href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><p>{siteConfig.address}</p><p>{siteConfig.hours}</p></div></div>
    </div><div className="container flex flex-wrap justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/45"><span>© {new Date().getFullYear()} ABA Medical</span><span className="footer-credit">Разработано <a href="https://itdos.dev/" target="_blank" rel="noopener noreferrer">itdos.dev</a></span></div>
  </footer>;
}
