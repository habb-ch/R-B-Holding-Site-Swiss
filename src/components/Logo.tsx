'use client';

import Image from 'next/image';

export default function Logo({ size = 40, className = '' }: { size?: number; className?: string }) {
    return (
        <div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            <Image
                src="/logos/RAndB_Rajh_Holding_AG_Logo.png"
                alt="R&B Rajh Holding AG Logo"
                fill
                className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                priority
            />
        </div>
    );
}
