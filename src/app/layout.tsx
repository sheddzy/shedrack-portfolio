import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shedrack Ebete | Operations, Projects & Business Systems",
  description: "Shedrack Ebete helps organisations bring structure to operations, projects and business systems.",
  openGraph: {
    title: "Shedrack Ebete | Operations, Projects & Business Systems",
    description: "Turning business complexity into organised execution.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}