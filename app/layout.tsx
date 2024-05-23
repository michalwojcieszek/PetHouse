import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import RegisterModal from "@/components/modals/RegisterModal";

export const metadata: Metadata = {
  title: "PetHouse",
  description: "Find accommodation for your pet!",
};

const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar />
          <RegisterModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
