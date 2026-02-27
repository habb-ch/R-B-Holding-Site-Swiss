'use client';

import Image from 'next/image';
import { translations, Locale } from '@/lib/i18n';
import { MapPin, ChevronDown } from 'lucide-react';

interface HeroProps {
    locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
    const t = translations[locale];

    const stats = [
        { label: t.hero.founded, value: t.stats.founded },
        { label: t.hero.capital, value: t.stats.capital },
        { label: t.hero.headquarters, value: t.stats.hq },
        { label: t.hero.companies, value: t.stats.companies },
    ];

    const scrollToPortfolio = () => {
        document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Light base */}
            <div className="absolute inset-0 bg-[#F5F7FB]" />

            {/* Subtle radial tint */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(140,160,200,0.12)_0%,transparent_70%)]" />

            {/* Thin grid */}
            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage: `linear-gradient(rgba(140,160,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(140,160,200,1) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Horizontal rule lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(140,160,200,0.2)]" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(140,160,200,0.2)]" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">
                {/* Location badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(90,122,184,0.3)] bg-white mb-10 shadow-sm">
                    <MapPin size={11} className="text-accent" />
                    <span className="text-xs font-semibold text-sub tracking-[0.18em] uppercase">
                        Burgdorf, Switzerland · Est. 2019
                    </span>
                </div>

                {/* Logo */}
                <div className="flex justify-center mb-10">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[rgba(90,122,184,0.2)] bg-white shadow-lg">
                        <Image
                            src="/logos/RAndB_Rajh_Holding_AG_Logo.png"
                            alt="R&B Rajh Holding AG Logo"
                            fill
                            className="object-contain p-3"
                            priority
                        />
                    </div>
                </div>

                {/* Heading */}
                <h1
                    className="text-5xl sm:text-[4.5rem] lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-5"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                    <span className="text-[#111318]">R&B Rajh</span>
                    <br />
                    <span className="gradient-silver">Holding AG</span>
                </h1>

                {/* Divider line */}
                <div className="w-16 h-px bg-[#C9892A] mx-auto mb-5 opacity-70" />

                {/* Tagline */}
                <p className="text-sm sm:text-base font-bold text-[#3A5A90] mb-5 tracking-[0.1em] uppercase">
                    {t.hero.tagline}
                </p>

                {/* Description */}
                <p className="max-w-xl mx-auto text-base text-sub leading-relaxed mb-10">
                    {t.hero.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-20">
                    <button
                        onClick={scrollToPortfolio}
                        className="btn-gold text-sm"
                        id="hero-cta-portfolio"
                    >
                        {t.hero.cta}
                    </button>
                    <button
                        onClick={scrollToContact}
                        className="btn-outline text-sm"
                        id="hero-cta-contact"
                    >
                        {t.hero.cta2}
                    </button>
                </div>

                {/* Stats bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-[rgba(90,122,184,0.18)] bg-white shadow-md">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`px-6 py-7 flex flex-col items-center gap-2 hover:bg-[rgba(90,122,184,0.04)] transition-colors ${i < stats.length - 1 ? 'border-r border-[rgba(90,122,184,0.12)] last:border-r-0' : ''
                                }`}
                        >
                            <span className="stat-number">{stat.value}</span>
                            <span className="text-xs text-[#5A7AB8] uppercase tracking-[0.18em] font-bold">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll cue */}
                <button
                onClick={scrollToPortfolio}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent hover:text-primary transition-colors"
                id="scroll-indicator"
            >
                <ChevronDown size={20} className="animate-bounce" />
            </button>
        </section>
    );
}
