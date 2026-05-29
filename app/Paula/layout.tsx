import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "10 Años | Paula",
  description: "Acompáñame a celebrar mi cumpleaños en una pool party increíble. 14 de Junio.",
  openGraph: {
    title: "10 Años | Paula",
    description: "Acompáñame a celebrar mi cumpleaños.",
    url: "https://mifestejo.mom/paula",
    siteName: "Invitación Paula",
    images: [
      {
        url: "/preview-paula.jpg",
        width: 1200,
        height: 630,
        alt: "Invitación 10 Años Paula",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

export default function PaulaLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}