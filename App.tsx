"use client"

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
import MoodSelectionScreen from "./screens/MoodSelectionScreen"
import EmotionDetailScreen from "./screens/EmotionDetailScreen"
import GoodDayFactorsScreen from "./screens/GoodDayFactorsScreen"
import DiaryEntryScreen from "./screens/DiaryEntryScreen"
import ThankYouScreen from "./screens/ThankYouScreen"
import TaskRegistrationScreen from "./screens/TaskRegistrationScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Tareas") {
            iconName = focused ? "cube" : "cube-outline"
          } else if (route.name === "Yo") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Tareas" component={TasksScreen} />
      <Tab.Screen name="Yo" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

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
    </Stack.Navigator>
  )
}

function AppNavigator() {
  const { user } = useAuth()

  return user ? <EmotionalFlowNavigator /> : <AuthNavigator />
  // return <EmotionalFlowNavigator />
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
