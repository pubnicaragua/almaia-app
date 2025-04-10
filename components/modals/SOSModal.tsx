"use client"
import { useRef, useEffect } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Modal, Animated, Image, Easing, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { SvgXml } from "react-native-svg"
import { almialertsvg, almisossvg } from "@/indexsvfg"

interface SOSModalProps {
  visible: boolean
  onClose: () => void
  onRequestHelp: () => void
  onReport: () => void
}

const SOSModal = ({ visible, onClose, onRequestHelp, onReport }: SOSModalProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(500)).current

  useEffect(() => {
    if (visible) {
      // Animación de entrada
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 500,
          duration: 600,
          easing: Easing.bezier(0.42, 0, 1, 1), // Curva bezier con aceleración
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible])

  return (
    <Modal visible={visible} transparent animationType="none">
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
      />
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.helpOption} onPress={onRequestHelp}>
              <View style={styles.helpTextContainer}>
                <Text style={styles.helpTitle}>Busquemos</Text>
                <Text style={styles.helpHighlight}>ayuda</Text>
                <Text style={styles.helpTitle}>juntos</Text>
              </View>
              <View style={styles.helpImageContainer}>
                <SvgXml xml={almisossvg} height="100%" style={{ transform: [{ scale: 1.5 }] }} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.reportOption} onPress={onReport}>
              <View style={styles.reportImageContainer}>
                <SvgXml xml={almialertsvg} style={{ transform: [{ scale: 1.5 }] }} />
              </View>
              <View style={styles.reportTextContainer}>
                <Text style={styles.reportQuestion}>¿Pasa algo?</Text>
                <Text style={styles.reportAction}>Denunciemoslo</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
    position: "relative",
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 45,
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    borderWidth: .5
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  helpOption: {
    backgroundColor: "#FF4757",
    borderRadius: 15,
    // padding: 20,
    paddingLeft: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  helpTextContainer: {
    flex: 1,
  },
  helpTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  helpHighlight: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  helpImageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mascotImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  reportOption: {
    backgroundColor: "#5F399F",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  reportImageContainer: {
    marginRight: 20,
  },
  reportImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  reportTextContainer: {
    flex: 1,
  },
  reportQuestion: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  reportAction: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
})

export default SOSModal
