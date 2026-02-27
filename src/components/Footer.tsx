'use client';

import Image from 'next/image';
import { translations, Locale } from '@/lib/i18n';
import { MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
    locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
    const t = translations[locale].footer;
    const year = new Date().getFullYear();

    const portfolioLinks = [
        { name: 'Tschannen Spritzwerk AG', href: 'https://tschannenspritzwerk.ch' },
        { name: 'Leuta Korrosionsschutz AG', href: 'https://leutakorrosionsschutz.ch' },
        { name: 'R&B Guest House', href: 'https://rbguesthouse.ch' },
        { name: 'DoubleA Solutions GmbH', href: 'https://doubleasolutions.ch' },
    ];

    const navLinks = [
        { label: 'Home', href: '#home' },
        { label: t.portfolio, href: '#portfolio' },
        { label: t.partners, href: '#partners' },
        { label: t.about, href: '#about' },
        { label: t.contact, href: '#contact' },
    ];

    const scrollTo = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="relative border-t border-[rgba(140,160,200,0.2)] bg-white pt-16 pb-8 overflow-hidden">

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[rgba(140,160,200,0.2)] bg-[#F5F7FB] p-1.5">
                                <Image
                                    src="/logos/RAndB_Rajh_Holding_AG_Logo.png"
                                    alt="R&B Rajh Holding AG"
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                            <div>
                                <h3
                                    className="gradient-silver font-bold text-sm"
                                    style={{ fontFamily: 'Outfit, sans-serif' }}
                                >
                                    R&B Rajh Holding AG
                                </h3>
                                <p className="text-[#8CA0C8] text-xs flex items-center gap-1 mt-0.5">
                                    <MapPin size={9} />
                                    Burgdorf, Switzerland
                                </p>
                            </div>
                        </div>
                        <p className="text-[#6B7A96] text-sm leading-relaxed max-w-xs mb-5">
                            {t.tagline}
                        </p>
                        {/* Partner logos */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="relative h-7 w-20 opacity-50 hover:opacity-80 transition-opacity">
                                <Image
                                    src="/logos/DoubleA_SolarIT_Solutions.png"
                                    alt="DoubleA Solutions"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="relative h-7 w-20 opacity-50 hover:opacity-80 transition-opacity bg-[#F5F7FB] rounded p-1">
                                <Image
                                    src="/logos/HABB_ch_Logo.png"
                                    alt="HABB.ch"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4
                            className="text-[#8CA0C8] font-bold text-xs mb-4 uppercase tracking-widest"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                            {locale === 'de' ? 'Navigation' : 'Navigation'}
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <button
                                        onClick={() => scrollTo(link.href)}
                                        className="text-[#6B7A96] hover:text-[#111318] text-sm transition-colors text-left font-medium"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Portfolio */}
                    <div>
                        <h4
                            className="text-[#8CA0C8] font-bold text-xs mb-4 uppercase tracking-widest"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                            Portfolio
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {portfolioLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-[#6B7A96] hover:text-[#111318] text-sm transition-colors group font-medium"
                                    >
                                        <ExternalLink
                                            size={10}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-[#8CA0C8]"
                                        />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="divider-gold mb-6" />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[#8CA0C8] text-xs">
                        © {year} R&B Rajh Holding AG. {t.rights}
                    </p>
                    <p className="text-[#8CA0C8] text-xs">
                        {locale === 'de'
                            ? 'Eingetragen im Handelsregister · Burgdorf, Kanton Bern, CH'
                            : 'Registered in the commercial register · Burgdorf, Canton Bern, CH'}
                    </p>
                </div>
            </div>
        </footer>
    );
}
