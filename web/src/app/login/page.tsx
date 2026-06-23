'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Loader2, AlertCircle } from 'lucide-react';

interface LoginForm {
  email: string;
  password: string;
}

interface LoginState {
  isLoading: boolean;
  error: string | null;
  attempts: number;
  isLocked: boolean;
  lockTimeRemaining: number;
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    error: null,
    attempts: 0,
    isLocked: false,
    lockTimeRemaining: 0,
  });

  // Manejar el temporizador de bloqueo
  useEffect(() => {
    if (state.lockTimeRemaining > 0) {
      const timer = setTimeout(() => {
        setState(prev => ({
          ...prev,
          lockTimeRemaining: prev.lockTimeRemaining - 1,
        }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (state.isLocked) {
      setState(prev => ({ ...prev, isLocked: false }));
    }
  }, [state.lockTimeRemaining, state.isLocked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (state.isLocked) {
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        const newAttempts = state.attempts + 1;
        
        if (newAttempts >= 3) {
          setState({
            isLoading: false,
            error: 'Credenciales incorrectas',
            attempts: newAttempts,
            isLocked: true,
            lockTimeRemaining: 30,
          });
        } else {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: 'Credenciales incorrectas',
            attempts: newAttempts,
          }));
        }
        return;
      }

      // Login exitoso - redirigir al dashboard
      router.push('/dashboard');
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Error de conexión. Intenta nuevamente.',
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/25">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">UQ AI Solutions</h1>
          <p className="text-slate-400">Acceso Seguro al Panel</p>
        </div>

        {/* Formulario */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={state.isLocked || state.isLoading}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="admin@uqai.com"
              />
            </div>

            {/* Campo Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={state.isLocked || state.isLoading}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
            </div>

            {/* Mensaje de error */}
            {state.error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{state.error}</span>
              </div>
            )}

            {/* Indicador de bloqueo */}
            {state.isLocked && (
              <div className="text-center text-sm text-orange-400">
                Acceso bloqueado. Intenta en {state.lockTimeRemaining} segundos.
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={state.isLocked || state.isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
            >
              {state.isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : state.isLocked ? (
                <span>Bloqueado ({state.lockTimeRemaining}s)</span>
              ) : (
                <span>Iniciar Sesión</span>
              )}
            </button>
          </form>

          {/* Enlace de regreso */}
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          Sistema protegido con autenticación JWT
        </p>
      </div>
    </div>
  );
}
