import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Illustration stylisée du littoral de Villeneuve-Loubet : horizon
 * méditerranéen, colline azuréenne et oliviers en premier plan
 * (clin d'œil à la signature de la maison). Purement décoratif.
 */
export function VilleneuveCoastIllustration({ className }: Props) {
  return (
    <svg
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      className={cn("block w-full h-auto", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="vlb-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FEFFEB" />
          <stop offset="100%" stopColor="#F4DCA9" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="vlb-sea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#75774A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#75774A" stopOpacity="0.32" />
        </linearGradient>
      </defs>

      {/* Ciel */}
      <rect width="800" height="240" fill="url(#vlb-sky)" />

      {/* Soleil */}
      <circle cx="560" cy="118" r="44" fill="#ECBB6E" opacity="0.45" />
      <circle cx="560" cy="118" r="28" fill="#ECBB6E" opacity="0.85" />

      {/* Collines arrière-pays */}
      <path
        d="M0 230 Q120 180 240 220 Q360 245 480 200 Q600 175 800 210 L800 260 L0 260 Z"
        fill="#75774A"
        opacity="0.22"
      />
      <path
        d="M0 254 Q140 220 280 248 Q420 270 560 234 Q680 218 800 244 L800 290 L0 290 Z"
        fill="#75774A"
        opacity="0.35"
      />

      {/* Mer */}
      <rect x="0" y="290" width="800" height="80" fill="url(#vlb-sea)" />

      {/* Reflets */}
      <g stroke="#1f2218" strokeWidth="0.7" opacity="0.32">
        <line x1="40" y1="306" x2="140" y2="306" />
        <line x1="190" y1="316" x2="290" y2="316" />
        <line x1="340" y1="306" x2="440" y2="306" />
        <line x1="490" y1="320" x2="600" y2="320" />
        <line x1="640" y1="308" x2="760" y2="308" />
        <line x1="70" y1="346" x2="200" y2="346" />
        <line x1="260" y1="358" x2="400" y2="358" />
        <line x1="440" y1="346" x2="580" y2="346" />
      </g>

      {/* Voilier minuscule sur l'horizon */}
      <g stroke="#1f2218" strokeWidth="1" fill="#FEFFEB">
        <line x1="420" y1="298" x2="420" y2="282" />
        <path d="M420 286 L432 296 L420 296 Z" fill="#ECBB6E" fillOpacity="0.7" />
      </g>

      {/* Plage / galets — bande sableuse */}
      <path
        d="M0 370 Q200 360 400 372 Q600 384 800 368 L800 410 L0 410 Z"
        fill="#efe5d2"
      />
      <g fill="#B07D2E" opacity="0.45">
        <circle cx="120" cy="392" r="3" />
        <circle cx="160" cy="400" r="2" />
        <circle cx="220" cy="394" r="2.5" />
        <circle cx="290" cy="402" r="3" />
        <circle cx="360" cy="392" r="2" />
        <circle cx="440" cy="402" r="2.5" />
        <circle cx="520" cy="394" r="3" />
        <circle cx="600" cy="402" r="2" />
        <circle cx="680" cy="392" r="2.5" />
      </g>

      {/* Oliviers en silhouette — premier plan gauche */}
      <g>
        {/* Tronc 1 */}
        <path
          d="M100 410 Q104 380 102 360 Q100 340 108 320"
          stroke="#1f2218"
          strokeWidth="2.2"
          fill="none"
        />
        {/* Feuillage 1 */}
        <g fill="#75774A" fillOpacity="0.55">
          <ellipse cx="100" cy="316" rx="38" ry="20" />
          <ellipse cx="80" cy="300" rx="22" ry="14" transform="rotate(-15 80 300)" />
          <ellipse cx="124" cy="298" rx="22" ry="14" transform="rotate(12 124 298)" />
          <ellipse cx="106" cy="282" rx="20" ry="12" />
        </g>
        {/* Olives */}
        <g fill="#1f2218" opacity="0.55">
          <circle cx="88" cy="318" r="2.4" />
          <circle cx="112" cy="306" r="2.4" />
          <circle cx="98" cy="328" r="2.4" />
        </g>
      </g>

      {/* Tronc 2 — droit */}
      <g>
        <path
          d="M690 410 Q694 380 692 358 Q690 338 700 318"
          stroke="#1f2218"
          strokeWidth="2.2"
          fill="none"
        />
        <g fill="#75774A" fillOpacity="0.55">
          <ellipse cx="700" cy="316" rx="42" ry="22" />
          <ellipse cx="676" cy="298" rx="22" ry="14" transform="rotate(-12 676 298)" />
          <ellipse cx="724" cy="302" rx="24" ry="14" transform="rotate(15 724 302)" />
          <ellipse cx="704" cy="282" rx="22" ry="13" />
        </g>
        <g fill="#1f2218" opacity="0.55">
          <circle cx="686" cy="318" r="2.4" />
          <circle cx="714" cy="308" r="2.4" />
          <circle cx="700" cy="328" r="2.4" />
        </g>
      </g>

      {/* Petites herbes au sol */}
      <g stroke="#75774A" strokeWidth="1" opacity="0.55">
        <path d="M240 410 l-3 -10" />
        <path d="M244 410 l2 -8" />
        <path d="M320 410 l-2 -8" />
        <path d="M324 410 l3 -10" />
        <path d="M460 410 l-3 -10" />
        <path d="M464 410 l2 -8" />
        <path d="M540 410 l-3 -9" />
        <path d="M544 410 l3 -7" />
      </g>

      {/* Oiseaux */}
      <g stroke="#1f2218" strokeWidth="1.2" fill="none">
        <path d="M260 80 q5 -5 10 0 q5 -5 10 0" />
        <path d="M340 96 q6 -6 12 0 q6 -6 12 0" />
        <path d="M420 70 q5 -5 10 0 q5 -5 10 0" />
      </g>
    </svg>
  );
}
