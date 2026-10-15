import type { Metadata } from "next";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Star,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ClinicIcon } from "@/components/clinic-icon";
import { ClinicImage } from "@/components/clinic-image";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { getHomePageContent } from "@/lib/content/repository";
import { imageKitEndpoint } from "@/lib/media/imagekit";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomePageContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
  };
}

function JsonLd({ phone, address }: { phone: string; address: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Clínica Linnen",
    description: "Clínica odontológica con enfoque humanizado en Valdivia.",
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Valdivia",
      addressRegion: "Los Ríos",
      addressCountry: "CL",
    },
    sameAs: ["https://www.instagram.com/clinica.linnen/"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function HomePage() {
  const content = await getHomePageContent();
  const { contact } = content;

  return (
    <>
      <JsonLd phone={contact.phone} address={contact.address} />
      <a
        href="#contenido"
        className="sr-only z-[100] rounded-lg bg-white px-4 py-3 font-bold text-lilac-700 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <SiteHeader whatsapp={contact.whatsapp} />

      <main id="contenido">
        <section className="soft-grid relative overflow-hidden pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-24">
          <div className="pointer-events-none absolute -left-40 top-28 h-80 w-80 rounded-full bg-aqua-100/60 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-aqua-400/25 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-aqua-800 shadow-sm">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {content.hero.eyebrow}
              </div>
              <h1 className="max-w-4xl font-display text-[3.7rem] font-semibold leading-[0.88] tracking-[-0.025em] text-ink sm:text-7xl lg:text-[5.8rem]">
                Odontología <span className="text-lilac-700">sin miedo</span>, con tiempo y sin juicios.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                {content.hero.description}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-lilac-700 px-6 py-4 font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-lilac-900"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  {content.hero.primaryCta}
                </a>
                <a
                  href="#enfoque"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-lilac-300 bg-white px-6 py-4 font-bold text-lilac-700 transition hover:border-lilac-700"
                >
                  {content.hero.secondaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm font-medium text-muted">
                <Check className="h-4 w-4 text-aqua-800" aria-hidden="true" />
                Cuéntanos si sientes ansiedad. No necesitas justificarla.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
              <div className="absolute -right-7 -top-6 h-36 w-36 rounded-full bg-lilac-300/50 blur-2xl" />
              <div className="relative aspect-[4/4.45] overflow-hidden rounded-[2.6rem] border-[10px] border-white bg-lilac-100 shadow-soft">
                <ClinicImage
                  endpoint={imageKitEndpoint}
                  imageKitPath="/clinica-linnen/hero-acompanamiento.webp"
                  fallbackSrc="/brand/hero-care.svg"
                  alt="Ilustración de una atención odontológica cercana y tranquila"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 44vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-card backdrop-blur-md sm:inset-x-7 sm:bottom-7">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-aqua-100 text-aqua-800">
                      <HeartBadge />
                    </span>
                    <div>
                      <p className="font-bold text-ink">Llegaste a tu espacio seguro.</p>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        Conversamos antes de comenzar y avanzamos contigo, nunca sobre ti.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -left-4 top-10 rounded-2xl border border-lilac-100 bg-white px-4 py-3 shadow-card sm:-left-8">
                <div className="flex items-center gap-1 text-[#D89112]" aria-label="5 estrellas">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-1 text-xs font-bold text-ink">5,0 en Google</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Datos destacados" className="border-y border-lilac-100 bg-white">
          <div className="mx-auto grid max-w-7xl divide-y divide-lilac-100 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
            {content.trustItems.map((item, index) => (
              <div key={item} className="flex items-center justify-center gap-3 py-6 text-center font-bold text-ink/80">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-aqua-100 text-xs font-bold text-aqua-800">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="enfoque" className="scroll-mt-24 bg-linen py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
              <SectionHeading
                eyebrow="Nuestro enfoque"
                title="Aquí no tienes que demostrar valentía."
                description="La atención humanizada no es sólo ser amable. Es devolverte control, información y tranquilidad durante todo el proceso."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {content.carePrinciples.map((principle, index) => (
                  <article
                    key={principle.title}
                    className={`rounded-4xl border p-6 shadow-card sm:p-7 ${
                      index % 3 === 1
                        ? "border-aqua-100 bg-aqua-50"
                        : "border-lilac-100 bg-white"
                    }`}
                  >
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lilac-700 shadow-sm">
                      <ClinicIcon name={principle.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-bold text-ink">{principle.title}</h3>
                    <p className="mt-3 leading-7 text-muted">{principle.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="tratamientos" className="scroll-mt-24 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow="Tratamientos"
                title="Todo el cuidado que tu sonrisa necesita."
                description="Partimos por entender qué te preocupa y luego te orientamos hacia el tratamiento y profesional adecuados."
              />
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center gap-2 font-bold text-lilac-700"
              >
                No sé qué tratamiento necesito
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {content.services.map((service) => {
                const accent = {
                  lilac: "bg-lilac-50 text-lilac-700 border-lilac-100",
                  aqua: "bg-aqua-50 text-aqua-800 border-aqua-100",
                  warm: "bg-[#FFF7EA] text-[#8A5A10] border-[#F6E4C3]",
                }[service.accent];

                return (
                  <article
                    key={service.slug}
                    className="group rounded-4xl border border-lilac-100 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-lilac-300"
                  >
                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl border p-3 ${accent}`}>
                      <ClinicIcon name={service.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 text-2xl font-bold text-ink">{service.title}</h3>
                    <p className="mt-3 min-h-[84px] leading-7 text-muted">{service.description}</p>
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-bold text-lilac-700"
                    >
                      Consultar
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="primera-visita" className="linen-texture scroll-mt-24 overflow-hidden bg-lilac-900 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid items-start gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
              <div>
                <SectionHeading
                  eyebrow="Tu primera visita"
                  title="Saber qué pasará también da tranquilidad."
                  description="Desde el primer mensaje buscamos que te sientas escuchado o escuchada. No tienes que llegar sabiendo nombres de tratamientos."
                  inverse
                />
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-aqua-400 px-6 py-4 font-bold text-aqua-800 transition hover:-translate-y-0.5 hover:bg-aqua-100"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Conversar por WhatsApp
                </a>
              </div>
              <ol className="space-y-4">
                {content.process.map((step, index) => (
                  <li key={step.title} className="rounded-4xl border border-white/10 bg-white/[0.07] p-6 sm:p-7">
                    <div className="flex gap-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white font-display text-2xl font-bold text-lilac-700">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                        <p className="mt-2 leading-7 text-white/70">{step.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="experiencias" className="scroll-mt-24 bg-aqua-50 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Experiencias"
              title="Cuando te sientes seguro, todo cambia."
              description="Esto es lo que pacientes de Linnen han querido compartir sobre su atención."
              align="center"
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {content.testimonials.map((testimonial) => (
                <figure key={testimonial.author} className="flex h-full flex-col rounded-4xl border border-aqua-100 bg-white p-7 shadow-card sm:p-8">
                  <Quote className="h-8 w-8 text-lilac-400" aria-hidden="true" />
                  <blockquote className="mt-5 flex-1 text-lg font-medium leading-8 text-ink">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-7 border-t border-lilac-100 pt-5">
                    <p className="font-bold text-ink">{testimonial.author}</p>
                    <p className="mt-1 text-sm text-muted">{testimonial.context}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center gap-2 font-bold text-lilac-700"
              >
                Ver opiniones en Google
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              title="Puedes preguntar todo. En serio."
              description="Queremos que llegues con la mayor tranquilidad posible. Si tu duda no aparece aquí, escríbenos."
            />
            <div className="divide-y divide-lilac-100 border-y border-lilac-100">
              {content.faqs.map((faq, index) => (
                <details key={faq.question} className="group py-2" open={index === 0}>
                  <summary className="focus-ring flex cursor-pointer items-center justify-between gap-5 rounded-2xl px-2 py-5 text-lg font-bold text-ink">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 shrink-0 text-lilac-700 transition group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="px-2 pb-6 pr-10 leading-7 text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="scroll-mt-24 bg-linen pb-20 pt-4 sm:pb-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-lilac-400 p-7 shadow-soft sm:p-10 lg:p-14">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[42px] border-white/10" />
              <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_.9fr] lg:gap-16">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-lilac-900">Estamos en Valdivia</p>
                  <h2 className="mt-3 max-w-2xl font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
                    Tu espacio seguro está en el centro de la ciudad.
                  </h2>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-white/85">
                    Escríbenos y cuéntanos qué necesitas. Nuestro equipo te orientará antes de tu primera visita.
                  </p>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 font-bold text-lilac-700 shadow-card transition hover:-translate-y-0.5"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Agendar mi evaluación
                  </a>
                </div>

                <address className="not-italic">
                  <div className="rounded-4xl bg-white p-6 shadow-card sm:p-8">
                    <ContactRow icon={<MapPin />} label="Dirección">
                      <a href={contact.mapUrl} target="_blank" rel="noreferrer" className="font-bold hover:text-lilac-700">
                        {contact.address}<br />
                        <span className="font-normal text-muted">{contact.city}</span>
                      </a>
                    </ContactRow>
                    <ContactRow icon={<Phone />} label="Teléfono">
                      <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="font-bold hover:text-lilac-700">
                        {contact.phone}
                      </a>
                    </ContactRow>
                    <ContactRow icon={<MessageCircle />} label="Horario">
                      <span className="font-medium text-muted">{contact.scheduleNote}</span>
                    </ContactRow>
                    <ContactRow icon={<Camera />} label="Instagram" last>
                      <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="font-bold hover:text-lilac-700">
                        @clinica.linnen
                      </a>
                    </ContactRow>
                  </div>
                </address>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-lilac-100 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-5 sm:px-8 md:flex-row md:items-center">
          <BrandLogo />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-muted">
            <a href="#enfoque" className="hover:text-lilac-700">Nuestro enfoque</a>
            <a href="#tratamientos" className="hover:text-lilac-700">Tratamientos</a>
            <a href="#contacto" className="hover:text-lilac-700">Contacto</a>
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-lilac-700">Instagram</a>
          </div>
          <p className="text-sm text-muted">© {new Date().getFullYear()} Clínica Linnen</p>
        </div>
      </footer>

      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Agendar por WhatsApp"
        className="focus-ring fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-aqua-800 text-white shadow-soft transition hover:-translate-y-1 sm:hidden"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>
    </>
  );
}

function HeartBadge() {
  return <ClinicIcon name="heart" className="h-6 w-6" />;
}

function ContactRow({
  icon,
  label,
  children,
  last = false,
}: {
  icon: React.ReactElement<{ className?: string }>;
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`flex gap-4 py-5 ${last ? "" : "border-b border-lilac-100"}`}>
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-lilac-50 text-lilac-700 [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </span>
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-muted">{label}</p>
        <div className="leading-6 text-ink">{children}</div>
      </div>
    </div>
  );
}
