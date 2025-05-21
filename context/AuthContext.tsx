"use client"

import { createContext, useState, useContext, type ReactNode, useEffect, useRef } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_ENDPOINTS, fetchApi, getAuthToken, isTokenValid, AUTH_TOKEN_KEY, USER_DATA_KEY } from "../config/api"
import { useToast } from "./ToastContext"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  clearError: () => void
  checkTokenValidity: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showToast } = useToast()

  // Referencia para el intervalo de verificación del token
  const tokenCheckIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Función para verificar la validez del token
  const checkTokenValidity = async (): Promise<boolean> => {
    try {
      const token = await getAuthToken()
      const isValid = await isTokenValid(token)

      if (!isValid && user) {
        // Si el token no es válido y hay un usuario logueado, cerrar sesión
        console.log("🔑 Token expirado, cerrando sesión automáticamente")
        await logout(false) // No mostrar toast en este caso
        return false
      }

      return isValid
    } catch (error) {
      console.error("Error al verificar la validez del token:", error)
      return false
    }
  }

  // Cargar el usuario desde AsyncStorage al iniciar la aplicación
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        // Verificar si el token es válido
        const token = await getAuthToken()
        const isValid = await isTokenValid(token)

        if (!isValid) {
          // Si el token no es válido, limpiar los datos almacenados
          await AsyncStorage.removeItem(AUTH_TOKEN_KEY)
          await AsyncStorage.removeItem(USER_DATA_KEY)
          setUser(null)
          return
        }

        // Si el token es válido, cargar los datos del usuario
        const userDataString = await AsyncStorage.getItem(USER_DATA_KEY)
        if (userDataString) {
          const userData = JSON.parse(userDataString)
          setUser(userData)
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error)
      }
    }

    loadUserFromStorage()
  }, [])

  // Configurar el intervalo para verificar la validez del token
  useEffect(() => {
    // Verificar el token cada 5 minutos (ajusta según tus necesidades)
    const startTokenCheck = () => {
      tokenCheckIntervalRef.current = setInterval(
        async () => {
          console.log("🔄 Verificando validez del token...")
          await checkTokenValidity()
        },
        5 * 60 * 1000,
      ) // 5 minutos
    }

    if (user) {
      startTokenCheck()
    }

    return () => {
      // Limpiar el intervalo cuando el componente se desmonte
      if (tokenCheckIntervalRef.current) {
        clearInterval(tokenCheckIntervalRef.current)
      }
    }
  }, [user])

  const clearError = () => {
    setError(null)
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log(`🔐 Intentando iniciar sesión con: ${email}`)

      // Llamada a la API real
      const response = await fetchApi(API_ENDPOINTS.LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      console.log("✅ Login exitoso, respuesta:", response)

      // Guardar el token en AsyncStorage
      if (response.token) {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.token)

        // Por ahora, crearemos un usuario básico con la información disponible
        // En una implementación real, podrías hacer otra llamada a la API para obtener los detalles del usuario
        const userData = {
          id: "1", // Este ID debería venir de la API
          name: email.split("@")[0], // Usamos la parte del email antes del @ como nombre temporal
          email,
        }

        // Guardar los datos del usuario en AsyncStorage
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))

        setUser(userData)
        showToast("Inicio de sesión exitoso", "success")
      } else {
        throw new Error("No se recibió un token válido")
      }
    } catch (error: any) {
      console.error("❌ Error al iniciar sesión:", error)
      const errorMessage = error.message || "Error al iniciar sesión. Verifica tus credenciales."
      setError(errorMessage)
      showToast(errorMessage, "error")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Aquí iría la lógica real de registro con la API
      // Por ahora, mantenemos la simulación
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData = {
        id: "1",
        name,
        email,
      }

      setUser(userData)
      showToast("Registro exitoso", "success")

      // Guardar los datos del usuario en AsyncStorage
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
    } catch (error: any) {
      console.error("Error al registrarse:", error)
      const errorMessage = error.message || "Error al registrarse. Inténtalo de nuevo."
      setError(errorMessage)
      showToast(errorMessage, "error")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (showNotification = true) => {
    try {
      // Eliminar el token y los datos del usuario de AsyncStorage
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY)
      await AsyncStorage.removeItem(USER_DATA_KEY)
      setUser(null)

      // Limpiar el intervalo de verificación del token
      if (tokenCheckIntervalRef.current) {
        clearInterval(tokenCheckIntervalRef.current)
        tokenCheckIntervalRef.current = null
      }

      if (showNotification) {
        showToast("Sesión cerrada correctamente", "info")
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      if (showNotification) {
        showToast("Error al cerrar sesión", "error")
      }
    }
  }

  const forgotPassword = async (email: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Aquí iría la lógica real de recuperación de contraseña con la API
      // Por ahora, mantenemos la simulación
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showToast("Se ha enviado un correo para recuperar tu contraseña", "success")
    } catch (error: any) {
      console.error("Error al solicitar recuperación de contraseña:", error)
      const errorMessage = error.message || "Error al solicitar recuperación de contraseña. Inténtalo de nuevo."
      setError(errorMessage)
      showToast(errorMessage, "error")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        clearError,
        checkTokenValidity,
      }}
    >
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
