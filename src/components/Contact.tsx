'use client';

import { useState } from 'react';
import { translations, Locale } from '@/lib/i18n';
import { MapPin, Mail, Phone, Send, CheckCircle } from 'lucide-react';

interface ContactProps {
    locale: Locale;
}

export default function Contact({ locale }: ContactProps) {
    const t = translations[locale].contact;
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`R&B Rajh Holding AG – Contact from ${form.name}`);
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
        );
        window.location.href = `mailto:info@rajhholding.ch?subject=${subject}&body=${body}`;
        setSent(true);
        setTimeout(() => setSent(false), 5000);
    };

    const contactInfo = [
        {
            icon: MapPin,
            label: t.address,
            value: 'Burgdorf, Switzerland',
            href: 'https://maps.google.com/?q=Burgdorf,Switzerland',
        },
        {
            icon: Mail,
            label: t.email,
            value: 'info@rajhholding.ch',
            href: 'mailto:info@rajhholding.ch',
        },
        {
            icon: Phone,
            label: t.phone,
            value: '+41 34 422 26 28',
            href: 'tel:+41344222628',
        },
    ];

    return (
        <section id="contact" className="relative py-28 overflow-hidden bg-[#F5F7FB]">
            <div className="divider-gold" />

            <div className="max-w-7xl mx-auto px-6 pt-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="section-label block mb-4">{t.title}</span>
                    <h2
                        className="text-4xl sm:text-5xl font-bold text-[#111318] mb-4"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        {t.subtitle}
                    </h2>
                    <div className="divider-gold max-w-xs mx-auto" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Left: Info */}
                    <div className="flex flex-col gap-5">
                        <div>
                            <h3
                                className="text-[#111318] font-bold text-2xl mb-3"
                                style={{ fontFamily: 'Outfit, sans-serif' }}
                            >
                                R&B Rajh Holding AG
                            </h3>
                            <p className="text-[#6B7A96] text-base leading-relaxed">
                                {locale === 'de'
                                    ? 'Haben Sie Fragen zu unseren Beteiligungen oder Partnerschaftsmöglichkeiten? Wir freuen uns von Ihnen zu hören.'
                                    : 'Have questions about our portfolio or partnership opportunities? We look forward to hearing from you.'}
                            </p>
                        </div>

                        {contactInfo.map((info, i) => (
                            <a
                                key={i}
                                href={info.href}
                                target={info.icon === MapPin ? '_blank' : undefined}
                                rel={info.icon === MapPin ? 'noopener noreferrer' : undefined}
                                className="flex items-center gap-4 group p-4 rounded-xl border border-[rgba(140,160,200,0.2)] bg-white hover:border-[#8CA0C8] hover:shadow-md transition-all"
                                id={`contact-info-${i}`}
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#EEF1F8] border border-[rgba(140,160,200,0.2)] flex items-center justify-center flex-shrink-0">
                                    <info.icon size={16} className="text-[#8CA0C8]" />
                                </div>
                                <div>
                                    <p className="text-[#8CA0C8] text-xs uppercase tracking-wider mb-0.5 font-semibold">
                                        {info.label}
                                    </p>
                                    <p className="text-[#111318] text-sm font-semibold group-hover:text-[#8CA0C8] transition-colors">
                                        {info.value}
                                    </p>
                                </div>
                            </a>
                        ))}

                        {/* Registry note */}
                        <div className="p-4 rounded-xl border border-[rgba(140,160,200,0.2)] bg-white">
                            <p className="text-xs text-[#8CA0C8] uppercase tracking-wider mb-1 font-semibold">
                                {locale === 'de' ? 'Handelsregistereintrag' : 'Commercial Registry'}
                            </p>
                            <p className="text-[#111318] text-sm font-semibold">CHE — Burgdorf, Kanton Bern</p>
                            <p className="text-[#6B7A96] text-xs mt-0.5">
                                {locale === 'de'
                                    ? 'Aktiengesellschaft · Eingetragen 12.03.2019'
                                    : 'Corporation (AG) · Registered 12.03.2019'}
                            </p>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="glass-card p-8">
                        {sent ? (
                            <div className="flex flex-col items-center justify-center gap-4 py-12">
                                <CheckCircle size={44} className="text-[#C9892A]" />
                                <p className="text-[#111318] font-semibold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    {locale === 'de' ? 'Nachricht gesendet!' : 'Message Sent!'}
                                </p>
                                <p className="text-[#6B7A96] text-sm text-center">
                                    {locale === 'de'
                                        ? 'Wir werden uns bald bei Ihnen melden.'
                                        : 'We will get back to you soon.'}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div>
                                    <label className="block text-xs text-[#6B7A96] font-semibold uppercase tracking-wider mb-2">
                                        {t.name}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="input-field"
                                        placeholder={t.name}
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        id="contact-name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-[#6B7A96] font-semibold uppercase tracking-wider mb-2">
                                        {t.emailLabel}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="input-field"
                                        placeholder={t.emailLabel}
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        id="contact-email"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-[#6B7A96] font-semibold uppercase tracking-wider mb-2">
                                        {t.message}
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="input-field resize-none"
                                        placeholder={t.message}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        id="contact-message"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn-gold flex items-center justify-center gap-2 w-full"
                                    id="contact-submit"
                                >
                                    <Send size={14} />
                                    {t.send}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
