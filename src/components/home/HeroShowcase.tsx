"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRef, useState } from "react";
import homeContent from "@/data/home.generated.json";

const { slides, officialRepresentative } = homeContent;

export function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const activeSlide = slides[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const finishSwipe = (clientX: number) => {
    if (touchStartX.current === null) return;
    const distance = clientX - touchStartX.current;
    if (Math.abs(distance) > 45) distance > 0 ? showPrevious() : showNext();
    touchStartX.current = null;
  };

  return (
    <section className="hero-showcase" aria-roledescription="carousel" aria-label="Решения ABA Medical">
      <div className="container hero-concept hero-concept-editorial hero-slider">
        <div className="hero-concept-copy">
          <div key={activeSlide.id} className="hero-slider-copy" aria-live="polite">
            <p className="eyebrow">{activeSlide.eyebrow}</p>
            <h1 aria-label={`${activeSlide.title} ${activeSlide.accent}`}>
              <span className="hero-title-desktop">{activeSlide.title} <b>{activeSlide.accent}</b></span>
              <span className="hero-title-mobile" aria-hidden="true"><b>{activeSlide.mobileTitle[0]}</b><b>{activeSlide.mobileTitle[1]}</b></span>
            </h1>
            <p>{activeSlide.description}</p>
            <strong className="hero-official-line">{officialRepresentative}</strong>
            <div className="hero-concept-actions">
              <Link href={activeSlide.primaryAction.href}>
                {activeSlide.primaryAction.label} <ArrowRight size={18} />
              </Link>
              <Link href={activeSlide.secondaryAction.href}>{activeSlide.secondaryAction.label}</Link>
            </div>
          </div>

          <div key={`${activeSlide.id}-features`} className="hero-concept-proof">
            {activeSlide.features.map((feature) => (
              <span key={feature}>
                <Check size={15} />
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-concept-image" onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => finishSwipe(event.changedTouches[0]?.clientX ?? 0)}>
          <Image
            key={activeSlide.id}
            src={activeSlide.image}
            alt={activeSlide.imageAlt}
            fill
            preload={activeIndex === 0}
            quality={95}
            sizes="100vw"
            className="object-cover hero-slider-image is-active"
          />
          <div className="hero-slider-controls" aria-label="Переключение слайдов">
            <button type="button" onClick={showPrevious} aria-label="Предыдущий слайд">
              <ArrowLeft size={20} />
            </button>
            <button type="button" onClick={showNext} aria-label="Следующий слайд">
              <ArrowRight size={20} />
            </button>
          </div>
          <div key={`${activeSlide.id}-caption`} className="hero-editorial-caption">
            <small>{activeSlide.captionLabel}</small>
            <strong>{activeSlide.caption}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
