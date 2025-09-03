import type { Metadata } from "next";
import "./globals.css";
import { ClientWeb3Provider } from "@/providers/ClientWeb3Provider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Mind Show",
  description: "Interactive mind mapping with blockchain publishing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          <ClientWeb3Provider>
            {children}
            <Toaster />
          </ClientWeb3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
