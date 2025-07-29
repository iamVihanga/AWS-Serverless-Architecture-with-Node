import { DM_Sans, Space_Mono } from "next/font/google";

export const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"]
});

export const spaceMono = Space_Mono({
  variable: "--font-mono",
  weight: "400",
  subsets: ["latin"]
});
