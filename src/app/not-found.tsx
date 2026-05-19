export const dynamic = "force-static";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#f4ecdd",
          color: "#1f2218",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>404</h1>
        <p style={{ marginBottom: "1.5rem" }}>Page not found.</p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" style={{ color: "#4a5530", textDecoration: "underline" }}>
          Return home
        </a>
      </body>
    </html>
  );
}
