import "@/styles/globals.css";

import { type Metadata } from "next";

import { inter } from "@/fonts";

import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    template: "%s — sql-wiz",
    default: "sql-wiz",
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
