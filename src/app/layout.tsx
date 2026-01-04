import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/header";
import Footer from "@/components/organisms/footer";
import CartDrawer from "@/components/organisms/cartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CrossFit Shop | Premium CrossFit Gear & Equipment",
  description: "Shop premium CrossFit equipment, apparel, and accessories. Elite gear for elite athletes.",
  keywords: "CrossFit, gym equipment, weightlifting, training shoes, fitness apparel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
