import "./globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer"
import ContactForm from "./contactform/page";
import Hero from "../components/home/Hero";
import { Toaster } from "sonner";
export const metadata = {
  title: "StudioName | Photo & Video Agency",
  description: "Professional Photography & Video Production Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
       <Toaster richColors position="top-right" toastOptions={{ duration:3000 }} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
