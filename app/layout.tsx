import { Navbar } from "./components";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals";
import "./globals.css";

import { Nunito } from "next/font/google";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Modal isOpen actionLabel="Submit" title="Sign up" />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
