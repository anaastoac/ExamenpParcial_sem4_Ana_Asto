"use client";

import { Brain, Sparkles, Linkedin, Twitter, Github, Mail, Phone, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-brand-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <Brain className="w-10 h-10 text-brand-blue" />
                <Sparkles className="w-4 h-4 text-purple-500 absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-brand-blue">UQ</span>
                <span className="text-white"> AI</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Transformando empresas con inteligencia artificial. Soluciones innovadoras para el Perú y el mundo.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-brand-blue rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-brand-blue rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-brand-blue rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              {[
                { name: "Servicios", href: "#servicios" },
                { name: "UQ AI Academy", href: "#academia" },
                { name: "UQ AI Lab", href: "#lab" },
                { name: "Contacto", href: "#contacto" },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6">Servicios</h3>
            <ul className="space-y-4">
              {[
                "Agentes IA",
                "Chatbots Inteligentes",
                "Automatización",
                "Big Data",
                "Machine Learning",
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Av. Javier Prado 1234, Lima, Perú</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">+51 1 234 5678</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">contacto@uqai.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t border-white/10 transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} UQ AI Solution. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Términos de Servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Aviso Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}