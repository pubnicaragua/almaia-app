"use client"
import { useState } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
} from "react-native"
import { useAuth } from "context/AuthContext"
import { useNavigation } from "@react-navigation/native"
import { almiehello , bubblehello } from "@/indexsvfg"
import { SvgXml } from "react-native-svg"
import colors from "constants/colors"

const LoginScreen = () => {
  const navigation = useNavigation<any>()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

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
            <Text style={styles.loginButtonText}>{isLoading ? "Cargando..." : "Iniciar sesion"}</Text>
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
})

export default LoginScreen

// "use client"

// import { useState } from "react"
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
// } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import MessageBubble from "../../components/common/MessageBubble"
// import { useAuth } from "context/AuthContext"

// const LoginScreen = () => {
//   const navigation = useNavigation()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const { login } = useAuth()

//   // Función para iniciar sesión
//   const handleLogin = () => {
//     // Navegar directamente a la pantalla principal sin validaciones
//     // navigation.navigate("MainTabs")
//     login("1230","123")
//   }

//   // Nueva función para acceso directo a Home
//   const handleDirectAccess = () => {
//     // Navegar directamente a la pantalla principal sin validaciones
//     navigation.navigate("MainTabs")
//   }

//   const handleForgotPassword = () => {
//     navigation.navigate("ForgotPassword")
//   }

//   const handleRegister = () => {
//     navigation.navigate("Register")
//   }

//   // Funciones para navegar a las pantallas de verificación y perfil
//   const handleGoToVerification = () => {
//     navigation.navigate("VerificationCode")
//   }

//   const handleGoToCompleteProfile = () => {
//     navigation.navigate("CompleteProfile")
//   }

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.mascotContainer}>
//           <MessageBubble message="¡Hola! Soy Almie y te doy la bienvenida" />
//           <Image source={require("../../assets/icon.png")} style={styles.mascotImage} />
//         </View>

//         <View style={styles.formContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Correo"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Contraseña"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />

//           <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
//             <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
//             onPress={handleLogin}
//             disabled={isLoading}
//           >
//             <Text style={styles.loginButtonText}>{isLoading ? "Cargando..." : "Iniciar sesion"}</Text>
//           </TouchableOpacity>

//           {/* Nuevo botón de acceso directo */}
//           <TouchableOpacity style={styles.directAccessButton} onPress={handleDirectAccess}>
//             <Text style={styles.directAccessText}>ACCESO DIRECTO A HOME</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.registerContainer} onPress={handleRegister}>
//             <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
//           </TouchableOpacity>

//           {/* Botones para pruebas */}
//           <View style={styles.testButtonsContainer}>
//             <Text style={styles.testTitle}>Pantallas de prueba:</Text>
//             <TouchableOpacity style={styles.testButton} onPress={handleGoToVerification}>
//               <Text style={styles.testButtonText}>Verificación de código</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.testButton} onPress={handleGoToCompleteProfile}>
//               <Text style={styles.testButtonText}>Completar perfil</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#A9D4FB",
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: 30,
//   },
//   mascotContainer: {
//     alignItems: "center",
//     marginTop: 80,
//     marginBottom: 20,
//   },
//   mascotImage: {
//     width: 120,
//     height: 120,
//     resizeMode: "contain",
//   },
//   formContainer: {
//     paddingHorizontal: 30,
//     paddingTop: 20,
//   },
//   input: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   forgotPasswordContainer: {
//     alignItems: "flex-end",
//     marginBottom: 30,
//   },
//   forgotPasswordText: {
//     color: "#333",
//     fontSize: 14,
//   },
//   loginButton: {
//     backgroundColor: "#2196F3",
//     borderRadius: 30,
//     paddingVertical: 15,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   loginButtonDisabled: {
//     opacity: 0.7,
//   },
//   loginButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   // Estilos para el nuevo botón de acceso directo
//   directAccessButton: {
//     backgroundColor: "#FF9800", // Color naranja para destacar
//     borderRadius: 30,
//     paddingVertical: 15,
//     alignItems: "center",
//     marginBottom: 20,
//     borderWidth: 2,
//     borderColor: "#FFF",
//   },
//   directAccessText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   registerContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   registerText: {
//     color: "#333",
//     fontSize: 14,
//   },
//   // Estilos para los botones de prueba
//   testButtonsContainer: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: "rgba(255, 255, 255, 0.3)",
//     borderRadius: 10,
//   },
//   testTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   testButton: {
//     backgroundColor: "#64B5F6",
//     borderRadius: 10,
//     paddingVertical: 12,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   testButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// })

// export default LoginScreen
