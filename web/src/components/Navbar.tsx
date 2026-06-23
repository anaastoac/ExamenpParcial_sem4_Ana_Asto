"use client";

import { useState, useEffect } from "react";
import { Menu, X, Brain, Sparkles } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Servicios", href: "#servicios" },
  { name: "Academia", href: "#academia" },
  { name: "Lab", href: "#lab" },
  { name: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-dark/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="relative">
              <Brain className="w-10 h-10 text-brand-blue" />
              <Sparkles className="w-4 h-4 text-purple-500 absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-brand-blue">UQ</span>
              <span className="text-white"> AI</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
            <Link href="/login" className="bg-brand-blue hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
              Iniciar Sesión
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-brand-dark/95 backdrop-blur-md px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium w-full text-left py-2"
            >
              {item.name}
            </button>
          ))}
          <Link href="/login" className="bg-brand-blue hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold w-full transition-all duration-300 text-center block">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
}
