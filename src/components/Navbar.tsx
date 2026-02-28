'use client';

import { useState, useEffect } from 'react';
import { translations, Locale } from '@/lib/i18n';
import { Menu, X, Globe } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
    locale: Locale;
    onLocaleChange: (locale: Locale) => void;
}

export default function Navbar({ locale, onLocaleChange }: NavbarProps) {
    const t = translations[locale];
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: t.nav.home, href: '#home' },
        { label: t.nav.portfolio, href: '#portfolio' },
        { label: t.nav.partners, href: '#partners' },
        { label: t.nav.about, href: '#about' },
        { label: t.nav.contact, href: '#contact' },
    ];

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'py-3 bg-white/95 backdrop-blur-2xl border-b border-[rgba(140,160,200,0.2)] shadow-sm'
                : 'py-5 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => handleNavClick('#home')}
                    className="flex items-center gap-3 group"
                    id="nav-logo"
                >
                    <Logo size={36} />
                    <span
                        className="hidden sm:block font-semibold text-sm text-primary tracking-wide"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        R&B Rajh Holding AG
                    </span>
                </button>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => handleNavClick(link.href)}
                            className="animated-underline text-sm font-semibold tracking-wide text-sub hover:text-primary transition-colors duration-300 uppercase"
                            id={`nav-${link.href.replace('#', '')}`}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Language Toggle */}
                    <div className="flex items-center gap-0.5 bg-[#EEF1F8] border border-[rgba(140,160,200,0.25)] rounded-full p-1">
                        <Globe size={12} className="text-accent mx-1.5" />
                        {(['de', 'en'] as Locale[]).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => onLocaleChange(lang)}
                                className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${locale === lang
                                    ? 'bg-[#111318] text-white'
                                    : 'text-sub hover:text-primary'
                                    }`}
                                id={`lang-${lang}`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden p-2 rounded-lg border border-[rgba(140,160,200,0.25)] text-sub bg-white"
                        id="mobile-menu-toggle"
                    >
                        {menuOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="lg:hidden mt-2 mx-6 rounded-xl bg-white border border-[rgba(140,160,200,0.2)] shadow-md p-3 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => handleNavClick(link.href)}
                            className="text-left px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-sub hover:text-primary hover:bg-[rgba(140,160,200,0.08)] transition-all"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}
