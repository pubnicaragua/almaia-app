import { StyleSheet, View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface Task {
  id: number
  subject: string
  description: string
  dueDate: string
  color: string
}

interface TaskItemProps {
  task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.subjectContainer, { backgroundColor: task.color }]}>
        <Text style={styles.subjectText}>{task.subject}</Text>
      </View>
      <View style={[styles.descriptionContainer, { backgroundColor: lightenColor(task.color, 0.7) }]}>
        <Text style={styles.descriptionText}>{task.description}</Text>
        <View style={styles.dueDateContainer}>
          <Ionicons name="time-outline" size={16} color="#555" />
          <Text style={styles.dueDateText}>{task.dueDate}</Text>
        </View>
      </View>
    </View>
  )
}

// Función para aclarar un color (simulando rgba con opacidad)
const lightenColor = (color: string, factor: number) => {
  // Esta es una implementación simple para aclarar colores
  // En una app real, podrías usar una biblioteca como 'color'
  const r = Number.parseInt(color.slice(1, 3), 16)
  const g = Number.parseInt(color.slice(3, 5), 16)
  const b = Number.parseInt(color.slice(5, 7), 16)

  const lightenValue = (value: number) => Math.round(value + (255 - value) * factor)

  const rNew = lightenValue(r)
  const gNew = lightenValue(g)
  const bNew = lightenValue(b)

  return `#${rNew.toString(16).padStart(2, "0")}${gNew.toString(16).padStart(2, "0")}${bNew.toString(16).padStart(2, "0")}`
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  subjectContainer: {
    padding: 15,
    alignItems: "center",
  },
  subjectText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  descriptionContainer: {
    padding: 15,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  dueDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  dueDateText: {
    marginLeft: 5,
    color: "#555",
    fontSize: 14,
  },
})

export default TaskItem
