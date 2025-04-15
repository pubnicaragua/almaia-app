"use client"
import { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native"
import { useAuth } from "context/AuthContext"
import { useNavigation } from "@react-navigation/native"
import { almiehello, bubblehello, animatedHandsvg } from "@/indexsvfg"
import { SvgXml } from "react-native-svg"
import colors from "constants/colors"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing
} from "react-native-reanimated"

const LoginScreen = () => {
  const navigation = useNavigation<any>()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  // Animación de la mano
  const rotation = useSharedValue(0)

  const animatedHandStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: 1.7 },
        { rotate: `${rotation.value}deg` }
      ],
    }
  })

  // Iniciar animación cuando el componente se monta
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(15, {
        duration: 1000,
        easing: Easing.inOut(Easing.quad)
      }),
      -1, // Repetir infinitamente
      true // Reversar la animación
    )
  }, [])

  const handleLogin = () => {
    if (!email || !password) {
      // Mostrar error
      return
    }
    setIsLoading(true)

    setTimeout(() => {
      login(email, password)
      setIsLoading(false)
      // Navegar a la pantalla principal
    }, 1500)
  }

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword")
  }

  const handleRegister = () => {
    navigation.navigate("Register")
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.mascotContainer}>
          <SvgXml xml={bubblehello} style={{ transform: [{ scale: 1.5 }], marginBottom: 60 }} />
          <SvgXml xml={almiehello} style={{ transform: [{ scale: 1.5 }], marginRight: 45 }} />
          <Animated.View style={[styles.animatedhand, animatedHandStyle]}>
            <SvgXml xml={animatedHandsvg} />
          </Animated.View>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>{isLoading ? "Cargando..." : "Iniciar Sesión"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerContainer} onPress={handleRegister}>
            <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  mascotContainer: {
    position: "relative",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: "#333",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: colors.primaryBlueStrong,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    alignItems: "center",
  },
  registerText: {
    color: "#333",
    fontSize: 14,
  },
  animatedhand: {
    position: "absolute",
    right: 65,
    bottom: 50,
  }
})

export default LoginScreen