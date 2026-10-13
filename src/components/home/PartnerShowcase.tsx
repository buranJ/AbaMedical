import Image from "next/image";
import { partners } from "@/data/content";

function PartnerGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="partner-marquee-group" aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <div className="partner-marquee-logo" key={partner.name}>
          <Image src={partner.image} alt={hidden ? "" : partner.name} width={190} height={68} className="h-auto max-h-11 w-auto max-w-full object-contain" />
        </div>
      ))}
    </div>
  );
}

export function PartnerShowcase({ heading = "Официальный представитель" }: { heading?: string | null }) {
  return (
    <section className={`partner-marquee-section${heading ? "" : " partner-marquee-section-compact"}`} aria-label="Производители медицинского оборудования">
      {heading && <div className="partner-marquee-heading"><strong>{heading}</strong></div>}
      <div className="partner-marquee-window">
        <div className="partner-marquee-track partner-marquee-track-main">
          <PartnerGroup />
          <PartnerGroup hidden />
          <PartnerGroup hidden />
        </div>
      </div>
    </section>
  );
}
