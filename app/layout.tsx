import type { Metadata } from "next";
import "./globals.css";
import { QuoteCartProvider } from "@/context/QuoteCartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ContactSettingsProvider } from "@/context/ContactSettingsContext";
import { getProducts } from "@/lib/catalog";
import { getSiteSettings } from "@/lib/settings";

export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    default: "Giantzfly, Indian Export Catalog",
    template: "%s | Giantzfly",
  },
  description:
    "Giantzfly supplies Indian spices, dry fruits and makhana to global B2B buyers.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);
  return (
    <html lang="en" className="antialiased">
      <body className="antialiased">
        <ContactSettingsProvider settings={settings}>
          <QuoteCartProvider>
            <Navbar products={products} />
            {children}
            <Footer settings={settings} />
          </QuoteCartProvider>
        </ContactSettingsProvider>
      </body>
    </html>
  );
}
