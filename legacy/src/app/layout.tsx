import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Project Move | MoveOS - Performance Beyond Limits",
  description: "Custom Android ROM for MediaTek Xiaomi/Redmi/Poco devices. Experience performance beyond limits with MoveOS.",
  keywords: ["Android ROM", "Custom ROM", "MoveOS", "Project Move", "MediaTek", "Xiaomi", "Redmi", "Poco"],
  authors: [{ name: "Project Move Team" }],
  openGraph: {
    title: "Project Move | MoveOS",
    description: "Performance Beyond Limits - Custom Android ROM for MediaTek devices",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Move | MoveOS",
    description: "Performance Beyond Limits - Custom Android ROM for MediaTek devices",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <div className="fixed inset-0 bg-hero-gradient -z-10" />
            <div className="fixed inset-0 noise-bg -z-10 pointer-events-none" />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
