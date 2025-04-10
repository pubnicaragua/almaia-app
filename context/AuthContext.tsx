"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Aquí iría la lógica real de autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser({
        id: "1",
        name: "Usuario de Prueba",
        email,
      })
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Aquí iría la lógica real de registro
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser({
        id: "1",
        name,
        email,
      })
    } catch (error) {
      console.error("Error al registrarse:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const forgotPassword = async (email: string) => {
    setIsLoading(true)
    try {
      // Aquí iría la lógica real de recuperación de contraseña
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Error al solicitar recuperación de contraseña:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
