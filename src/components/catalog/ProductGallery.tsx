"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const selected = images[active];
  const previous = () => setActive((current) => (current - 1 + images.length) % images.length);
  const next = () => setActive((current) => (current + 1) % images.length);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (!expanded) return;
      if (event.key === "Escape") setExpanded(false);
      if (event.key === "ArrowLeft" && images.length > 1) previous();
      if (event.key === "ArrowRight" && images.length > 1) next();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  if (!selected) {
    return <div className="brand-panel relative grid aspect-[4/3] place-items-center border border-[var(--border)] p-10 text-center"><div><p className="text-sm font-bold uppercase tracking-widest text-[var(--primary)]">ABA Medical</p><p className="mt-5 text-2xl font-bold text-slate-400">Изображение уточняется</p></div></div>;
  }

  return <div className="product-gallery">
    <div className="brand-panel relative aspect-[4/3] overflow-hidden border border-[var(--border)]">
      <Image key={selected} src={selected} alt={`${title}${images.length > 1 ? ` — изображение ${active + 1}` : ""}`} fill priority quality={90} sizes="(max-width: 1024px) 100vw, 50vw" className="gallery-image object-contain p-4" />
      <button className="gallery-expand" type="button" onClick={() => setExpanded(true)} aria-label="Открыть изображение крупнее"><ZoomIn size={19} /><span>Увеличить</span></button>
      {images.length > 1 && <span className="gallery-counter">{active + 1} / {images.length}</span>}
    </div>
    {images.length > 1 && <div className="mt-3 grid grid-cols-4 gap-3" aria-label="Фотографии товара">
      {images.map((image, index) => <button key={image} type="button" onClick={() => setActive(index)} aria-label={`Показать изображение ${index + 1}`} aria-pressed={active === index} className={`gallery-thumb relative aspect-[4/3] overflow-hidden border bg-white transition ${active === index ? "border-[var(--primary)]" : "border-[var(--border)] hover:border-[var(--lavender)]"}`}><Image src={image} alt="" fill quality={90} sizes="120px" className="object-contain p-1" /></button>)}
    </div>}
    {expanded && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`Увеличенное изображение: ${title}`}><button className="gallery-close" type="button" onClick={() => setExpanded(false)} aria-label="Закрыть просмотр"><X /></button>{images.length > 1 && <button className="gallery-prev" type="button" onClick={previous} aria-label="Предыдущее изображение"><ChevronLeft /></button>}<div className="gallery-lightbox-image"><Image src={selected} alt={title} fill quality={95} sizes="100vw" className="object-contain" /></div>{images.length > 1 && <button className="gallery-next" type="button" onClick={next} aria-label="Следующее изображение"><ChevronRight /></button>}<span className="gallery-lightbox-count">{active + 1} / {images.length}</span></div>}
  </div>;
}
