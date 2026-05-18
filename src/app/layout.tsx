import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashLoader } from "@/components/splash-loader";
import { VisitorTracker } from "@/components/visitor-tracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
    title: "Project Move | MoveOS",
    description: "Experience ultimate performance with MoveOS, the most advanced Android ROM for MediaTek devices.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased selection:bg-blue-500/30`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    <SplashLoader>
                        <VisitorTracker />
                        <div className="fixed inset-0 bg-mesh -z-10" />
                        {children}
                    </SplashLoader>
                </ThemeProvider>
            </body>
        </html>
    );
}
