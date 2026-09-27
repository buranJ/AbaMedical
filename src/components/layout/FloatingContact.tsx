import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function FloatingContact() {
  return <a className="floating-contact" href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Написать ABA Medical в WhatsApp"><WhatsAppIcon width={24} height={24} /></a>;
}
