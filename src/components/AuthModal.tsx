'use client'

import { useState } from 'react'
import { X, User, Lock, Mail, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

type AuthMode = 'login' | 'register'

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, register } = useAuth()
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (mode === 'login') {
        const success = await login(formData.username, formData.password)
        if (success) {
          toast.success('¡Bienvenido de vuelta!')
          onClose()
          resetForm()
        } else {
          toast.error('Credenciales incorrectas')
        }
      } else {
        // Validaciones para registro
        if (formData.password !== formData.confirmPassword) {
          toast.error('Las contraseñas no coinciden')
          setIsLoading(false)
          return
        }
        
        if (formData.password.length < 6) {
          toast.error('La contraseña debe tener al menos 6 caracteres')
          setIsLoading(false)
          return
        }

        const success = await register(formData.username, formData.email, formData.password)
        if (success) {
          toast.success('¡Cuenta creada exitosamente!')
          onClose()
          resetForm()
        } else {
          toast.error('Error al crear la cuenta. El usuario ya existe.')
        }
      }
    } catch {
      toast.error('Error en la operación')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    setShowPassword(false)
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    resetForm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-black border border-white/20 rounded-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-xl font-bold text-white flex items-center">
            {mode === 'login' ? (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Acceder a IMPCORE
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5 mr-2" />
                Registrarte en IMPCORE
              </>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white text-white placeholder-white/40"
                  placeholder="Nombre de usuario"
                  required
                />
              </div>
            </div>

            {/* Email - Solo en registro */}
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white text-white placeholder-white/40"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white text-white placeholder-white/40"
                  placeholder="Contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password - Solo en registro */}
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white text-white placeholder-white/40"
                    placeholder="Confirmar contraseña"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                  {mode === 'login' ? 'Iniciando...' : 'Creando cuenta...'}
                </>
              ) : (
                mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={switchMode}
              className="text-white/60 hover:text-white transition-colors text-sm underline"
            >
              {mode === 'login' 
                ? '¿No tienes cuenta? Regístrate aquí' 
                : '¿Ya tienes cuenta? Accede aquí'
              }
            </button>
          </div>

          {/* Admin Note */}
          {mode === 'register' && (
            <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-xs text-white/60 text-center">
                Las cuentas nuevas se crean como usuarios regulares. 
                Para acceso de administrador contacta al equipo de IMPCORE.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}