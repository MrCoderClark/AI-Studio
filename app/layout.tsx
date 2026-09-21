import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-display" });

export const metadata: Metadata = {
  title: { default: "AI Studio", template: "%s · AI Studio" },
  description: "A focused workspace for shaping your next idea with AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable}`}><body><ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>{children}</ThemeProvider></body></html>;
}
