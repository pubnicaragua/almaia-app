import { StyleSheet, View, Text, Animated, Easing } from "react-native";
import { almiefittnessvg, almiefittneshandsvg } from "@/indexsvfg";
import { SvgXml } from "react-native-svg";
import { useEffect, useRef } from "react";

interface MascotMessageProps {
  message: string;
  points: number;
}

const MascotMessage = ({ message, points }: MascotMessageProps) => {
  // Creamos una referencia para el valor animado
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Configuramos la animación de rotación
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Interpolamos el valor para la rotación (-20° a 20°)
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-15deg", "15deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
        <SvgXml
          xml={almiefittnessvg}
          style={{ transform: [{ scale: 1.3 }], marginRight: 45 }}
        />
        <Animated.View
          style={[styles.animatedhand, { transform: [{ rotate: rotation }, { scale: 1.25 }] }]}
        >
          <SvgXml xml={almiefittneshandsvg} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
    position: "relative",
  },
  messageContainer: {
    alignItems: "center",
  },
  messageBubble: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    width: "100%",
  },
  messageText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  animatedhand: {
    position: "absolute",
    bottom: 50,
    right: 20,
    transform: [

      { perspective: 1000 },
    ],
    marginRight: 45,
  }
});

export default MascotMessage;