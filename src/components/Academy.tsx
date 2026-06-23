"use client";

import { useState, useEffect } from "react";
import { GraduationCap, FlaskConical, BookOpen, Code, Brain, Sparkles, ArrowRight, Clock, Users, Award } from "lucide-react";

const courses = [
  {
    title: "Fundamentos de IA",
    description: "Aprende los conceptos básicos de inteligencia artificial, machine learning y deep learning.",
    level: "Principiante",
    duration: "40 horas",
    students: "1,200+",
    icon: Brain,
    color: "blue",
  },
  {
    title: "Chatbots con NLP",
    description: "Desarrolla chatbots inteligentes utilizando procesamiento de lenguaje natural.",
    level: "Intermedio",
    duration: "60 horas",
    students: "850+",
    icon: Sparkles,
    color: "purple",
  },
  {
    title: "Machine Learning Práctico",
    description: "Implementa modelos de ML desde cero con Python y TensorFlow.",
    level: "Avanzado",
    duration: "80 horas",
    students: "620+",
    icon: Code,
    color: "green",
  },
  {
    title: "Big Data Analytics",
    description: "Análisis de grandes volúmenes de datos con herramientas modernas.",
    level: "Intermedio",
    duration: "50 horas",
    students: "480+",
    icon: BookOpen,
    color: "orange",
  },
];

const projects = [
  {
    title: "Asistente Médico IA",
    description: "Sistema de diagnóstico preliminar basado en síntomas del paciente.",
    status: "En desarrollo",
    team: "5 investigadores",
    icon: FlaskConical,
    color: "red",
  },
  {
    title: "Predicción de Cultivos",
    description: "Modelo predictivo para optimizar cosechas en la sierra peruana.",
    status: "Completado",
    team: "3 investigadores",
    icon: FlaskConical,
    color: "green",
  },
  {
    title: "Chatbot Multilingüe",
    description: "Asistente virtual en español, quechua y aimara para servicios públicos.",
    status: "En pruebas",
    team: "4 investigadores",
    icon: FlaskConical,
    color: "purple",
  },
  {
    title: "Análisis de Sentimientos",
    description: "Monitoreo de redes sociales para detectar tendencias políticas.",
    status: "Completado",
    team: "2 investigadores",
    icon: FlaskConical,
    color: "blue",
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "group-hover:border-blue-500/50" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "group-hover:border-purple-500/50" },
  green: { bg: "bg-green-500/10", text: "text-green-400", border: "group-hover:border-green-500/50" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "group-hover:border-orange-500/50" },
  red: { bg: "bg-red-500/10", text: "text-red-400", border: "group-hover:border-red-500/50" },
};

const levelColors: Record<string, string> = {
  Principiante: "bg-green-500/20 text-green-400",
  Intermedio: "bg-yellow-500/20 text-yellow-400",
  Avanzado: "bg-red-500/20 text-red-400",
};

const statusColors: Record<string, string> = {
  Completado: "bg-green-500/20 text-green-400",
  "En desarrollo": "bg-blue-500/20 text-blue-400",
  "En pruebas": "bg-yellow-500/20 text-yellow-400",
};

export default function Academy() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"academy" | "lab">("academy");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector("#academia");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="academia" className="py-20 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Educación e Investigación</span>
          </div>
          
          {/* Tabs */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab("academy")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "academy"
                  ? "bg-brand-blue text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <GraduationCap className="w-5 h-5 inline-block mr-2" />
              UQ AI Academy
            </button>
            <button
              onClick={() => setActiveTab("lab")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "lab"
                  ? "bg-brand-purple text-white shadow-lg shadow-purple-500/30"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <FlaskConical className="w-5 h-5 inline-block mr-2" />
              UQ AI Lab
            </button>
          </div>
        </div>

        {/* Academy Content */}
        {activeTab === "academy" && (
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {courses.map((course, index) => {
                const Icon = course.icon;
                const colors = colorClasses[course.color];
                
                return (
                  <div
                    key={index}
                    className={`group glass border border-white/10 ${colors.border} rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${colors.bg} ${colors.text} w-14 h-14 rounded-xl flex items-center justify-center`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelColors[course.level]}`}>
                        {course.level}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students}
                        </span>
                      </div>
                    </div>
                    
                    <button className="mt-4 w-full bg-brand-blue/20 hover:bg-brand-blue text-brand-blue hover:text-white py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center">
                      Inscribirse
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Lab Content */}
        {activeTab === "lab" && (
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => {
                const Icon = project.icon;
                const colors = colorClasses[project.color];
                
                return (
                  <div
                    key={index}
                    className={`group glass border border-white/10 ${colors.border} rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${colors.bg} ${colors.text} w-14 h-14 rounded-xl flex items-center justify-center`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="w-4 h-4 mr-2" />
                      {project.team}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}