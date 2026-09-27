import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  phone: z.string().trim().min(7, "Укажите телефон").max(30),
  email: z.string().trim().email("Проверьте email").or(z.literal("")),
  direction: z.enum(["surgery", "cardiology", "diabetes", "neurosurgery", "anesthesiology", "other"]).optional().default("other"),
  product: z.string().trim().max(1200).optional().default(""),
  contactMethod: z.enum(["phone", "whatsapp", "email"]).optional().default("phone"),
  comment: z.string().trim().max(1000).optional().default(""),
  consent: z.literal(true, { error: "Необходимо согласие" }),
  website: z.string().max(0).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;
