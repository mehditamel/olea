import splashScreens from "@/lib/pwa/apple-splash-screens.json";

// Émet les <link rel="apple-touch-startup-image"> (splash iOS en standalone).
// React 19 hoiste ces balises dans le <head>. Les specs sont partagées avec
// scripts/generate-pwa-icons.mjs (source unique : apple-splash-screens.json).
export function AppleSplashLinks() {
  return (
    <>
      {splashScreens.map(({ dw, dh, ratio }) => {
        const href = `/icons/apple-splash-${dw * ratio}x${dh * ratio}.png`;
        const media = `screen and (device-width: ${dw}px) and (device-height: ${dh}px) and (-webkit-device-pixel-ratio: ${ratio}) and (orientation: portrait)`;
        return (
          <link
            key={media}
            rel="apple-touch-startup-image"
            media={media}
            href={href}
          />
        );
      })}
    </>
  );
}
