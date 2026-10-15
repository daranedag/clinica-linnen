import type { SiteContent } from "@/lib/content/types";

const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "56920953624";

export const fallbackContent: SiteContent = {
  seo: {
    title: "Clínica Linnen | Odontología humanizada en Valdivia",
    description:
      "Atención odontológica sin juicios, a tu ritmo y con acompañamiento real en el centro de Valdivia.",
  },
  hero: {
    eyebrow: "Clínica odontológica humanizada en Valdivia",
    title: "Odontología sin miedo, con tiempo y sin juicios.",
    description:
      "Te escuchamos, respetamos tu ritmo y te acompañamos para que volver al dentista se sienta seguro.",
    primaryCta: "Quiero agendar",
    secondaryCta: "Conocer nuestro enfoque",
  },
  trustItems: [
    "5,0 en Google",
    "56 experiencias compartidas",
    "En el centro de Valdivia",
  ],
  carePrinciples: [
    {
      title: "Te escuchamos",
      description:
        "Conocemos tu historia, tus miedos y lo que necesitas antes de hablar de tratamientos.",
      icon: "ear",
    },
    {
      title: "Avanzamos a tu ritmo",
      description:
        "Acordamos pausas y señales para que siempre mantengas el control de la experiencia.",
      icon: "heart",
    },
    {
      title: "Te explicamos con claridad",
      description:
        "Sabes qué haremos, por qué y cuáles son tus alternativas antes de decidir.",
      icon: "message",
    },
    {
      title: "Cuidamos tu comodidad",
      description:
        "Adaptamos cada visita con atención cálida y apoyos pensados para hacerte sentir bien.",
      icon: "sparkles",
    },
  ],
  services: [
    {
      slug: "odontologia-general",
      title: "Cuidado general",
      description: "Evaluación, prevención, limpiezas y restauraciones para cuidar tu salud día a día.",
      icon: "shield",
      accent: "lilac",
    },
    {
      slug: "ortodoncia",
      title: "Ortodoncia",
      description: "Alternativas personalizadas para alinear tu sonrisa y mejorar tu mordida.",
      icon: "align",
      accent: "aqua",
    },
    {
      slug: "implantes-cirugia",
      title: "Implantes y cirugía",
      description: "Recupera función y confianza con una planificación cuidadosa y acompañada.",
      icon: "implant",
      accent: "warm",
    },
    {
      slug: "rehabilitacion-oral",
      title: "Rehabilitación oral",
      description: "Soluciones integrales para volver a comer, hablar y sonreír con tranquilidad.",
      icon: "refresh",
      accent: "aqua",
    },
    {
      slug: "odontopediatria",
      title: "Odontopediatría",
      description: "Primeras experiencias positivas para cuidar sonrisas desde la infancia.",
      icon: "baby",
      accent: "lilac",
    },
    {
      slug: "estetica-dental",
      title: "Estética dental",
      description: "Tratamientos conservadores para una sonrisa natural que se sienta tuya.",
      icon: "flower",
      accent: "warm",
    },
  ],
  process: [
    {
      title: "Cuéntanos qué necesitas",
      description: "Escríbenos por WhatsApp. Puedes contarnos si sientes miedo o necesitas alguna adaptación.",
    },
    {
      title: "Te recibimos sin juicios",
      description: "Conversamos primero, evaluamos con calma y resolvemos todas tus dudas.",
    },
    {
      title: "Creamos tu plan contigo",
      description: "Definimos prioridades, alternativas y próximos pasos de manera clara y gradual.",
    },
  ],
  testimonials: [
    {
      quote:
        "Su vocación y cariño crean un ambiente de seguridad donde siempre velan por tu comodidad.",
      author: "Estrella Núñez",
      context: "Experiencia compartida por una paciente",
    },
    {
      quote:
        "El trato humano nos orientó y nos dio esperanza para continuar un tratamiento que pensábamos dejar.",
      author: "Juan Avilés",
      context: "Experiencia compartida por un paciente",
    },
    {
      quote:
        "Te transmiten mucha tranquilidad durante los procedimientos. El lugar se siente alegre y acogedor.",
      author: "Claudia Contreras",
      context: "Experiencia compartida por una paciente",
    },
  ],
  faqs: [
    {
      question: "¿Qué pasa si me da mucho miedo ir al dentista?",
      answer:
        "Puedes contárnoslo desde el primer mensaje. La evaluación comienza conversando y acordando cómo ayudarte a sentir seguridad, incluyendo pausas y señales durante la atención.",
    },
    {
      question: "¿Puedo ir acompañado o acompañada?",
      answer:
        "Sí. Si contar con una persona de confianza te ayuda, indícalo al agendar para preparar tu visita.",
    },
    {
      question: "¿Atienden a niñas y niños?",
      answer:
        "La clínica ofrece atención para familias y odontopediatría. Al reservar, cuéntanos la edad y el motivo de consulta para orientarte mejor.",
    },
    {
      question: "¿Trabajan con Fonasa o Isapres?",
      answer:
        "Consulta por los convenios y beneficios vigentes al momento de agendar. El equipo te explicará requisitos y cobertura antes de tu visita.",
    },
  ],
  contact: {
    phone: "+56 9 2095 3624",
    whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hola Clínica Linnen, quisiera agendar una evaluación.",
    )}`,
    email: "clinicalinnen@gmail.com",
    address: "Independencia 630, oficina 403",
    city: "Valdivia, Región de Los Ríos",
    mapUrl: "https://www.google.com/maps?cid=8266545229579077039",
    instagramUrl: "https://www.instagram.com/clinica.linnen/",
    scheduleNote: "Atención con agenda. Confirma la disponibilidad por WhatsApp.",
  },
  updatedAt: "2026-09-17T00:00:00.000Z",
};
