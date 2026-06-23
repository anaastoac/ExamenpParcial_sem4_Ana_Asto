"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";

interface FormData {
  nombre: string;
  email: string;
  empresa: string;
  telefono: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  empresa?: string;
  telefono?: string;
  mensaje?: string;
}

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    empresa: "",
    telefono: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector("#contacto");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un email válido";
    }

    if (!formData.empresa.trim()) {
      newErrors.empresa = "La empresa es requerida";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!/^\+?[0-9]{9,15}$/.test(formData.telefono.replace(/\s/g, ""))) {
      newErrors.telefono = "Ingresa un número válido";
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Usar la API de Next.js (en el mismo dominio) o fallback a variable de entorno
      const apiUrl = typeof window !== 'undefined' ? '/api' : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api");
      await axios.post(`${apiUrl}/leads`, formData);
      setSubmitStatus("success");
      setFormData({
        nombre: "",
        email: "",
        empresa: "",
        telefono: "",
        mensaje: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center space-x-2 bg-brand-blue/10 border border-brand-blue/30 rounded-full px-4 py-2 mb-6">
            <Mail className="w-4 h-4 text-brand-blue" />
            <span className="text-sm text-gray-300">Contáctanos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">¿Listo para</span>{" "}
            <span className="gradient-text">transformar tu negocio?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Completa el formulario y uno de nuestros expertos se pondrá en contacto contigo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="space-y-8">
              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Información de contacto</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Dirección</h4>
                      <p className="text-gray-400">Av. Javier Prado 1234, Lima, Perú</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Teléfono</h4>
                      <p className="text-gray-400">+51 1 234 5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Email</h4>
                      <p className="text-gray-400">contacto@uqai.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Horarios de atención</h3>
                <div className="space-y-2 text-gray-400">
                  <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                  <p>Sábados: 9:00 AM - 1:00 PM</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-white/10">
              <div className="space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`input-field ${errors.nombre ? "border-red-500" : ""}`}
                    placeholder="Juan Pérez"
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-sm text-red-400">{errors.nombre}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${errors.email ? "border-red-500" : ""}`}
                    placeholder="juan@empresa.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Empresa */}
                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-gray-300 mb-2">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className={`input-field ${errors.empresa ? "border-red-500" : ""}`}
                    placeholder="Mi Empresa S.A.C."
                  />
                  {errors.empresa && (
                    <p className="mt-1 text-sm text-red-400">{errors.empresa}</p>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`input-field ${errors.telefono ? "border-red-500" : ""}`}
                    placeholder="+51 999 123 456"
                  />
                  {errors.telefono && (
                    <p className="mt-1 text-sm text-red-400">{errors.telefono}</p>
                  )}
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-300 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleChange}
                    className={`input-field resize-none ${errors.mensaje ? "border-red-500" : ""}`}
                    placeholder="Cuéntanos sobre tu proyecto o necesidades..."
                  />
                  {errors.mensaje && (
                    <p className="mt-1 text-sm text-red-400">{errors.mensaje}</p>
                  )}
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center space-x-2 text-green-400 bg-green-400/10 rounded-lg p-4">
                    <CheckCircle className="w-5 h-5" />
                    <span>¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 rounded-lg p-4">
                    <AlertCircle className="w-5 h-5" />
                    <span>Hubo un error al enviar el mensaje. Por favor intenta de nuevo.</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue hover:bg-blue-600 disabled:bg-brand-blue/50 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-blue-500/30 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Enviar mensaje</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}