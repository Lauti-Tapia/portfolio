import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lautaro Tapia - Senior BI Consultant",
  description: "Portfolio profesional de Lautaro Tapia, Senior BI Consultant con +4 años de experiencia en Power BI, DAX, SQL y modelado dimensional. Especializado en soluciones analíticas para la toma de decisiones estratégicas.",
  keywords: "senior bi consultant, business intelligence, power bi, dax, sql, data analyst, portfolio, análisis de datos, modelado dimensional, etl",
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
