import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="scroll-smooth antialiased [font-feature-settings:'ss01']">
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
