"use client"
<<<<<<< HEAD
import { useRef, useEffect } from "react"
import { StyleSheet, View, Text, Animated, ScrollView } from "react-native"
=======
import { StyleSheet, View, Text, ScrollView } from "react-native"
>>>>>>> c93316b (Update App AlmaIA)
import { useNavigation } from "@react-navigation/native"
import BackButton from "../components/common/BackButton"
import CloseButton from "../components/common/CloseButton"
import ProgressBar from "../components/common/ProgressBar"
import ContinueButton from "../components/common/ContinueButton"
import CelebratingMascot from "../components/thank-you/CelebratingMascot"
import MessageBubble from "../components/common/MessageBubble"

const ThankYouScreen = () => {
  const navigation = useNavigation()
<<<<<<< HEAD
  const slideAnim = useRef(new Animated.Value(300)).current // Comienza fuera de la pantalla

  useEffect(() => {
    // Animar la entrada de la pantalla
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [])

  const handleBack = () => {
    // Animar la salida de la pantalla
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack()
    })
=======

  const handleBack = () => {
    navigation.goBack()
>>>>>>> c93316b (Update App AlmaIA)
  }

  const handleClose = () => {
    navigation.navigate("MainTabs")
  }

  const handleContinue = () => {
<<<<<<< HEAD
    // Animar la salida de la pantalla hacia la izquierda
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Navegar a la pantalla principal (Home)
      navigation.navigate("MainTabs", { screen: "Inicio" })
    })
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
=======
    navigation.navigate("MainTabs", { screen: "Inicio" })
  }

  return (
    <View style={styles.container}>
>>>>>>> c93316b (Update App AlmaIA)
      <View style={styles.header}>
        <BackButton onPress={handleBack} />
        <CloseButton onPress={handleClose} />
      </View>

      <ProgressBar progress={1.0} />

      <ScrollView contentContainerStyle={styles.content}>
        <MessageBubble message="¡Muchas gracias por responder!" />

        <CelebratingMascot />

        <View style={styles.messageContainer}>
          <Text style={styles.message}>Gracias por compartir conmigo cómo te sientes.</Text>

          <Text style={styles.message}>
            Reflexionar sobre tu día y expresar tus emociones te ayuda a conocerte mejor.
          </Text>

          <Text style={styles.message}>Recuerda que siempre estaré aquí para escucharte cuando lo necesites.</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <ContinueButton onPress={handleContinue} />
      </View>
<<<<<<< HEAD
    </Animated.View>
=======
    </View>
>>>>>>> c93316b (Update App AlmaIA)
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9D4FB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 40, // Para dar espacio a la barra de estado
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  messageContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  message: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 24,
  },
  footer: {
    padding: 20,
  },
})

export default ThankYouScreen
