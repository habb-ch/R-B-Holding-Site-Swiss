'use client';

import Image from 'next/image';
import { translations, Locale } from '@/lib/i18n';
import { Handshake, ExternalLink } from 'lucide-react';
import Reveal from './Reveal';

interface PartnersProps {
    locale: Locale;
}

const partnerData = [
    {
        key: 'doubleA' as const,
        logo: '/logos/DoubleA_SolarIT_Solutions.png',
    },
    {
        key: 'habb' as const,
        logo: '/logos/HABB_ch_Logo.png',
    },
];

export default function Partners({ locale }: PartnersProps) {
    const t = translations[locale];

    return (
        <section id="partners" className="relative py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <Reveal>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="section-badge mb-4 inline-flex">
                            <Handshake size={12} />
                            {t.partners.title}
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[var(--text-heading)] mb-5 tracking-tight"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                            {t.partners.title}
                        </h2>
                        <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
                            {t.partners.subtitle}
                        </p>
                    </div>
                </Reveal>

                {/* Partner Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {partnerData.map((partner, index) => {
                        const data = t.partners[partner.key];
                        return (
                            <Reveal key={partner.key} delay={index * 120}>
                                <div className="card p-8 h-full flex flex-col items-center text-center group">
                                    {/* Logo with grayscale effect */}
                                    <div className="w-full h-28 flex items-center justify-center mb-6">
                                        <Image
                                            src={partner.logo}
                                            alt={data.name}
                                            width={200}
                                            height={80}
                                            className="object-contain max-h-16 grayscale opacity-60 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                                        />
                                    </div>

                                    <div className="h-px w-12 bg-[var(--border-light)] mb-6 group-hover:bg-[var(--gold)] group-hover:w-16 transition-all duration-500" />

                                    <h3 className="text-xl font-bold text-[var(--text-heading)] mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                        {data.name}
                                    </h3>

                                    <p className="text-sm text-[var(--text-body)] leading-relaxed mb-6 flex-1">
                                        {data.description}
                                    </p>

                                    <a
                                        href={data.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--royal-light)] hover:text-[var(--navy)] transition-colors group/link"
                                    >
                                        {t.portfolio.visitWebsite}
                                        <ExternalLink size={14} className="transition-transform group-hover/link:translate-x-0.5" />
                                    </a>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
