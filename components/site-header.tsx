import { Menu } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const navigation = [
  { label: "Nuestro enfoque", href: "#enfoque" },
  { label: "Tratamientos", href: "#tratamientos" },
  { label: "Primera visita", href: "#primera-visita" },
  { label: "Experiencias", href: "#experiencias" },
  { label: "Contacto", href: "#contacto" },
];

export function SiteHeader({ whatsapp }: { whatsapp: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-lilac-100/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <BrandLogo />

        <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-ink/75 transition hover:text-lilac-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full bg-lilac-700 px-5 py-3 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-lilac-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-lilac-700 focus-visible:ring-offset-4 sm:inline-flex"
        >
          Agendar evaluación
        </a>

        <details className="group relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full bg-lilac-50 text-lilac-700 marker:content-none">
            <span className="sr-only">Abrir menú</span>
            <Menu className="h-5 w-5" aria-hidden="true" />
          </summary>
          <div className="absolute right-0 top-14 w-[min(19rem,calc(100vw-2.5rem))] rounded-3xl border border-lilac-100 bg-white p-4 shadow-soft">
            <nav aria-label="Navegación móvil" className="flex flex-col">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 font-semibold text-ink/80 hover:bg-lilac-50"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-2 rounded-2xl bg-lilac-700 px-4 py-3 text-center font-bold text-white"
              >
                Agendar evaluación
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
