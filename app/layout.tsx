import type { Metadata } from "next";
import "./globals.css";
import { QuoteCartProvider } from "@/context/QuoteCartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GiantzFly Exim LLP — Indian Export Catalog",
    template: "%s | GiantzFly Exim LLP",
  },
  description:
    "GiantzFly Exim LLP exports Indian spices, dry fruits and makhana to global B2B buyers — farm-direct, lab-certified, export-ready.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(montserrat.variable)}>
      <body className={cn(montserrat.variable, "antialiased")}>
        <QuoteCartProvider>
          <Navbar />
          {children}
          <Footer />
        </QuoteCartProvider>
      </body>
    </html>
  );
}