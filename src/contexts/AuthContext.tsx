'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'guest' | 'user' | 'admin'

export interface User {
  id: string
  username: string
  email?: string
  role: UserRole
  loginTime: number
  expires: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isLoggedIn: boolean
  isAdmin: boolean
  isUser: boolean
  login: (username: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  checkSession: () => void
}

interface StoredUser {
  id: string
  username: string
  password: string
  role: UserRole
  email: string
}

// Base de datos de usuarios (en producción esto estaría en una base de datos)
const USERS_DB: Record<string, StoredUser> = {
  // Administradores
  admin: {
    id: 'admin-1',
    username: 'admin',
    password: 'admin123',
    role: 'admin' as UserRole,
    email: 'admin@impcore.com'
  },
  impcore: {
    id: 'admin-2', 
    username: 'impcore',
    password: 'impcore2024',
    role: 'admin' as UserRole,
    email: 'contact@impcore.com'
  },
  // Usuarios regulares (para cursos, contenido premium, etc.)
  user1: {
    id: 'user-1',
    username: 'producer1',
    password: 'producer123',
    role: 'user' as UserRole,
    email: 'producer1@example.com'
  },
  member: {
    id: 'user-2',
    username: 'member',
    password: 'member123', 
    role: 'user' as UserRole,
    email: 'member@example.com'
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkSession = () => {
    try {
      setIsLoading(true)
      
      const sessionData = localStorage.getItem('impcore_auth_session')
      
      if (sessionData) {
        const session: User = JSON.parse(sessionData)
        const now = Date.now()
        
        // Verificar si la sesión no ha expirado
        if (now < session.expires) {
          setUser(session)
        } else {
          // Sesión expirada
          localStorage.removeItem('impcore_auth_session')
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking session:', error)
      localStorage.removeItem('impcore_auth_session')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkSession()
    
    // Verificar sesión cada 5 minutos
    const interval = setInterval(checkSession, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // Buscar usuario en la "base de datos"
      const foundUser = Object.values(USERS_DB).find(
        u => u.username === username && u.password === password
      )
      
      // También buscar en usuarios registrados dinámicamente
      const registeredUsers: Record<string, StoredUser> = JSON.parse(localStorage.getItem('impcore_registered_users') || '{}')
      const registeredUser = Object.values(registeredUsers).find(
        (u) => u.username === username && u.password === password
      )
      
      const user = foundUser || registeredUser
      
      if (user) {
        const now = Date.now()
        const sessionUser: User = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          loginTime: now,
          expires: now + (24 * 60 * 60 * 1000) // 24 horas
        }
        
        // Guardar sesión
        localStorage.setItem('impcore_auth_session', JSON.stringify(sessionUser))
        setUser(sessionUser)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // Verificar si el usuario ya existe
      const existingUser = Object.values(USERS_DB).find(u => u.username === username)
      const registeredUsers: Record<string, StoredUser> = JSON.parse(localStorage.getItem('impcore_registered_users') || '{}')
      const existingRegistered = Object.values(registeredUsers).find((u) => u.username === username)
      
      if (existingUser || existingRegistered) {
        return false // Usuario ya existe
      }
      
      // Crear nuevo usuario
      const newUser = {
        id: `user-${Date.now()}`,
        username,
        email,
        password,
        role: 'user' as UserRole,
        createdAt: Date.now()
      }
      
      // Guardar en localStorage (en producción sería en base de datos)
      registeredUsers[username] = newUser
      localStorage.setItem('impcore_registered_users', JSON.stringify(registeredUsers))
      
      // Loguear automáticamente después del registro
      const now = Date.now()
      const sessionUser: User = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        loginTime: now,
        expires: now + (24 * 60 * 60 * 1000)
      }
      
      localStorage.setItem('impcore_auth_session', JSON.stringify(sessionUser))
      setUser(sessionUser)
      return true
    } catch (error) {
      console.error('Register error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Limpiar todas las sesiones posibles
    localStorage.removeItem('impcore_auth_session')
    localStorage.removeItem('impcore_admin')
    localStorage.removeItem('impcore_user_session')
    localStorage.removeItem('authToken')
    localStorage.removeItem('user_session')
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isLoggedIn: !!user,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user' || user?.role === 'admin',
    login,
    register,
    logout,
    checkSession
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Hook backward compatible para admin
export function useAdmin() {
  const { isAdmin, logout, isLoading } = useAuth()
  return { isAdmin, logout, isLoading }
}