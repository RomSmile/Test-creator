import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app">
          <Providers>
            <div className="body">{children}</div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
