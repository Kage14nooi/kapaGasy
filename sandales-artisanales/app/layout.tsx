import "./globals.css";
import type { Metadata } from "next";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sandales Artisanales | Fait Main",
  description:
    "Sandales artisanales fabriquées à la main avec du cuir naturel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
