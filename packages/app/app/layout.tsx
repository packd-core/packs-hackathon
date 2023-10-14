import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./components/Providers";
import { Header } from "./components/Header";
import { ToastContainer } from "react-toastify";
import clsxm from "@/src/lib/clsxm";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Solidity Next.js Starter",
  description:
    "A starter kit for building full stack Ethereum dApps with Solidity and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsxm(
          inter.className,
          'bg-gradient-to-b from-[#F15025] via-[rgba(177,194,218,0.25)] to-[#B1C2DA] min-h-screen'
      )}>
        <Providers>
          <Header />
          {children}
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
