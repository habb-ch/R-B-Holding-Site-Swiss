'use client';

import { translations, Locale } from '@/lib/i18n';
import { ArrowRight, ChevronDown, TrendingUp, Globe2, Shield, BarChart3 } from 'lucide-react';
import Reveal from './Reveal';

interface HeroProps {
    locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
    const t = translations[locale];

    const stats = [
        { label: t.hero.founded, value: t.stats.founded, icon: TrendingUp },
        { label: t.hero.capital, value: t.stats.capital, icon: BarChart3 },
        { label: t.hero.headquarters, value: t.stats.hq, icon: Globe2 },
        { label: t.hero.companies, value: t.stats.companies, icon: Shield },
    ];

    const scrollToPortfolio = () => {
        document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToContact = () => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[var(--off-white)] via-white to-[var(--light-bg)]">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[rgba(11,31,63,0.03)] to-transparent blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[rgba(200,152,44,0.04)] to-transparent blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Left – Content */}
                    <div className="max-w-xl">
                        <Reveal>
                            <span className="section-badge mb-6 inline-flex">
                                <Globe2 size={12} />
                                Swiss Holding Company
                            </span>
                        </Reveal>

                        <Reveal delay={80}>
                            <h1
                                className="text-[2.25rem] sm:text-[3.5rem] lg:text-[4rem] font-extrabold tracking-tight leading-[1.08] mb-6 break-words"
                                style={{ fontFamily: 'Outfit, sans-serif' }}
                            >
                                <span className="text-[var(--navy)] break-words">R&B Rajh</span>
                                <br />
                                <span className="gradient-heading break-words">Holding AG</span>
                            </h1>
                        </Reveal>

                        <Reveal delay={150}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px w-10 bg-[var(--gold)]" />
                                <p className="text-sm font-semibold text-[var(--gold)] tracking-wide uppercase">
                                    {t.hero.tagline}
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={200}>
                            <p className="text-base sm:text-lg text-[var(--text-body)] leading-relaxed mb-10 max-w-lg">
                                {t.hero.description}
                            </p>
                        </Reveal>

                        <Reveal delay={260}>
                            <div className="flex flex-wrap items-center gap-4">
                                <button onClick={scrollToPortfolio} className="btn-primary" id="hero-cta-portfolio">
                                    {t.hero.cta}
                                    <ArrowRight size={16} />
                                </button>
                                <button onClick={scrollToContact} className="btn-secondary" id="hero-cta-contact">
                                    {t.hero.cta2}
                                </button>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right – Abstract Graphic */}
                    <Reveal delay={300}>
                        <div className="hidden lg:flex items-center justify-center relative">
                            {/* Geometric composition */}
                            <div className="relative w-[440px] h-[440px]">
                                {/* Background circle */}
                                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[var(--off-white)] to-[var(--light-bg)] border border-[var(--border-light)]" />

                                {/* Rotating ring */}
                                <svg viewBox="0 0 440 440" className="absolute inset-0 animate-[spin_60s_linear_infinite]" fill="none">
                                    <circle cx="220" cy="220" r="200" stroke="url(#heroGrad)" strokeWidth="1" strokeDasharray="8 6" opacity="0.3" />
                                    <defs>
                                        <linearGradient id="heroGrad" x1="0" y1="0" x2="440" y2="440">
                                            <stop offset="0%" stopColor="var(--navy)" />
                                            <stop offset="100%" stopColor="var(--gold)" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Central element */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-56 h-56 rounded-3xl bg-white border border-[var(--border-light)] shadow-lg flex items-center justify-center rotate-6 hover:rotate-0 transition-transform duration-700">
                                        <div className="text-center">
                                            <div className="text-5xl font-black text-[var(--navy)]" style={{ fontFamily: 'Outfit, sans-serif' }}>R&B</div>
                                            <div className="h-0.5 w-12 mx-auto mt-2 mb-2 bg-[var(--gold)] rounded-full" />
                                            <div className="text-sm font-semibold text-[var(--text-muted)] tracking-widest uppercase">Holding AG</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating cards */}
                                <div className="absolute top-6 right-8 bg-white border border-[var(--border-light)] rounded-xl p-3 shadow-md animate-[bounce_6s_ease-in-out_infinite]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-[rgba(11,31,63,0.05)] flex items-center justify-center">
                                            <TrendingUp size={14} className="text-[var(--navy)]" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-[var(--navy)]">6+</div>
                                            <div className="text-[9px] text-[var(--text-muted)]">Companies</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-10 left-4 bg-white border border-[var(--border-light)] rounded-xl p-3 shadow-md animate-[bounce_6s_ease-in-out_2s_infinite]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-[rgba(200,152,44,0.08)] flex items-center justify-center">
                                            <Shield size={14} className="text-[var(--gold)]" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-[var(--navy)]">Est. 2019</div>
                                            <div className="text-[9px] text-[var(--text-muted)]">Burgdorf, CH</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Stats Row */}
                <Reveal delay={350}>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="card p-6 text-center group flex flex-col items-center justify-center min-h-0"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[rgba(11,31,63,0.04)] flex items-center justify-center mx-auto mb-3 group-hover:bg-[rgba(11,31,63,0.08)] transition-colors">
                                    <stat.icon size={18} className="text-[var(--royal-light)]" />
                                </div>
                                <div className="stat-number mb-1 text-2xl sm:text-[2.5rem] leading-tight">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-[var(--text-muted)] uppercase tracking-[0.15em] font-semibold break-words">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>

            {/* Scroll indicator */}
            <button
                onClick={scrollToPortfolio}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-light)] hover:text-[var(--navy)] transition-colors"
                id="scroll-indicator"
            >
                <ChevronDown size={22} className="animate-bounce" />
            </button>
        </section>
    );
}
