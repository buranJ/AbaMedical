"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function ProductDescription({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const isCollapsible = paragraphs.join(" ").length > 360;

  return <div className={`product-copy mt-10${isCollapsible ? " is-collapsible" : ""}${expanded ? " is-expanded" : ""}`}>
    <h3 className="mb-5 text-2xl font-bold">Подробное описание</h3>
    <div className="product-copy-content">
      {paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>)}
    </div>
    {isCollapsible && <button className="product-copy-toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
      {expanded ? "Скрыть" : "Показать ещё"}
      <ChevronDown size={17} aria-hidden />
    </button>}
  </div>;
}
