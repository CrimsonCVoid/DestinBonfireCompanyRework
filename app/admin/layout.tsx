import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

// We can't unmount the root layout, but we can completely re-skin the admin
// surface — neutral dark background, no SiteHeader/SiteFooter visible behind.
// (Site chrome still mounts; CSS below hides it within the admin route.)
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <style
        // Scoped style to suppress the site chrome rendered by the root layout.
        // Cleaner than threading a "hide chrome" flag through the root layout.
        dangerouslySetInnerHTML={{
          __html: `
            body { background: #0f0c0a !important; }
            body > a[href="#main"], header, footer { display: none !important; }
            main#main { padding: 0 !important; }
            .admin-shell { color: #f5efe4; min-height: 100dvh; }
          `,
        }}
      />
      {children}
    </div>
  );
}
