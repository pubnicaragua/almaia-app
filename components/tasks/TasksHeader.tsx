import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface TasksHeaderProps {
  title: string
  onSOSPress: () => void
  onAccessibilityPress: () => void
}

const TasksHeader = ({ title, onSOSPress, onAccessibilityPress }: TasksHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.sosButton} onPress={onSOSPress}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accessibilityButton} onPress={onAccessibilityPress}>
          <Ionicons name="accessibility" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sosButton: {
    backgroundColor: "#FF4757",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 10,
  },
  sosText: {
    color: "white",
    fontWeight: "bold",
  },
  accessibilityButton: {
    backgroundColor: "#2196F3",
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default TasksHeader
