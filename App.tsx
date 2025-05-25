import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from 'sonner-native';
import HomeScreen from "./screens/HomeScreen";
import CompleteProfileScreen from "./screens/CompleteProfileScreen";
import StudentProfileScreen from "./screens/StudentProfileScreen";
import ConsentScreen from "./screens/ConsentScreen";
import IntroTastesScreen from "./screens/IntroTastesScreen";
import TastesSelectionScreen from "./screens/TastesSelectionScreen";
import DynamicKeyScreen from "./screens/DynamicKeyScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PersonalizedQuestionScreen from "./screens/PersonalizedQuestionScreen";
import StoryTypesQuestionScreen from "./screens/StoryTypesQuestionScreen";
import TestCompletionScreen from "./screens/TestCompletionScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import SOSScreen from "./screens/SOSScreen";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
      <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
      <Stack.Screen name="Consent" component={ConsentScreen} />
      <Stack.Screen name="IntroTastes" component={IntroTastesScreen} />
      <Stack.Screen name="TastesSelection" component={TastesSelectionScreen} />
      <Stack.Screen name="DynamicKey" component={DynamicKeyScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="PersonalizedQuestion" component={PersonalizedQuestionScreen} />
      <Stack.Screen name="StoryTypesQuestion" component={StoryTypesQuestionScreen} />
      <Stack.Screen name="TestCompletion" component={TestCompletionScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="SOS" component={SOSScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Toaster />
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none"
  }
});
