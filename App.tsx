"use client"
<<<<<<< HEAD

import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import { AuthProvider, useAuth } from "./context/AuthContext"
import AuthNavigator from "./navigation/AuthNavigator"

// Pantallas principales
import HomeScreen from "./screens/HomeScreen"
import TasksScreen from "./screens/TasksScreen"
import ProfileScreen from "./screens/ProfileScreen"

// Pantallas de flujo emocional
=======
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { ToastProvider } from "./context/ToastContext"
import { ProfileProvider } from "./context/ProfileContext"

// Pantallas de autenticación
import LoginScreen from "./screens/auth/LoginScreen"
import RegisterScreen from "./screens/auth/RegisterScreen"
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen"
import VerificationCodeScreen from "./screens/auth/VerificationCodeScreen"
import CompleteProfileScreen from "./screens/auth/CompleteProfileScreen"

// Pantallas principales
import HomeScreen from "./screens/HomeScreen"
import ProfileScreen from "./screens/ProfileScreen"
import TasksScreen from "./screens/TasksScreen"

// Pantallas de registro de estado de ánimo
>>>>>>> c93316b (Update App AlmaIA)
import MoodSelectionScreen from "./screens/MoodSelectionScreen"
import EmotionDetailScreen from "./screens/EmotionDetailScreen"
import GoodDayFactorsScreen from "./screens/GoodDayFactorsScreen"
import DiaryEntryScreen from "./screens/DiaryEntryScreen"
import ThankYouScreen from "./screens/ThankYouScreen"
<<<<<<< HEAD
import TaskRegistrationScreen from "./screens/TaskRegistrationScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function MainTabs() {
=======

// Pantallas de SOS
import SOSHelpScreen from "./screens/SOSHelpScreen"
import SOSReportScreen from "./screens/SOSReportScreen"

// Pantallas de tareas
import TaskRegistrationScreen from "./screens/TaskRegistrationScreen"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

// Navegador de pestañas para las pantallas principales
const TabNavigator = () => {
>>>>>>> c93316b (Update App AlmaIA)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

<<<<<<< HEAD
          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Tareas") {
            iconName = focused ? "cube" : "cube-outline"
          } else if (route.name === "Yo") {
=======
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Tasks") {
            iconName = focused ? "list" : "list-outline"
          } else if (route.name === "Profile") {
>>>>>>> c93316b (Update App AlmaIA)
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
<<<<<<< HEAD
        tabBarActiveTintColor: "#2196F3",
=======
        tabBarActiveTintColor: "#4A80F0",
>>>>>>> c93316b (Update App AlmaIA)
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
<<<<<<< HEAD
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Tareas" component={TasksScreen} />
      <Tab.Screen name="Yo" component={ProfileScreen} />
=======
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Inicio" }} />
      <Tab.Screen name="Tasks" component={TasksScreen} options={{ title: "Tareas" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
>>>>>>> c93316b (Update App AlmaIA)
    </Tab.Navigator>
  )
}

<<<<<<< HEAD
function EmotionalFlowNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#A9D4FB" },
      }}
    >
      <Stack.Screen name="MoodSelection" component={MoodSelectionScreen} />
      <Stack.Screen name="EmotionDetail" component={EmotionDetailScreen} />
      <Stack.Screen name="GoodDayFactors" component={GoodDayFactorsScreen} />
      <Stack.Screen name="DiaryEntry" component={DiaryEntryScreen} />
      <Stack.Screen name="ThankYou" component={ThankYouScreen} />
      {/* <Stack.Screen name="TaskRegistration" component={TaskRegistrationScreen} /> */}
      <Stack.Screen name="MainTabs" component={MainTabs} />
=======
// Navegador de autenticación
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
>>>>>>> c93316b (Update App AlmaIA)
    </Stack.Navigator>
  )
}

<<<<<<< HEAD
function AppNavigator() {
  const { user } = useAuth()

  return user ? <EmotionalFlowNavigator /> : <AuthNavigator />
  // return <EmotionalFlowNavigator />
=======
// Navegador principal que decide entre autenticación y contenido principal
const RootNavigator = () => {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="MoodSelection" component={MoodSelectionScreen} />
            <Stack.Screen name="EmotionDetail" component={EmotionDetailScreen} />
            <Stack.Screen name="GoodDayFactors" component={GoodDayFactorsScreen} />
            <Stack.Screen name="DiaryEntry" component={DiaryEntryScreen} />
            <Stack.Screen name="ThankYou" component={ThankYouScreen} />
            <Stack.Screen name="SOSHelp" component={SOSHelpScreen} />
            <Stack.Screen name="SOSReport" component={SOSReportScreen} />
            <Stack.Screen name="TaskRegistration" component={TaskRegistrationScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
>>>>>>> c93316b (Update App AlmaIA)
}

export default function App() {
  return (
<<<<<<< HEAD
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
=======
    <ToastProvider>
      <AuthProvider>
        <ProfileProvider>
          <RootNavigator />
        </ProfileProvider>
      </AuthProvider>
    </ToastProvider>
>>>>>>> c93316b (Update App AlmaIA)
  )
}
