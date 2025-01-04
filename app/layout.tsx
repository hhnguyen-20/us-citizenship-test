import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My App",
  description: "Some description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Global Navbar appears above every page */}
        <Navbar />

        {/* The page content */}
        {children}

        {/* Footer on every page */}
        <Footer />
      </body>
    </html>
  );
}
