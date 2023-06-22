import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import QueryWrapper from "@/components/hooks/QueryWrapper";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/layout/Toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EMS",
  description: "Employee Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <QueryWrapper>
          <body className={`${inter.className} min-h-screen flex flex-col  `}>
            {children}
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
              <div>
                <p>
                  Copyright © 2023 - All right reserved by ACME Industries Ltd
                </p>
              </div>
            </footer>
            <Toaster />
          </body>
        </QueryWrapper>
      </html>
    </ClerkProvider>
  );
}
