"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";

export function ProductImage({ src, alt, sizes, className = "", priority = false }: { src?: string; alt: string; sizes: string; className?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className="product-image-fallback" role="img" aria-label={`Изображение товара «${alt}» уточняется`}><ImageOff size={25} /><strong>Изображение уточняется</strong><span>ABA Medical</span></div>;
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={90} className={className} onError={() => setFailed(true)} />;
}
