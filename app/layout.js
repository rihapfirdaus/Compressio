import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Compressio",
  description: "Web app for compressing text, audio, video, and images.",
  keywords:
    "compressio, compress media, compress text, compress audio, compress video, compress images, compress free",
  openGraph: {
    title: "Compressio",
    description: "Free web app for compressing text, audio, video, and images.",
    images: "/compressio.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
