import { z } from "zod";

const iconSchema = z.enum([
  "ear",
  "heart",
  "message",
  "sparkles",
  "shield",
  "smile",
  "align",
  "implant",
  "refresh",
  "baby",
  "flower",
]);

export const siteContentPayloadSchema = z.object({
  seo: z.object({ title: z.string().min(1), description: z.string().min(1) }),
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    primaryCta: z.string().min(1),
    secondaryCta: z.string().min(1),
  }),
  trustItems: z.array(z.string()).max(6),
  carePrinciples: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: iconSchema,
      }),
    )
    .max(8),
  services: z
    .array(
      z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        icon: iconSchema,
        accent: z.enum(["lilac", "aqua", "warm"]),
      }),
    )
    .max(20),
  process: z.array(z.object({ title: z.string(), description: z.string() })).max(8),
  testimonials: z
    .array(
      z.object({ quote: z.string(), author: z.string(), context: z.string() }),
    )
    .max(20),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).max(30),
  contact: z.object({
    phone: z.string(),
    whatsapp: z.string().url(),
    email: z.string().email(),
    address: z.string(),
    city: z.string(),
    mapUrl: z.string().url(),
    instagramUrl: z.string().url(),
    scheduleNote: z.string(),
  }),
});

export type SiteContentPayload = z.infer<typeof siteContentPayloadSchema>;
