'use client';

import { useState } from 'react';
import { Locale } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import Partners from '@/components/Partners';
import Team from '@/components/Team';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [locale, setLocale] = useState<Locale>('de');

  return (
    <main className="min-h-screen bg-white">
      <Navbar locale={locale} onLocaleChange={setLocale} />
      <Hero locale={locale} />
      <Portfolio locale={locale} />
      <Partners locale={locale} />
      <Team locale={locale} />
      <About locale={locale} />
      <Contact locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
