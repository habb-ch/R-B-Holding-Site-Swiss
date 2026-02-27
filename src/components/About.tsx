'use client';

import Image from 'next/image';
import { translations, Locale } from '@/lib/i18n';
import { Building2, Target, Eye, Heart, Calendar, Coins, Gavel } from 'lucide-react';

interface AboutProps {
    locale: Locale;
}

export default function About({ locale }: AboutProps) {
    const t = translations[locale].about;

    const pillars = [
        { icon: Target, title: t.mission, text: t.missionText, color: '#8CA0C8' },
        { icon: Eye, title: t.vision, text: t.visionText, color: '#6A80A8' },
        { icon: Heart, title: t.values, text: t.valuesText, color: '#C9892A' },
    ];

    const details = [
        {
            icon: Calendar,
            label: t.incorporated,
            value: locale === 'de' ? '12. März 2019' : 'March 12, 2019',
        },
        { icon: Coins, label: t.registeredCapital, value: 'CHF 100,000' },
        { icon: Gavel, label: t.legalForm, value: t.agForm },
        {
            icon: Building2,
            label: locale === 'de' ? 'Hauptsitz' : 'Headquarters',
            value: 'Burgdorf, Switzerland',
        },
    ];

    return (
        <section id="about" className="relative py-28 overflow-hidden bg-white">
            <div className="divider-gold" />

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(140,160,200,0.06)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 pt-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="section-label block mb-4">
                        {locale === 'de' ? 'Über uns' : 'About Us'}
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl font-bold text-[#111318] mb-4"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        {t.title}
                    </h2>
                    <div className="divider-gold max-w-xs mx-auto mb-5" />
                    <p className="text-[#6B7A96] max-w-2xl mx-auto text-base leading-relaxed">
                        {t.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                    {/* Left column */}
                    <div className="flex flex-col gap-5">
                        {/* CEO */}
                        <div className="glass-card p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-[#EEF1F8] border border-[rgba(140,160,200,0.25)] flex items-center justify-center flex-shrink-0">
                                    <span
                                        className="text-xl font-bold text-[#8CA0C8]"
                                        style={{ fontFamily: 'Outfit, sans-serif' }}
                                    >
                                        SK
                                    </span>
                                </div>
                                <div>
                                    <h3
                                        className="text-[#111318] font-bold text-base"
                                        style={{ fontFamily: 'Outfit, sans-serif' }}
                                    >
                                        {t.ceo}
                                    </h3>
                                    <p className="text-[#8CA0C8] text-sm font-medium">{t.ceoTitle}</p>
                                </div>
                            </div>
                            <p className="text-[#6B7A96] text-sm leading-relaxed border-l-2 border-[#8CA0C8] pl-4">
                                {locale === 'de'
                                    ? 'Als Gründer und Geschäftsführer der R&B Rajh Holding AG leitet Suyarajh Kanagaratnam das Unternehmen seit seiner Gründung im Jahr 2019 und baut ein Portfolio von starken Industrieunternehmen auf.'
                                    : 'As founder and managing director of R&B Rajh Holding AG, Suyarajh Kanagaratnam has led the company since its founding in 2019, building a portfolio of strong industrial businesses.'}
                            </p>
                        </div>

                        {/* Company details */}
                        <div className="glass-card p-5">
                            <h4
                                className="text-[#8CA0C8] font-bold mb-4 text-xs uppercase tracking-widest"
                                style={{ fontFamily: 'Outfit, sans-serif' }}
                            >
                                {locale === 'de' ? 'Unternehmensdetails' : 'Company Details'}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {details.map((d, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 p-3 rounded-xl bg-[#F5F7FB] border border-[rgba(140,160,200,0.15)]"
                                    >
                                        <d.icon size={14} className="text-[#8CA0C8] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[#8CA0C8] text-xs uppercase tracking-wider mb-0.5 font-semibold">{d.label}</p>
                                            <p className="text-[#111318] text-sm font-semibold">{d.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Banner */}
                        <div className="relative h-36 rounded-xl overflow-hidden border border-[rgba(140,160,200,0.2)] shadow-sm">
                            <Image
                                src="/logos/Banner_Final.png"
                                alt="R&B Rajh Holding AG"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#111318]/60 to-transparent" />
                            <div className="absolute bottom-4 left-5 bg-[rgba(0,0,0,0.55)] px-3 py-2 rounded-lg">
                                <span
                                    className="text-white font-bold text-sm block"
                                    style={{ fontFamily: 'Outfit, sans-serif' }}
                                >
                                    R&B Rajh Holding AG
                                </span>
                                <p className="text-white/85 text-xs mt-0.5">
                                    {locale === 'de' ? 'Burgdorf, Schweiz' : 'Burgdorf, Switzerland'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col gap-5">
                        <h3
                            className="text-[#111318] font-bold text-xl"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                            {t.subtitle}
                        </h3>
                        {pillars.map((pillar, i) => (
                            <div key={i} className="glass-card p-6 flex gap-4" id={`about-pillar-${i}`}>
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{
                                        background: `${pillar.color}15`,
                                        border: `1.5px solid ${pillar.color}30`,
                                    }}
                                >
                                    <pillar.icon size={18} style={{ color: pillar.color }} />
                                </div>
                                <div>
                                    <h4
                                        className="font-bold text-sm mb-2"
                                        style={{ fontFamily: 'Outfit, sans-serif', color: pillar.color }}
                                    >
                                        {pillar.title}
                                    </h4>
                                    <p className="text-[#6B7A96] text-sm leading-relaxed">{pillar.text}</p>
                                </div>
                            </div>
                        ))}

                        {/* Corporate purpose */}
                        <div className="glass-card p-6">
                            <h4
                                className="text-[#8CA0C8] font-bold mb-3 text-xs uppercase tracking-widest"
                                style={{ fontFamily: 'Outfit, sans-serif' }}
                            >
                                {locale === 'de' ? 'Gesellschaftszweck' : 'Corporate Purpose'}
                            </h4>
                            <p className="text-[#6B7A96] text-sm leading-relaxed">
                                {locale === 'de'
                                    ? 'Direkte oder indirekte Beteiligung an verschiedenen Unternehmen, Erwerb und Übertragung von Wertpapieren, Mobilien und Immobilien. Das Unternehmen kann Zweigniederlassungen und Tochtergesellschaften gründen und sich an verwandten kaufmännischen und finanziellen Tätigkeiten beteiligen.'
                                    : 'Direct or indirect participation in various businesses, acquisition and transfer of securities, movables, and real estate. The company may establish branches and subsidiaries and engage in related commercial and financial activities.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
