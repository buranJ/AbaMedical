"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { ConsultationForm } from "./ConsultationForm";

type ConsultationRequest = {
  product: string;
  direction: string;
  instance: number;
};

export function ConsultationModal() {
  const [request, setRequest] = useState<ConsultationRequest | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    function openFromLink(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.hash !== "#consultation") return;
      event.preventDefault();
      previousFocus.current = link;
      setRequest({
        product: url.searchParams.get("product") || "",
        direction: url.searchParams.get("direction") || "other",
        instance: Date.now(),
      });
    }

    document.addEventListener("click", openFromLink, true);
    return () => document.removeEventListener("click", openFromLink, true);
  }, []);

  useEffect(() => {
    if (!request) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    function closeOnEscape(event: KeyboardEvent) { if (event.key === "Escape") setRequest(null); }
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      previousFocus.current?.focus();
    };
  }, [request]);

  if (!request) return null;

  return <div className="consultation-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
    <button className="consultation-modal-backdrop" type="button" aria-label="Закрыть форму" onClick={() => setRequest(null)} />
    <div className="consultation-modal-panel">
      <button ref={closeButton} className="consultation-modal-close" type="button" aria-label="Закрыть" onClick={() => setRequest(null)}><X size={22} /></button>
      <div className="consultation-modal-heading">
        <p className="eyebrow">Консультация</p>
        <h2 id={titleId}>Расскажите о вашей задаче</h2>
        <p>{request.product ? "Выбранное оборудование уже добавлено в заявку." : "Укажите направление и удобный способ связи."}</p>
      </div>
      <div className="form-surface">
        <ConsultationForm key={request.instance} initialProduct={request.product} initialDirection={request.direction} />
      </div>
    </div>
  </div>;
}
