import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Illustration stylisée du Vieux-Port de Marseille : silhouette de
 * Notre-Dame-de-la-Garde à droite, mâts des pointus au premier plan,
 * soleil et reflets sur l'eau. Trait fin, palette olive / or.
 * Purement décoratif → `aria-hidden`.
 */
export function MarseillePortIllustration({ className }: Props) {
  return (
    <svg
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      className={cn("block w-full h-auto", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="marseille-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FEFFEB" />
          <stop offset="100%" stopColor="#efe5d2" />
        </linearGradient>
        <linearGradient id="marseille-sea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F4DCA9" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#75774A" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Ciel */}
      <rect width="800" height="300" fill="url(#marseille-sky)" />
      {/* Soleil */}
      <circle cx="600" cy="140" r="46" fill="#ECBB6E" opacity="0.55" />
      <circle cx="600" cy="140" r="30" fill="#ECBB6E" opacity="0.85" />

      {/* Collines lointaines */}
      <path
        d="M0 240 L120 200 L210 220 L310 190 L420 215 L520 195 L640 220 L800 200 L800 300 L0 300 Z"
        fill="#75774A"
        opacity="0.18"
      />

      {/* Colline Notre-Dame */}
      <path
        d="M460 240 Q560 150 660 230 L800 230 L800 300 L460 300 Z"
        fill="#75774A"
        opacity="0.3"
      />
      {/* Notre-Dame-de-la-Garde stylisée */}
      <g stroke="#75774A" strokeWidth="1.4" fill="none">
        <rect x="556" y="148" width="36" height="42" />
        <polygon points="556,148 574,128 592,148" fill="#75774A" fillOpacity="0.25" />
        <rect x="568" y="108" width="12" height="22" />
        <line x1="574" y1="108" x2="574" y2="92" />
        <circle cx="574" cy="88" r="4" fill="#ECBB6E" stroke="none" />
      </g>

      {/* Mer */}
      <rect x="0" y="300" width="800" height="150" fill="url(#marseille-sea)" />
      {/* Reflets */}
      <g stroke="#75774A" strokeWidth="0.8" opacity="0.45">
        <line x1="40" y1="320" x2="120" y2="320" />
        <line x1="180" y1="332" x2="280" y2="332" />
        <line x1="320" y1="320" x2="420" y2="320" />
        <line x1="460" y1="338" x2="540" y2="338" />
        <line x1="580" y1="324" x2="660" y2="324" />
        <line x1="60" y1="356" x2="160" y2="356" />
        <line x1="220" y1="372" x2="340" y2="372" />
        <line x1="400" y1="360" x2="500" y2="360" />
        <line x1="540" y1="378" x2="640" y2="378" />
        <line x1="680" y1="362" x2="760" y2="362" />
        <line x1="80" y1="402" x2="200" y2="402" />
        <line x1="260" y1="416" x2="400" y2="416" />
        <line x1="460" y1="406" x2="600" y2="406" />
        <line x1="640" y1="420" x2="760" y2="420" />
      </g>

      {/* Pointus (barques) au premier plan */}
      <g stroke="#1f2218" strokeWidth="1.4" fill="#FEFFEB">
        <path d="M120 358 Q160 348 220 358 L210 376 Q170 382 130 376 Z" />
        <line x1="170" y1="358" x2="170" y2="300" />
        <path d="M170 304 L196 340 L170 340 Z" fill="#75774A" fillOpacity="0.55" />
      </g>
      <g stroke="#1f2218" strokeWidth="1.4" fill="#FEFFEB">
        <path d="M300 372 Q340 362 400 372 L390 390 Q350 396 310 390 Z" />
        <line x1="350" y1="372" x2="350" y2="296" />
        <path d="M350 300 L380 348 L350 348 Z" fill="#ECBB6E" fillOpacity="0.65" />
      </g>
      <g stroke="#1f2218" strokeWidth="1.4" fill="#FEFFEB">
        <path d="M480 386 Q520 376 580 386 L570 404 Q530 410 490 404 Z" />
        <line x1="530" y1="386" x2="530" y2="308" />
        <path d="M530 312 L558 360 L530 360 Z" fill="#75774A" fillOpacity="0.55" />
      </g>

      {/* Oiseaux */}
      <g stroke="#1f2218" strokeWidth="1.2" fill="none">
        <path d="M140 100 q6 -6 12 0 q6 -6 12 0" />
        <path d="M210 80 q5 -5 10 0 q5 -5 10 0" />
        <path d="M310 110 q6 -6 12 0 q6 -6 12 0" />
      </g>
    </svg>
  );
}
