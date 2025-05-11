import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lautaro Tapia - Data Analyst & Data Engineer",
  description: "Portfolio profesional de Lautaro Tapia, especialista en análisis de datos e ingeniería de datos. Explora mis proyectos y experiencia en el campo de los datos.",
  keywords: "data analyst, data engineer, portfolio, análisis de datos, ingeniería de datos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
