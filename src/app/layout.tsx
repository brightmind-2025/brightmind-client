"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Providers } from "../utils/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/lib/features/apiSlice";
import Loader from "../components/Loader/Loader";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Hide header on /admin routes
  const hideHeader = pathname?.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefinSans.variable}`
          .trim()
          .replace(/\s+/g, " ")}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider>
              {!hideHeader && <Header />}
              <Toaster position="top-center" reverseOrder={false} />
              {/* Conditionally apply top padding only when header is visible */}
              <Custom>
                <div className={hideHeader ? undefined : "pt-20"}>
                  {children}
                </div>
              </Custom>
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const { isLoading } = useLoadUserQuery({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
