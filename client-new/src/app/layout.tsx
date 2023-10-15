import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Container from "@/components/container";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudentGo",
  description: "Communal Learning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
