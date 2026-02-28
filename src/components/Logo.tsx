"use client";

import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logos/RAndB_Rajh_Holding_AG_Logo.png"
        alt="R&B Rajh Holding AG Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
