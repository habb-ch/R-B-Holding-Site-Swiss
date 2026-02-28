"use client";

import { useState, useEffect } from "react";
import { translations, Locale } from "@/lib/i18n";
import { Menu, X, Globe } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function Navbar({ locale, onLocaleChange }: NavbarProps) {
  const t = translations[locale];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.partners, href: "#partners" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2.5 bg-white/98 backdrop-blur-md shadow-[0_1px_12px_rgba(11,31,63,0.06)] border-b border-[var(--border-light)]"
          : "py-4 bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo + brand */}
        <button
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-3 group"
          id="nav-logo"
        >
          <Logo size={56} />
          <div className="hidden sm:flex flex-col">
            <span
              className="font-bold text-[15px] text-[var(--navy)] leading-tight tracking-tight"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              R&B Rajh Holding AG
            </span>
            <span className="text-[10px] font-medium text-[var(--text-muted)] tracking-[0.08em] uppercase">
              Burgdorf, Switzerland
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="animated-underline text-[13px] font-medium tracking-wide text-[var(--text-body)] hover:text-[var(--navy)] transition-colors duration-200"
              id={`nav-${link.href.replace("#", "")}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <div className="flex items-center gap-0.5 border border-[var(--gray-200)] rounded-full p-1 bg-white">
            <Globe size={12} className="text-[var(--text-muted)] mx-1.5" />
            {(["de", "en"] as Locale[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLocaleChange(lang)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-200 ${
                  locale === lang
                    ? "bg-[var(--navy)] text-white"
                    : "text-[var(--text-muted)] hover:text-[var(--navy)]"
                }`}
                id={`lang-${lang}`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2.5 rounded-lg border border-[var(--gray-200)] text-[var(--text-body)] bg-white hover:bg-[var(--off-white)] transition-colors"
            id="mobile-menu-toggle"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden mt-2 mx-4 rounded-2xl bg-white border border-[var(--border-light)] shadow-lg p-2 flex flex-col gap-0.5">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-body)] hover:text-[var(--navy)] hover:bg-[var(--off-white)] transition-all"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
