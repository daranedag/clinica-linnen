import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Clínica Linnen | Odontología humanizada en Valdivia",
    template: "%s | Clínica Linnen",
  },
  description:
    "Atención odontológica sin juicios, a tu ritmo y con acompañamiento real en Valdivia.",
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Clínica Linnen",
  },
  icons: {
    icon: "/brand/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7FB",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL">
      <body>{children}</body>
    </html>
  );
}
