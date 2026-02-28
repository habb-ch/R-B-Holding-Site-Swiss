'use client';

import { useState, FormEvent } from 'react';
import { translations, Locale } from '@/lib/i18n';
import { Mail, Phone, MapPin, Send, Building2, CheckCircle2, Loader2 } from 'lucide-react';
import Reveal from './Reveal';

interface ContactProps {
    locale: Locale;
}

export default function Contact({ locale }: ContactProps) {
    const t = translations[locale];
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Submit to both FormSubmit and Supabase in parallel
            const [formSubmitResponse, supabaseResponse] = await Promise.all([
                // FormSubmit for email notification
                fetch('https://formsubmit.co/ajax/info@rbrajhholding.ch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        _subject: `Neue Kontaktanfrage von ${formData.name}`,
                    }),
                }),
                // Supabase for admin dashboard
                fetch('/api/admin/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }),
            ]);

            if (formSubmitResponse.ok || supabaseResponse.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                setError(locale === 'de' ? 'Fehler beim Senden' : 'Failed to send');
            }
        } catch (err) {
            console.error('Contact form error:', err);
            setError(locale === 'de' ? 'Ein Fehler ist aufgetreten' : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: MapPin,
            label: t.contact.address,
            value: 'Lyssachstrasse 83, 3400 Burgdorf, Schweiz',
        },
        {
            icon: Mail,
            label: t.contact.email,
            value: 'info@rbrajhholding.ch',
            href: 'mailto:info@rbrajhholding.ch',
        },
        {
            icon: Phone,
            label: t.contact.phone,
            value: '+41 34 530 50 40',
            href: 'tel:+41345305040',
        },
        {
            icon: Building2,
            label: locale === 'de' ? 'Handelsregister' : 'Commercial Register',
            value: 'CHE-216.745.582',
        },
    ];

    return (
        <section id="contact" className="relative py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <Reveal>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="section-badge mb-4 inline-flex">
                            <Mail size={12} />
                            {t.contact.title}
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[var(--text-heading)] mb-5 tracking-tight"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                            {t.contact.subtitle}
                        </h2>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
                    {/* Left – Contact Info */}
                    <div className="space-y-6">
                        {contactInfo.map((item, i) => (
                            <Reveal key={i} delay={i * 80}>
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-[rgba(11,31,63,0.04)] flex items-center justify-center shrink-0 group-hover:bg-[rgba(11,31,63,0.08)] transition-colors">
                                        <item.icon size={18} className="text-[var(--royal-light)]" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-xs text-[var(--text-muted)] uppercase tracking-[0.12em] font-semibold mb-1">
                                            {item.label}
                                        </div>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="text-[15px] font-semibold text-[var(--text-heading)] hover:text-[var(--royal-light)] transition-colors break-words inline-block"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <div className="text-[15px] font-semibold text-[var(--text-heading)] break-words">
                                                {item.value}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Reveal>
                        ))}

                        {/* Decorative element */}
                        <Reveal delay={350}>
                            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[var(--off-white)] to-[var(--light-bg)] border border-[var(--border-light)]">
                                <div className="flex items-center gap-3">
                                    <div className="h-px flex-1 bg-[var(--gold)] opacity-30" />
                                    <span className="text-xs font-bold text-[var(--gold)] tracking-widest uppercase">
                                        Burgdorf, Switzerland
                                    </span>
                                    <div className="h-px flex-1 bg-[var(--gold)] opacity-30" />
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right – Form */}
                    <Reveal delay={150}>
                        <div className="card p-8">
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                                        <CheckCircle2 size={28} className="text-green-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[var(--text-heading)] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                        {locale === 'de' ? 'Nachricht gesendet!' : 'Message Sent!'}
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        {locale === 'de'
                                            ? 'Vielen Dank! Wir werden uns in Kürze bei Ihnen melden.'
                                            : 'Thank you! We will get back to you shortly.'}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                            {error}
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-[0.12em] mb-2">
                                            {t.contact.name}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="input-field"
                                            placeholder={t.contact.name}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-[0.12em] mb-2">
                                            {t.contact.emailLabel}
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="input-field"
                                            placeholder={t.contact.emailLabel}
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            disabled={loading}
                                            suppressHydrationWarning
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-[0.12em] mb-2">
                                            {t.contact.message}
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            className="input-field resize-none"
                                            placeholder={t.contact.message}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            disabled={loading}
                                        />
                                    </div>
                                    <button type="submit" className="btn-primary w-full" disabled={loading}>
                                        {loading ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Send size={16} />
                                        )}
                                        {loading 
                                            ? (locale === 'de' ? 'Wird gesendet...' : 'Sending...') 
                                            : t.contact.send}
                                    </button>
                                </form>
                            )}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
