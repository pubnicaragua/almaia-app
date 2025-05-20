import { View, Text, StyleSheet, FlatList } from "react-native"
import TaskItem from "./TaskItem"

interface Task {
  id: number
  subject: string
  description: string
  dueDate: string
  color: string
}

interface TaskListProps {
  month: string
  tasks: Task[]
}

const TaskList = ({ month, tasks = [] }: TaskListProps) => {
  // Asegurarse de que tasks siempre sea un array
  const taskItems = Array.isArray(tasks) ? tasks : []

  if (taskItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.month}>{month}</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay tareas para este mes</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.month}>{month}</Text>
      <FlatList
        data={taskItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem subject={item.subject} description={item.description} dueDate={item.dueDate} color={item.color} />
        )}
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  month: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  emptyContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
  },
})

export default TaskList
