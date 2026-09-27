"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

const slides = [
  {
    id: "result",
    eyebrow: "ABA Medical · Кыргызстан",
    title: "Технологии, которые работают",
    accent: "на результат",
    description:
      "Оборудование и расходные материалы для клиник — от профессионального подбора до внедрения и обучения команды.",
    primaryAction: { label: "Открыть каталог", href: "/catalog" },
    secondaryAction: { label: "Обсудить задачу", href: "#consultation" },
    features: ["Подбор комплектации", "Сервисное сопровождение"],
    image: "/images/hero/generated/hero-operating-suite.png",
    imageAlt: "Современная гибридная операционная",
    captionLabel: "Комплексное оснащение",
    caption: "От отдельного оборудования до решения для отделения",
  },
  {
    id: "team",
    eyebrow: "Оборудование · обучение · сервис",
    title: "Сильная медицина начинается с",
    accent: "точного решения",
    description:
      "Помогаем специалистам выбрать технологию, подготовить команду и уверенно внедрить решение в клиническую практику.",
    primaryAction: { label: "Получить консультацию", href: "#consultation" },
    secondaryAction: { label: "Как мы работаем", href: "/services" },
    features: ["Подбор под клиническую задачу", "Обучение медицинской команды", "Сопровождение на каждом этапе"],
    image: "/images/hero/generated/hero-clinical-team.png",
    imageAlt: "Медицинская команда в современной операционной",
    captionLabel: "Команда и практика",
    caption: "От выбора технологии до уверенной работы специалистов",
  },
  {
    id: "technology",
    eyebrow: "Медицинские технологии",
    title: "Оборудование для уверенной",
    accent: "клинической работы",
    description:
      "Современные решения для хирургии, кардиологии, нейрохирургии, анестезиологии и контроля диабета.",
    primaryAction: { label: "Найти оборудование", href: "/catalog" },
    secondaryAction: { label: "Все направления", href: "#directions" },
    features: ["Хирургия", "Кардиология", "Нейрохирургия"],
    image: "/images/hero/generated/hero-navigation-system.png",
    imageAlt: "Современная медицинская навигационная система",
    captionLabel: "Высокая точность",
    caption: "Точная визуализация для сложных процедур",
  },
] as const;

const officialRepresentative =
  "Официальный представитель крупнейших производителей медицинского оборудования и расходных материалов";

export function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section className="hero-showcase" aria-roledescription="carousel" aria-label="Решения ABA Medical">
      <div className="container hero-concept hero-concept-editorial hero-slider">
        <div className="hero-concept-copy">
          <div key={activeSlide.id} className="hero-slider-copy" aria-live="polite">
            <p className="eyebrow">{activeSlide.eyebrow}</p>
            <h1>
              {activeSlide.title} <span>{activeSlide.accent}</span>
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

        <div className="hero-concept-image">
          {slides.map((slide, index) => (
            <Image
              key={slide.id}
              src={slide.image}
              alt={index === activeIndex ? slide.imageAlt : ""}
              fill
              preload={index === 0}
              quality={95}
              sizes="(max-width: 900px) 100vw, 58vw"
              className={`object-cover hero-slider-image${index === activeIndex ? " is-active" : ""}`}
            />
          ))}
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
