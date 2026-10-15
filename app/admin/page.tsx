import type { Metadata } from "next";
import Link from "next/link";
import { Database, Image, KeyRound, PencilLine } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export const metadata: Metadata = {
  title: "Administración",
  robots: { index: false, follow: false },
};

const readiness = [
  { icon: KeyRound, title: "SSO y permisos", text: "Preparado para sesiones seguras y roles de administrador o editor." },
  { icon: PencilLine, title: "Borradores", text: "El modelo separa contenido en edición del contenido publicado." },
  { icon: Image, title: "Medios", text: "Las imágenes se entregarán optimizadas desde ImageKit." },
  { icon: Database, title: "Contenido", text: "La web ya consume un repositorio intercambiable compatible con InsForge." },
];

export default function AdminComingSoon() {
  return (
    <main className="soft-grid flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-4xl rounded-[2.5rem] border border-lilac-100 bg-white p-7 shadow-soft sm:p-12">
        <BrandLogo />
        <p className="mt-12 text-xs font-bold uppercase tracking-[0.18em] text-aqua-800">Próxima etapa</p>
        <h1 className="mt-3 font-display text-5xl font-semibold leading-none text-ink sm:text-6xl">Panel de contenidos</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          La base técnica ya contempla autenticación SSO, edición por borradores y publicación controlada. El acceso se habilitará cuando se configure el proveedor de identidad.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {readiness.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-lilac-100 bg-linen p-5">
              <Icon className="h-6 w-6 text-lilac-700" aria-hidden="true" />
              <h2 className="mt-4 font-bold text-ink">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </div>
          ))}
        </div>
        <Link href="/" className="focus-ring mt-10 inline-flex rounded-full bg-lilac-700 px-5 py-3 font-bold text-white">
          Volver al sitio
        </Link>
      </div>
    </main>
  );
}
