"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Providers } from "../utils/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useLoadUserQuery } from "@/lib/features/apiSlice";
import Loader from "@/components/Loader/Loader";
import { io, Socket } from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socket: Socket = io(ENDPOINT, {
  transports: ["websocket"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
  display: "swap",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-Josefin",
  display: "swap",
});

export function ClientLoadUser({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoadUserQuery(
    {},
    { refetchOnMountOrArgChange: false }
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });

    return () => {
      socket.disconnect();
      console.log("❌ Disconnected from socket");
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeader = pathname?.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefinSans.variable}`.replace(
          /\s+/g,
          " "
        )}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider>
              {!hideHeader && <Header />}
              <Toaster position="top-center" reverseOrder={false} />
              <ClientLoadUser>
                <div className={hideHeader ? "" : "pt-20"}>{children}</div>
              </ClientLoadUser>
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
