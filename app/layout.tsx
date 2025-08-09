import type { Metadata } from "next";
import { Ovo, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Portfolio - Chris Wagner",
  description: "Chris Wagner's Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
