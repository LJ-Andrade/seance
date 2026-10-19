import { Cormorant_Garamond, Inter } from "next/font/google";

// Body / UI typeface.
export const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Display / heading typeface (used italic for headlines, per the design).
export const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});
