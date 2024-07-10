// src/app/layout.tsx
import type { Metadata } from "next";
import { Providers } from "@/components/shared/Providers";
import Navbar from "@/components/shared/Navbar";
import { ThirdwebProvider } from "thirdweb/react"; //needed?

export const metadata: Metadata = {
  title: "Film-Legion Beta",
  description: "This is just the begining...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ paddingBottom: "100px" }}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
