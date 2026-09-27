import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function FloatingContact() {
  return <a className="floating-contact" href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Написать ABA Medical в WhatsApp"><MessageCircle size={22} aria-hidden /><span>WhatsApp</span></a>;
}
