'use client';

import Image from 'next/image';
import { ExternalLink, MapPin, Layers } from 'lucide-react';
import { translations, Locale } from '@/lib/i18n';

interface PortfolioProps {
    locale: Locale;
}

type CompanyKey = 'tschannen' | 'leuta' | 'rbcompany' | 'guesthouse' | 'farm';

const companyMeta: Record<
    CompanyKey,
    { logo: string; accentColor: string }
> = {
    tschannen: {
        logo: '/logos/Logo_Tschannen.png',
        accentColor: '#8CA0C8',
    },
    leuta: {
        logo: '/logos/LEUTA_Logo_Final_final.png',
        accentColor: '#6A80A8',
    },
    rbcompany: {
        logo: '/logos/Logo_RAndB_Company_GmbH.png',
        accentColor: '#8CA0C8',
    },
    guesthouse: {
        logo: '/logos/RAndB_Rajh_Holding_AG_Logo.png',
        accentColor: '#C9892A',
    },
    farm: {
        logo: '/logos/RAndB_Organic_Farmin.png',
        accentColor: '#6A80A8',
    },
};

export default function Portfolio({ locale }: PortfolioProps) {
    const t = translations[locale];
    const companies = t.portfolio.companies;

    const companyKeys: CompanyKey[] = [
        'tschannen',
        'leuta',
        'rbcompany',
        'guesthouse',
        'farm',
    ];

    return (
        <section id="portfolio" className="relative py-28 overflow-hidden bg-[#F5F7FB]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="section-label block mb-4">Portfolio</span>
                    <h2
                        className="text-4xl sm:text-5xl font-bold text-primary mb-4"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        {t.portfolio.title}
                    </h2>
                    <div className="divider-gold max-w-xs mx-auto mb-5" />
                    <p className="text-sub max-w-xl mx-auto text-base leading-relaxed">
                        {t.portfolio.subtitle}
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {companyKeys.map((key, index) => {
                        const company = companies[key];
                        const meta = companyMeta[key];

                        return (
                            <div
                                key={key}
                                className={`glass-card p-6 flex flex-col gap-4 relative overflow-hidden ${index === 0 ? 'lg:col-span-2' : ''
                                    }`}
                                id={`portfolio-card-${key}`}
                            >
                                {/* Top accent line */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                                    style={{
                                        background: `linear-gradient(90deg, transparent, ${meta.accentColor}80, transparent)`,
                                    }}
                                />

                                {/* Header row */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        {/* Logo */}
                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[rgba(140,160,200,0.2)] bg-[#F5F7FB] flex-shrink-0">
                                            <Image
                                                src={meta.logo}
                                                alt={company.name}
                                                fill
                                                className="object-contain p-1.5"
                                            />
                                        </div>
                                        <div>
                                            <h3
                                                className="text-[#111318] font-bold text-sm leading-snug"
                                                style={{ fontFamily: 'Outfit, sans-serif' }}
                                            >
                                                {company.name}
                                            </h3>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <MapPin size={10} className="text-accent" />
                                                    <span className="text-xs text-sub">
                                                    {company.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sector badge */}
                                    <div
                                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 tracking-wide"
                                        style={{
                                            background: `${meta.accentColor}15`,
                                            border: `1px solid ${meta.accentColor}35`,
                                            color: meta.accentColor,
                                        }}
                                    >
                                        <Layers size={9} />
                                        {company.sector}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sub text-sm leading-relaxed flex-1">
                                    {company.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5">
                                    {company.tags.map((tag) => (
                                        <span key={tag} className="tag-pill">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Website link */}
                                {company.website !== '#' && (
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-primary transition-colors mt-1 group/link"
                                        id={`portfolio-link-${key}`}
                                    >
                                        <ExternalLink
                                            size={12}
                                            className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                                        />
                                        {t.portfolio.visitWebsite}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
