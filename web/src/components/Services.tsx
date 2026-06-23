"use client";

import { useState, useEffect } from "react";
import { Bot, MessageSquare, Zap, Building2, Heart, GraduationCap, Database, Brain, Sparkles } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Agentes IA",
    description: "Agentes inteligentes autónomos que potencian tus operaciones empresariales con decisiones automatizadas.",
    color: "blue",
  },
  {
    icon: MessageSquare,
    title: "Chatbots Inteligentes",
    description: "Asistentes virtuales personalizados para atención al cliente 24/7 con comprensión contextual.",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Automatización",
    description: "Optimiza procesos repetitivos con flujos de trabajo inteligentes basados en IA.",
    color: "green",
  },
  {
    icon: Building2,
    title: "Soluciones MYPES",
    description: "Herramientas de IA accesibles para pequeñas y medianas empresas peruanas.",
    color: "orange",
  },
  {
    icon: Heart,
    title: "Salud",
    description: "Diagnóstico asistido por IA, gestión de pacientes y análisis predictivo médico.",
    color: "red",
  },
  {
    icon: GraduationCap,
    title: "Educación",
    description: "Plataformas de aprendizaje adaptativo personalizadas para cada estudiante.",
    color: "indigo",
  },
  {
    icon: Database,
    title: "Big Data",
    description: "Análisis de grandes volúmenes de datos para extraer insights valiosos de negocio.",
    color: "cyan",
  },
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Modelos predictivos y de clasificación entrenados con datos específicos del cliente.",
    color: "pink",
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", glow: "group-hover:shadow-blue-500/20" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30", glow: "group-hover:shadow-purple-500/20" },
  green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30", glow: "group-hover:shadow-green-500/20" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30", glow: "group-hover:shadow-orange-500/20" },
  red: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30", glow: "group-hover:shadow-red-500/20" },
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/30", glow: "group-hover:shadow-indigo-500/20" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30", glow: "group-hover:shadow-cyan-500/20" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/30", glow: "group-hover:shadow-pink-500/20" },
};

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector("#servicios");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" className="py-20 px-4 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center space-x-2 bg-brand-blue/10 border border-brand-blue/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-brand-blue" />
            <span className="text-sm text-gray-300">Nuestros Servicios</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">UQ AI</span>{" "}
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Soluciones de inteligencia artificial diseñadas para transformar tu negocio
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colors = colorClasses[service.color];
            
            return (
              <div
                key={index}
                className={`group glass ${colors.border} rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${colors.glow} ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div className={`${colors.bg} ${colors.text} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                {/* Hover Arrow */}
                <div className="mt-4 flex items-center text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Saber más</span>
                  <Sparkles className="w-4 h-4 ml-2" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}