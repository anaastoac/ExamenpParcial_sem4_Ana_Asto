'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  LogOut, 
  Users, 
  User, 
  Database,
  Lock,
  Crown,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { jwtSecret, verifyJWT, JWTPayload } from '@/lib/auth';

interface Lead {
  id: string;
  nombre: string;
  email: string;
  empresa: string;
  telefono: string;
  mensaje: string;
  fecha: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<JWTPayload | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Verificar autenticación al cargar
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch('/api/auth/login');
        const data = await response.json();
        
        if (!data.authenticated) {
          router.push('/login');
          return;
        }
        
        setUser(data.user as JWTPayload);
        setIsLoading(false);
        
        // Si es ADMIN, cargar leads
        if ((data.user as JWTPayload).role === 'ADMIN') {
          fetchLeads();
        }
      } catch (error) {
        console.error('Error verificando auth:', error);
        router.push('/login');
      }
    };
    
    verifyAuth();
  }, [router]);

  // Cargar leads para ADMIN
  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      }
    } catch (error) {
      console.error('Error cargando leads:', error);
    }
  };

  // Manejar logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Eliminar cookie en el servidor
      await fetch('/api/auth/logout', { method: 'POST' });
      
      // Limpiar cualquier estado local
      setUser(null);
      setLeads([]);
      
      // Redirigir a login
      router.push('/login');
    } catch (error) {
      console.error('Error en logout:', error);
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isAdmin = user.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">UQ AI Solutions</h1>
                <p className="text-xs text-slate-400">Panel de Control</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Indicador de rol */}
              <div className={`
                px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1
                ${isAdmin 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}
              `}>
                {isAdmin ? <Crown className="w-3 h-3" /> : <User className="w-3 h-3" />}
                {isAdmin ? 'ADMINISTRADOR' : 'USUARIO'}
              </div>
              
              {/* Botón de logout */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                <span className="text-sm">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bienvenida */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Bienvenido, {user.nombre}
          </h2>
          <p className="text-slate-400">
            {isAdmin 
              ? 'Tienes acceso completo al sistema de gestión de leads.'
              : 'Puedes ver tu información de perfil.'}
          </p>
        </div>

        {/* Perfil del usuario */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Información del Perfil</h3>
              <p className="text-sm text-slate-400">Tus datos de usuario</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4">
              <label className="text-xs text-slate-500 uppercase tracking-wider">Email</label>
              <p className="text-white font-medium mt-1">{user.email}</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4">
              <label className="text-xs text-slate-500 uppercase tracking-wider">ID de Usuario</label>
              <p className="text-white font-medium mt-1">{user.userId}</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4">
              <label className="text-xs text-slate-500 uppercase tracking-wider">Rol</label>
              <p className={`font-medium mt-1 ${isAdmin ? 'text-purple-400' : 'text-blue-400'}`}>
                {isAdmin ? 'Administrador' : 'Usuario'}
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4">
              <label className="text-xs text-slate-500 uppercase tracking-wider">Sesión</label>
              <p className="text-green-400 font-medium mt-1 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Activa
              </p>
            </div>
          </div>
        </div>

        {/* Panel de ADMIN: Gestión de Leads */}
        {isAdmin && (
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Gestión de Leads</h3>
                  <p className="text-sm text-slate-400">Lista completa de contactos</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Users className="w-4 h-4" />
                {leads.length} registros
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="text-center py-12">
                <Database className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No hay leads registrados</p>
                <p className="text-sm text-slate-500 mt-1">Los contactos del formulario aparecerán aquí</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Nombre</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Empresa</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Teléfono</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                        <td className="py-3 px-4 text-white">{lead.nombre}</td>
                        <td className="py-3 px-4 text-slate-300">{lead.email}</td>
                        <td className="py-3 px-4 text-slate-300">{lead.empresa}</td>
                        <td className="py-3 px-4 text-slate-300">{lead.telefono}</td>
                        <td className="py-3 px-4 text-slate-400 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(lead.fecha).toLocaleDateString('es-ES')}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Panel de USER: Solo información del perfil */}
        {!isAdmin && (
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Acceso Restringido</h3>
                <p className="text-sm text-slate-400">Solo administradores pueden ver leads</p>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-blue-400">
              <p className="text-sm">
                Tu rol actual es <strong>USUARIO</strong>, por lo tanto no tienes acceso a la gestión de leads.
                Contacta a un administrador si necesitas permisos adicionales.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
