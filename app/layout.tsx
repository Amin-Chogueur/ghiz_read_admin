import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import BookProvider from "../context/BookContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ghiz Admin Panel",
  description: "Ghiz Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <BookProvider>
          <div className="lg:flex">
            <Header />
            <main className="flex-1 lg:ml-[200px] mt-16 lg:mt-0">
              {children}
              <ToastContainer />
            </main>
          </div>
        </BookProvider>
      </body>
    </html>
  );
}
