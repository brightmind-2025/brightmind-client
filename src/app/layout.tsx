// app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins, Josefin_Sans } from "next/font/google";

import "./globals.css";
import Header from "@/components/header";
import ReduxProvider from "@/utils/ReduxProvider";

import ReduxProvider from "@/utils/ReduxProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export const metadata: Metadata = {
  title: "BrightMind",
  description: "E-learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefinSans.variable}`
          .trim()
          .replace(/\s+/g, " ")}
      >
        <ReduxProvider>
          <ThemeProvider>
            <Header />
            <div className="pt-20">{children}</div>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
