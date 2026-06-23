import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UQ AI Solution - Inteligencia Artificial para el Perú y el Mundo",
  description: "Transformamos empresas con inteligencia artificial. Servicios de IA, Academy, Lab e innovación tecnológica para el Perú y el mundo.",
  keywords: "inteligencia artificial, AI, machine learning, chatbots, automatización, Perú",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}