"use client";

import Image from "next/image";
import { translations, Locale } from "@/lib/i18n";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = translations[locale];

  const navLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.partners, href: "#partners" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const portfolioLinks = [
    "Tschannen Spritzwerk AG",
    "Leuta Korrosionsschutz AG",
    "R&B Company GmbH",
    "R&B Guest House",
    "R&B Organic Farm",
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[var(--navy-deep)] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logos/RAndB_Rajh_Holding_AG_Logo.png"
                alt="R&B Rajh Holding AG"
                width={36}
                height={36}
                className="object-contain"
              />
              <div>
                <div
                  className="font-bold text-white text-sm"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  R&B Rajh Holding AG
                </div>
                <div className="text-[10px] text-white/40 tracking-wider uppercase">
                  Burgdorf, Switzerland
                </div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs text-white/30">
              <div className="h-px w-6 bg-[var(--gold)] opacity-40" />
              <span className="tracking-widest uppercase font-semibold">
                Est. 2019
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white/70 uppercase tracking-[0.2em] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300 break-words inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h4 className="text-xs font-bold text-white/70 uppercase tracking-[0.2em] mb-5">
              {t.footer.portfolio}
            </h4>
            <ul className="space-y-3">
              {portfolioLinks.map((name) => (
                <li key={name}>
                  <span className="text-sm text-white/50">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white/70 uppercase tracking-[0.2em] mb-5">
              {t.footer.contact}
            </h4>
            <div className="space-y-3 text-sm text-white/50">
              <p>Lyssachstrasse 83</p>
              <p>3400 Burgdorf, Schweiz</p>
              <p className="pt-1">
                <a
                  href="mailto:info@rbrajhholding.ch"
                  className="hover:text-white transition-colors"
                >
                  info@rbrajhholding.ch
                </a>
              </p>
              <p>
                <a
                  href="tel:+41345305040"
                  className="hover:text-white transition-colors"
                >
                  +41 34 530 50 40
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} R&B Rajh Holding AG.{" "}
            {t.footer.rights}
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} className="text-white/50" />
          </button>
        </div>
      </div>
    </footer>
  );
}
