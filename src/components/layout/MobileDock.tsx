"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Home, LayoutGrid, Search } from "lucide-react";

export function MobileDock() {
  const pathname = usePathname();
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav className="mobile-dock" aria-label="Быстрая навигация">
      <Link href="/" className={active("/") ? "is-active" : ""}><Home size={19} /><span>Главная</span></Link>
      <Link href="/catalog" className={active("/catalog") ? "is-active" : ""}><LayoutGrid size={19} /><span>Каталог</span></Link>
      <button type="button" onClick={() => window.dispatchEvent(new Event("aba:open-search"))}><Search size={19} /><span>Поиск</span></button>
      <Link href="/contacts#consultation" className={active("/contacts") ? "is-active" : ""}><ClipboardList size={19} /><span>Заявка</span></Link>
    </nav>
  );
}
