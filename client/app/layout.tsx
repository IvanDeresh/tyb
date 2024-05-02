import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
import { ReduxProvider } from "@/store/provider";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Try your best",
  description: "Created by Ivan Deresh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} lg:px-[15%]`}>
        <ReduxProvider>
          <TheHeader />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
