import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import AmplifyProvider from "../components/AmplifyProvider";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
        <AmplifyProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AmplifyProvider>
      </body>
    </html>
  );
}
