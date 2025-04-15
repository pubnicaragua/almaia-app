"use client"
import { useState } from "react"
import { StyleSheet, ScrollView,TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "components/home/Header"
import MascotMessage from "../components/tasks/MascotMessage"
import TaskTabs from "../components/tasks/TaskTabs"
import TaskList from "../components/tasks/TaskList"
import SOSModal from "../components/modals/SOSModal"
import AddTaskModal from "../components/modals/AddTaskModal"

const TasksScreen = () => {
  const [activeTab, setActiveTab] = useState("Tareas")
  const [sosModalVisible, setSOSModalVisible] = useState(false)
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      month: "Marzo",
      items: [
        {
          id: 101,
          subject: "Matematicas",
          description: "Hacer los ejercicios del 1 al 3 página 4.",
          dueDate: "30 de marzo a las 11:55 AM",
          color: "#2196F3",
        },
        {
          id: 102,
          subject: "Comunicación",
          description: "Leer y escribir un poema, para el día de la madre.",
          dueDate: "30 de marzo a las 11:55 AM",
          color: "#FFC107",
        },
        {
          id: 103,
          subject: "Química",
          description: "Hacer el proyecto de ciencias, para la feria.",
          dueDate: "30 de marzo a las 11:55 AM",
          color: "#4CAF50",
        },
      ],
    },
    {
      id: 2,
      month: "Abril",
      items: [],
    },
  ])

  const handleSOSPress = () => {
    setSOSModalVisible(true)
  }

  const handleCloseSOSModal = () => {
    setSOSModalVisible(false)
  }

  const handleRequestHelp = () => {
    // Aquí iría la lógica para solicitar ayuda
    console.log("Solicitar ayuda")
    setSOSModalVisible(false)
  }

  const handleReport = () => {
    // Aquí iría la lógica para realizar una denuncia
    console.log("Realizar denuncia")
    setSOSModalVisible(false)
  }

  const handleAccessibilityPress = () => {
    setAddTaskModalVisible(true)
  }

  const handleAddTask = (newTask: {
    subject: string
    description: string
    dueDate: string
    dueTime: string
    color: string
    type: string
  }) => {
    // Determinar el mes actual (en una app real, extraeríamos esto de la fecha)
    const currentMonth = "Marzo"

    // Buscar el grupo de tareas del mes actual
    const monthGroup = tasks.find((group) => group.month === currentMonth)

    if (monthGroup) {
      // Crear una copia de las tareas
      const updatedTasks = [...tasks]

      // Encontrar el índice del grupo del mes actual
      const monthIndex = updatedTasks.findIndex((group) => group.month === currentMonth)

      // Generar un nuevo ID para la tarea (en una app real, esto sería más robusto)
      const newId = Math.max(...monthGroup.items.map((item) => item.id), 0) + 1

      // Añadir la nueva tarea al grupo del mes actual
      updatedTasks[monthIndex].items.push({
        id: newId,
        subject: newTask.subject,
        description: newTask.description,
        dueDate: `${newTask.dueDate} a las ${newTask.dueTime}`,
        color: newTask.color,
      })

      // Actualizar el estado
      setTasks(updatedTasks)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <TouchableOpacity onPress={()=>setAddTaskModalVisible(true)} style={{height:20,width:20,backgroundColor:"black"}}></TouchableOpacity>
        <MascotMessage message="¡Escoge para agregar en tu rutina de tareas!" points={500} />
        <TaskTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {tasks.map((taskGroup) => (
          <TaskList key={taskGroup.id} month={taskGroup.month} tasks={taskGroup.items} />
        ))}
      </ScrollView>

      <SOSModal
        visible={sosModalVisible}
        onClose={handleCloseSOSModal}
        onRequestHelp={handleRequestHelp}
        onReport={handleReport}
      />

      <AddTaskModal
        visible={addTaskModalVisible}
        onClose={() => setAddTaskModalVisible(false)}
        onAddTask={handleAddTask}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9D4FB",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
})

export default TasksScreen
