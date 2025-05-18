import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/components/query-provider";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KoinX - Tax Harvesting",
  description: "Cryptocurrency tax harvesting dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <TooltipProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
