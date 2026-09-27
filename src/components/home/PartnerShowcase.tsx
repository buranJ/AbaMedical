import Image from "next/image";

const partners = [
  { name: "Medtronic", src: "/images/partners/optimized/medtronic.png" },
  { name: "Abbott", src: "/images/partners/optimized/abbott.png" },
  { name: "Genoss", src: "/images/partners/optimized/genoss-transparent.png" },
  { name: "Merit Medical", src: "/images/partners/optimized/merit-medical.png" },
  { name: "St. Jude Medical", src: "/images/partners/optimized/st-jude-medical.png" },
  { name: "Concept Medical", src: "/images/partners/optimized/concept-medical.png" },
];

function PartnerGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="partner-marquee-group" aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <div className="partner-marquee-logo" key={partner.name}>
          <Image src={partner.src} alt={hidden ? "" : partner.name} width={190} height={68} className="h-auto max-h-11 w-auto max-w-full object-contain" />
        </div>
      ))}
    </div>
  );
}

export function PartnerShowcase() {
  return (
    <section className="partner-marquee-section" aria-label="Производители медицинского оборудования">
      <div className="partner-marquee-heading">
        <strong>Официальный представитель</strong>
      </div>
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
