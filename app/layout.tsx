import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import Modal from "@/components/modals/Modal";

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
          <Modal title="hello world!" isOpen actionLabel="submit" />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
