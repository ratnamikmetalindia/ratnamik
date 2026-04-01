import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Bitter } from 'next/font/google'
import FloatingWhatsApp from "@/components/FloatingWhatsapp.jsx";

const bitter = Bitter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ratnamik Metal - India",
  description: "Ratnamik metal india",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
       <body className={`${bitter.className} min-h-full flex flex-col overflow-x-hidden`}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}