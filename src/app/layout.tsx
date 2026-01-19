import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "NGO Donation System",
  description: "Transparent & ethical donation platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
