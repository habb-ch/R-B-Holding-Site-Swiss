"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { translations, Locale } from "@/lib/i18n";
import { Users } from "lucide-react";
import Reveal from "./Reveal";

interface TeamProps {
  locale: Locale;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  company: string;
  image_url: string;
  order_index: number;
}

export default function Team({ locale }: TeamProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[locale];

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/admin/teams");
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="team" className="relative py-28 bg-[var(--bg-cream)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section id="team" className="relative py-28 bg-[var(--bg-cream)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-badge mb-4 inline-flex">
              <Users size={12} />
              {t.team?.title || "Unser Team"}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[var(--text-heading)] mb-5 tracking-tight"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {t.team?.title || "Unser Team"}
            </h2>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
              {t.team?.subtitle || "Die Menschen hinter unserem Erfolg."}
            </p>
          </div>
        </Reveal>

        {/* Team Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <Reveal key={member.id} delay={index * 100}>
              <div className="card p-6 h-full flex flex-col items-center text-center group w-[280px]">
                {/* Profile Image */}
                <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden bg-[var(--bg-cream)] border-4 border-[var(--border-light)] group-hover:border-[var(--gold)] transition-all duration-500">
                  {member.image_url ? (
                    <Image
                      src={member.image_url}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[var(--navy)] text-white text-3xl font-bold">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="h-px w-12 bg-[var(--border-light)] mb-4 group-hover:bg-[var(--gold)] group-hover:w-16 transition-all duration-500" />

                <h3
                  className="text-lg font-bold text-[var(--text-heading)] mb-1"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {member.name}
                </h3>

                <p className="text-sm font-medium text-[var(--royal-light)] mb-1">
                  {member.role}
                </p>

                {member.company && (
                  <p className="text-xs text-[var(--text-muted)]">
                    {member.company}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
