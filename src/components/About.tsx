"use client";

import { translations, Locale } from "@/lib/i18n";
import {
  Building2,
  Target,
  Eye,
  Heart,
  User,
  Calendar,
  Banknote,
  Scale,
} from "lucide-react";
import Reveal from "./Reveal";

interface AboutProps {
  locale: Locale;
}

export default function About({ locale }: AboutProps) {
  const t = translations[locale];

  const registryItems = [
    { icon: Calendar, label: t.about.incorporated, value: "12.03.2019" },
    { icon: Banknote, label: t.about.registeredCapital, value: "CHF 100'000" },
    { icon: Scale, label: t.about.legalForm, value: t.about.agForm },
  ];

  const pillars = [
    {
      icon: Target,
      title: t.about.mission,
      text: t.about.missionText,
      color: "var(--navy)",
      bg: "rgba(11,31,63,0.04)",
    },
    {
      icon: Eye,
      title: t.about.vision,
      text: t.about.visionText,
      color: "var(--royal-light)",
      bg: "rgba(43,94,160,0.06)",
    },
    {
      icon: Heart,
      title: t.about.values,
      text: t.about.valuesText,
      color: "var(--gold)",
      bg: "rgba(200,152,44,0.06)",
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[var(--off-white)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-badge mb-4 inline-flex">
              <Building2 size={12} />
              {locale === "de" ? "Über uns" : "About Us"}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[var(--text-heading)] mb-5 tracking-tight"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {t.about.title}
            </h2>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
              {t.about.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column – Story + CEO + Registry */}
          <div className="space-y-8">
            <Reveal>
              <div className="card p-8">
                <p className="text-[var(--text-body)] leading-[1.85] text-[15px] break-words">
                  {t.about.description}
                </p>
              </div>
            </Reveal>

            {/* CEO Card */}
            <Reveal delay={100}>
              <div className="card p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[var(--royal-light)] flex items-center justify-center shrink-0">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <h4
                    className="text-base font-bold text-[var(--text-heading)]"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {t.about.ceo}
                  </h4>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">
                    {t.about.ceoTitle}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Registry Info */}
            <Reveal delay={180}>
              <div className="card p-6">
                <div className="space-y-4">
                  {registryItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(11,31,63,0.04)" }}
                      >
                        <item.icon
                          size={16}
                          className="text-[var(--royal-light)]"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-[var(--text-muted)] uppercase tracking-[0.12em] font-semibold mb-0.5">
                          {item.label}
                        </div>
                        <div className="text-sm font-bold text-[var(--text-heading)] break-words">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column – Mission / Vision / Values */}
          <div className="space-y-6">
            {pillars.map((pillar, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className="card p-8 group">
                  <div className="flex items-start gap-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: pillar.bg }}
                    >
                      <pillar.icon size={20} style={{ color: pillar.color }} />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-bold text-[var(--text-heading)] mb-2"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[var(--text-body)] leading-relaxed">
                        {pillar.text}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
