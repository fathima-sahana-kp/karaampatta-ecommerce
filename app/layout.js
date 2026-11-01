import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Karaampatta",
  description: "Rooted in flavour",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen pt-19">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}