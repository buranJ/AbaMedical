"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRef, useState } from "react";

const slides = [
  {
    id: "result",
    eyebrow: "ABA Medical · Кыргызстан",
    title: "Технологии, которые работают",
    accent: "на результат",
    mobileTitle: ["Технологии, которые", "работают на результат"],
    description:
      "Оборудование и расходные материалы для клиник — от профессионального подбора до внедрения и обучения команды.",
    primaryAction: { label: "Открыть каталог", href: "/catalog" },
    secondaryAction: { label: "Обсудить задачу", href: "#consultation" },
    features: ["Подбор комплектации", "Сервисное сопровождение"],
    image: "/images/hero/generated/hero-operating-suite-hd.png",
    imageAlt: "Современная гибридная операционная",
    captionLabel: "Комплексное оснащение",
    caption: "От отдельного оборудования до решения для отделения",
  },
  {
    id: "team",
    eyebrow: "Оборудование · обучение · сервис",
    title: "Сильная медицина начинается с",
    accent: "точного решения",
    mobileTitle: ["Сильная медицина", "начинается с решения"],
    description:
      "Помогаем специалистам выбрать технологию, подготовить команду и уверенно внедрить решение в клиническую практику.",
    primaryAction: { label: "Получить консультацию", href: "#consultation" },
    secondaryAction: { label: "Как мы работаем", href: "/services" },
    features: ["Подбор под клиническую задачу", "Обучение медицинской команды", "Сопровождение на каждом этапе"],
    image: "/images/hero/generated/hero-clinical-team-hd.png",
    imageAlt: "Медицинская команда в современной операционной",
    captionLabel: "Команда и практика",
    caption: "От выбора технологии до уверенной работы специалистов",
  },
  {
    id: "technology",
    eyebrow: "Медицинские технологии",
    title: "Оборудование для уверенной",
    accent: "клинической работы",
    mobileTitle: ["Точное оборудование", "для клинической работы"],
    description:
      "Современные решения для хирургии, кардиологии, нейрохирургии, анестезиологии и контроля диабета.",
    primaryAction: { label: "Найти оборудование", href: "/catalog" },
    secondaryAction: { label: "Все направления", href: "#directions" },
    features: ["Хирургия", "Кардиология", "Нейрохирургия"],
    image: "/images/hero/generated/hero-navigation-system-hd.png",
    imageAlt: "Современная медицинская навигационная система",
    captionLabel: "Высокая точность",
    caption: "Точная визуализация для сложных процедур",
  },
] as const;

const officialRepresentative =
  "Официальный представитель крупнейших производителей медицинского оборудования и расходных материалов";

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
            sizes="(max-width: 900px) 100vw, (min-width: 1440px) 800px, 58vw"
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
