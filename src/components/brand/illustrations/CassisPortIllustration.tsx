import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Illustration stylisée du port de Cassis et des Calanques :
 * Cap Canaille en falaise stratifiée à droite, pointus à voiles,
 * reflets sur la mer. Purement décoratif → `aria-hidden`.
 */
export function CassisPortIllustration({ className }: Props) {
  return (
    <svg
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      className={cn("block w-full h-auto", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="cassis-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f4ecdd" />
          <stop offset="100%" stopColor="#e8d5a8" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="cassis-sea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4a5530" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4a5530" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="cassis-cliff" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d4af6e" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8b6f3a" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Ciel */}
      <rect width="800" height="280" fill="url(#cassis-sky)" />

      {/* Soleil */}
      <circle cx="200" cy="120" r="38" fill="#d4af6e" opacity="0.45" />
      <circle cx="200" cy="120" r="24" fill="#d4af6e" opacity="0.8" />

      {/* Calanques à gauche (silhouettes basses) */}
      <path
        d="M0 250 L60 210 L120 240 L180 215 L240 235 L300 220 L300 290 L0 290 Z"
        fill="#4a5530"
        opacity="0.25"
      />

      {/* Cap Canaille à droite — falaise stratifiée monumentale */}
      <path
        d="M420 290 L460 230 L520 180 L600 130 L700 110 L800 100 L800 290 Z"
        fill="url(#cassis-cliff)"
      />
      {/* Strates */}
      <g stroke="#1f2218" strokeWidth="0.8" fill="none" opacity="0.35">
        <path d="M460 230 Q540 200 800 180" />
        <path d="M480 210 Q580 180 800 160" />
        <path d="M520 188 Q620 162 800 140" />
        <path d="M560 168 Q660 142 800 124" />
        <path d="M620 144 Q700 124 800 110" />
      </g>
      {/* Crête sommitale */}
      <path
        d="M420 290 L460 230 L520 180 L600 130 L700 110 L800 100"
        stroke="#1f2218"
        strokeWidth="1.4"
        fill="none"
        opacity="0.55"
      />

      {/* Mer */}
      <rect x="0" y="290" width="800" height="160" fill="url(#cassis-sea)" />

      {/* Reflets */}
      <g stroke="#1f2218" strokeWidth="0.7" opacity="0.35">
        <line x1="40" y1="310" x2="130" y2="310" />
        <line x1="170" y1="320" x2="260" y2="320" />
        <line x1="310" y1="312" x2="400" y2="312" />
        <line x1="440" y1="322" x2="540" y2="322" />
        <line x1="580" y1="312" x2="680" y2="312" />
        <line x1="60" y1="346" x2="180" y2="346" />
        <line x1="230" y1="360" x2="360" y2="360" />
        <line x1="410" y1="348" x2="520" y2="348" />
        <line x1="560" y1="364" x2="680" y2="364" />
        <line x1="100" y1="396" x2="220" y2="396" />
        <line x1="280" y1="410" x2="420" y2="410" />
        <line x1="480" y1="398" x2="620" y2="398" />
      </g>

      {/* Voilier au loin */}
      <g stroke="#1f2218" strokeWidth="1.2" fill="#f4ecdd">
        <path d="M340 312 L360 312 L356 322 L344 322 Z" />
        <line x1="350" y1="312" x2="350" y2="278" />
        <path d="M350 282 L368 308 L350 308 Z" fill="#d4af6e" fillOpacity="0.55" />
      </g>

      {/* Pointus au premier plan */}
      <g stroke="#1f2218" strokeWidth="1.4" fill="#f4ecdd">
        <path d="M80 360 Q140 348 220 360 L208 382 Q150 390 92 382 Z" />
        <line x1="150" y1="360" x2="150" y2="296" />
        <path d="M150 300 L184 348 L150 348 Z" fill="#4a5530" fillOpacity="0.6" />
        <path d="M150 300 L120 348 L150 348 Z" fill="#d4af6e" fillOpacity="0.55" />
      </g>
      <g stroke="#1f2218" strokeWidth="1.4" fill="#f4ecdd">
        <path d="M260 388 Q320 378 400 388 L388 408 Q330 414 272 408 Z" />
        <line x1="330" y1="388" x2="330" y2="318" />
        <path d="M330 322 L358 376 L330 376 Z" fill="#4a5530" fillOpacity="0.55" />
      </g>

      {/* Oiseaux */}
      <g stroke="#1f2218" strokeWidth="1.2" fill="none">
        <path d="M80 90 q5 -5 10 0 q5 -5 10 0" />
        <path d="M140 70 q5 -5 10 0 q5 -5 10 0" />
        <path d="M260 95 q6 -6 12 0 q6 -6 12 0" />
        <path d="M380 80 q5 -5 10 0 q5 -5 10 0" />
      </g>
    </svg>
  );
}
