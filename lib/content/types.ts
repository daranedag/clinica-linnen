export type IconName =
  | "ear"
  | "heart"
  | "message"
  | "sparkles"
  | "shield"
  | "smile"
  | "align"
  | "implant"
  | "refresh"
  | "baby"
  | "flower";

export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface FeatureContent {
  title: string;
  description: string;
  icon: IconName;
}

export interface ServiceContent {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  accent: "lilac" | "aqua" | "warm";
}

export interface TestimonialContent {
  quote: string;
  author: string;
  context: string;
}

export interface FaqContent {
  question: string;
  answer: string;
}

export interface ContactContent {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  mapUrl: string;
  instagramUrl: string;
  scheduleNote: string;
}

export interface SiteContent {
  seo: {
    title: string;
    description: string;
  };
  hero: HeroContent;
  trustItems: string[];
  carePrinciples: FeatureContent[];
  services: ServiceContent[];
  process: Array<{ title: string; description: string }>;
  testimonials: TestimonialContent[];
  faqs: FaqContent[];
  contact: ContactContent;
  updatedAt: string;
}

export interface ContentRepository {
  getHomePage(): Promise<SiteContent>;
}
