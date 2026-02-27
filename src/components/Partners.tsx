'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { translations, Locale } from '@/lib/i18n';

interface PartnersProps {
    locale: Locale;
}

export default function Partners({ locale }: PartnersProps) {
    const t = translations[locale];

    const partners = [
        {
            key: 'doubleA',
            logo: '/logos/DoubleA_SolarIT_Solutions.png',
            data: t.partners.doubleA,
            tags:
                locale === 'de'
                    ? ['Photovoltaik', 'IT-Lösungen', 'SaaS', 'Solar']
                    : ['Photovoltaic', 'IT Solutions', 'SaaS', 'Solar'],
            accentColor: '#8CA0C8',
        },
        {
            key: 'habb',
            logo: '/logos/HABB_ch_Logo.png',
            data: t.partners.habb,
            tags:
                locale === 'de'
                    ? ['Business', 'Digital', 'Schweiz']
                    : ['Business', 'Digital', 'Switzerland'],
            accentColor: '#C9892A',
        },
    ];

    return (
        <section id="partners" className="relative py-28 overflow-hidden bg-white">
            <div className="divider-gold" />

            <div className="max-w-7xl mx-auto px-6 pt-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="section-label block mb-4">
                        {locale === 'de' ? 'Strategische Partner' : 'Strategic Partners'}
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl font-bold text-primary mb-4"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        {t.partners.title}
                    </h2>
                    <div className="divider-gold max-w-xs mx-auto mb-5" />
                    <p className="text-sub max-w-md mx-auto text-base">
                        {t.partners.subtitle}
                    </p>
                </div>

                {/* Partners */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl mx-auto">
                    {partners.map((partner) => (
                        <div
                            key={partner.key}
                            className="partner-card p-8 flex flex-col gap-5 relative overflow-hidden"
                            id={`partner-${partner.key}`}
                        >
                            {/* Top accent */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${partner.accentColor}80, transparent)`,
                                }}
                            />

                            {/* Logo + name */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 bg-[#F5F7FB] rounded-xl overflow-hidden border border-[rgba(140,160,200,0.2)] flex-shrink-0 p-1.5">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.data.name}
                                        fill
                                        className="object-contain p-0.5"
                                    />
                                </div>
                                <div>
                                    <h3
                                        className="text-primary font-bold text-base leading-tight"
                                        style={{ fontFamily: 'Outfit, sans-serif' }}
                                    >
                                        {partner.data.name}
                                    </h3>
                                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent" style={{ color: partner.accentColor }}>
                                        {locale === 'de' ? 'Strategischer Partner' : 'Strategic Partner'}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sub text-sm leading-relaxed">
                                {partner.data.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {partner.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide"
                                        style={{
                                            background: `${partner.accentColor}12`,
                                            border: `1px solid ${partner.accentColor}30`,
                                            color: partner.accentColor,
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Link */}
                            <a
                                href={partner.data.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group/link text-accent hover:text-primary"
                                id={`partner-link-${partner.key}`}
                            >
                                <ArrowUpRight
                                    size={14}
                                    className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                                />
                                {partner.data.website.replace('https://', '')}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
