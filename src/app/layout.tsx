import type { Metadata } from "next";
import { Archivo, Funnel_Display, Inter_Tight } from "next/font/google";
import { Footer } from "@/components/footer/Footer";
import { Intro } from "@/components/intro/Intro";
import { IntroProvider } from "@/components/intro/IntroProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ✏️ Set NEXT_PUBLIC_SITE_URL to your real domain when you deploy.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"),
  title: "Diwakar — Portfolio",
  description: "Personal portfolio of Diwakar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${funnelDisplay.variable} ${archivo.variable} h-full`}
    >
      <body id="top" className="min-h-full">
        <SmoothScroll />
        <IntroProvider>
          {/* Plays on top of everything, then slides away. */}
          <Intro />
          {children}
          <Footer />
        </IntroProvider>
      </body>
    </html>
  );
}
