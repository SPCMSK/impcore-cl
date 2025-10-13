'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User, Eye, EyeOff, ShieldCheck, Users, BookOpen } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

type LoginType = 'admin' | 'user'

export default function LoginPage() {
  const { login, isLoggedIn, user } = useAuth()
  const router = useRouter()
  const [loginType, setLoginType] = useState<LoginType>('admin')
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Credenciales de demostración
  const demoCredentials = {
    admin: [
      { username: 'admin', password: 'admin123', label: 'Administrador Principal' },
      { username: 'impcore', password: 'impcore2024', label: 'IMPCORE Admin' }
    ],
    user: [
      { username: 'member', password: 'member123', label: 'Usuario Miembro' },
      { username: 'producer1', password: 'producer123', label: 'Productor Premium' }
    ]
  }

  useEffect(() => {
    if (isLoggedIn && user) {
      if (user.role === 'admin') {
        router.push('/admin/dashboard')
      } else if (user.role === 'user') {
        router.push('/dashboard')
      }
    }
  }, [isLoggedIn, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(credentials.username, credentials.password)
      
      if (success) {
        toast.success('¡Login exitoso!')
        // La redirección se maneja en el useEffect
      } else {
        toast.error('Credenciales incorrectas')
      }
    } catch {
      toast.error('Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  const fillCredentials = (username: string, password: string) => {
    setCredentials({ username, password })
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Redirigiendo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">IMPCORE Access</h1>
          <p className="text-foreground/60">
            Accede a tu dashboard y contenido exclusivo
          </p>
        </div>

        {/* Login Type Selector */}
        <div className="flex bg-card border border-accent/20 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setLoginType('admin')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginType === 'admin'
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            Administrador
          </button>
          <button
            type="button"
            onClick={() => setLoginType('user')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginType === 'user'
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            <Users className="h-4 w-4 mr-2" />
            Usuario
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="bg-card border border-accent/20 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Credenciales de Demo - {loginType === 'admin' ? 'Administradores' : 'Usuarios'}
          </h3>
          <div className="space-y-2">
            {demoCredentials[loginType].map((cred, index) => (
              <button
                key={index}
                type="button"
                onClick={() => fillCredentials(cred.username, cred.password)}
                className="w-full text-left p-2 rounded-md bg-accent/5 hover:bg-accent/10 transition-colors border border-accent/10"
              >
                <div className="text-sm font-medium text-foreground">{cred.label}</div>
                <div className="text-xs text-foreground/60">
                  {cred.username} / {cred.password}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
              Usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-card border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-foreground placeholder-foreground/40"
                placeholder="Nombre de usuario"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 bg-card border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-foreground placeholder-foreground/40"
                placeholder="Contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !credentials.username || !credentials.password}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              loginType === 'admin'
                ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Iniciando sesión...
              </>
            ) : (
              `Iniciar Sesión como ${loginType === 'admin' ? 'Administrador' : 'Usuario'}`
            )}
          </button>
        </form>

        {/* Back to Website */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-foreground/60 hover:text-accent transition-colors"
          >
            ← Volver al sitio web
          </button>
        </div>
      </div>
    </div>
  )
}