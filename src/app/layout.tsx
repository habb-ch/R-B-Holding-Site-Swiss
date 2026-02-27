import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "R&B Rajh Holding AG – Strategische Investitionen & Industrielle Exzellenz",
  description:
    "R&B Rajh Holding AG ist eine Schweizer Holdinggesellschaft mit Sitz in Burgdorf. Mit strategischen Beteiligungen in Industrie, Oberflächenbehandlung, Gastgewerbe und Landwirtschaft.",
  keywords: [
    "R&B Rajh Holding AG",
    "Burgdorf",
    "Schweizer Holding",
    "Tschannen Spritzwerk",
    "Leuta Korrosionsschutz",
    "Swiss holding company",
  ],
  openGraph: {
    title: "R&B Rajh Holding AG",
    description: "Strategische Investitionen. Industrielle Exzellenz.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
