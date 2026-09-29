import type { Category, FAQItem, NewsArticle } from "@/types/content";

export const categories: Category[] = [
  { slug: "surgery", title: "Хирургия", description: "Оборудование и расходные материалы для открытых и малоинвазивных вмешательств.", subcategories: [
    { slug: "electrosurgery", title: "Электрохирургия", description: "Энергетические платформы, инструменты и принадлежности." },
    { slug: "suture-materials", title: "Шовные материалы", description: "Материалы для хирургического закрытия тканей." },
    { slug: "stapling-tools", title: "Сшивающие инструменты", description: "Эндоскопические и циркулярные сшивающие системы." },
    { slug: "laparoscopic-racks", title: "Лапароскопические стойки", description: "Комплексные решения для лапароскопии." },
  ]},
  { slug: "cardiology", title: "Кардиология", description: "Решения для электрофизиологии, кардиостимуляции и интервенционной хирургии.", subcategories: [
    { slug: "pacemakers", title: "Кардиостимуляция", description: "Имплантируемые системы и принадлежности." },
    { slug: "electrophysiology", title: "Электрофизиология", description: "Решения для диагностики и лечения нарушений ритма.", children: [
      { slug: "ablation", title: "Абляция", description: "Абляционные катетеры." },
      { slug: "diagnostics", title: "Диагностика", description: "Диагностические электрофизиологические катетеры." },
    ] },
    { slug: "interventional-surgery", title: "Интервенционная хирургия", description: "Коронарные и периферические решения.", children: [
      { slug: "coronary", title: "Коронарные решения", description: "Решения для коронарных вмешательств.", children: [
        { slug: "coronary-stents", title: "Стенты", description: "Стенты для коронарных вмешательств." },
        { slug: "coronary-guidewires", title: "Проводники", description: "Коронарные проводники." },
        { slug: "coronary-balloons", title: "Баллоны", description: "Коронарные баллонные катетеры." },
      ] },
      { slug: "peripheral", title: "Периферические решения", description: "Решения для периферических вмешательств.", children: [
        { slug: "peripheral-stents", title: "Стенты", description: "Стенты для периферических сосудов." },
        { slug: "vascular-closure", title: "Закрытие сосудистого доступа", description: "Устройства закрытия места пункции." },
        { slug: "peripheral-guidewires", title: "Проводники", description: "Периферические проводники." },
        { slug: "peripheral-balloons", title: "Баллоны", description: "Баллоны для периферических процедур." },
      ] },
    ] },
  ]},
  { slug: "diabetes", title: "Сахарный диабет", description: "Инсулиновые помпы, инфузионные системы и мониторинг глюкозы.", subcategories: [] },
  { slug: "neurosurgery", title: "Нейрохирургия", description: "Навигационные и моторные системы для нейрохирургии.", subcategories: [] },
  { slug: "anesthesiology", title: "Анестезиология", description: "Оборудование для контроля глубины анестезии.", subcategories: [] },
];

export const faq: FAQItem[] = [
  { question: "Есть ли гарантия на приобретенную продукцию?", answer: "Да, условия гарантии зависят от вида продукции. Специалист уточнит срок и порядок обслуживания для выбранного оборудования." },
  { question: "Есть ли рассрочка?", answer: "На текущем сайте указана возможность оплаты через банк или по согласованному графику платежей. Условия уточняются индивидуально." },
  { question: "Предусмотрено ли дальнейшее сервисное обслуживание?", answer: "Да, компания заявляет сервисное сопровождение приобретенной продукции. Конкретный объем зависит от оборудования и договора." },
  { question: "Как получить консультацию по подбору оборудования?", answer: "Оставьте заявку на сайте или свяжитесь с профильным специалистом по телефону. Для точного подбора укажите направление и задачу клиники." },
];

export const articles: NewsArticle[] = [
  {
    slug: "kidney-transplantation-kyrgyzstan",
    title: "Трансплантация почек в Кыргызстане",
    excerpt: "Впервые проведена успешная операция по трансплантации внутренних органов.",
    date: null,
    image: "/images/news/kidney-transplantation.webp",
    imageAspect: "1280 / 811",
    body: ["Впервые проведена успешная операция по трансплантации внутренних органов."],
  },
  {
    slug: "arrhythmology-master-class",
    title: "Мастер-класс по аритмологии",
    excerpt: "Если у вас проблемы с ритмом сердца, приглашаем вас на лечение.",
    date: null,
    image: "/images/news/arrhythmology.webp",
    imageAspect: "1080 / 808",
    body: [
      "Если у вас проблемы с ритмом сердца, приглашаем вас на лечение.",
      "Мастер-класс по аритмологии проходил с 21 по 23 сентября в клинике Vedanta.",
    ],
  },
  {
    slug: "bariatric-surgery-master-class",
    title: "Мастер-класс по бариатрии",
    excerpt: "Открыт набор пациентов для проведения бариатрических операций.",
    date: null,
    image: "/images/news/bariatric-surgery.webp",
    imageAspect: "1080 / 878",
    body: [
      "Открыт набор пациентов для проведения бариатрических операций и лечения ожирения.",
      "Мастер-класс проходил с 10 по 14 октября в Бишкеке. Специалист мероприятия — Кахабер Хачапуридзе, хирург, специализирующийся на бариатрической хирургии.",
      "На расходные материалы была предусмотрена рассрочка.",
    ],
  },
];

export const partners = ["Medtronic", "Abbott", "Genoss", "Merit Medical", "St. Jude Medical", "Concept Medical"];
