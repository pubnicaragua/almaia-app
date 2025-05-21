"use client";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../src/components/home/Header";
import MascotMessage from "../src/components/tasks/MascotMessage";
import TaskTabs from "../src/components/tasks/TaskTabs";
import TaskList from "../src/components/tasks/TaskList";
import SOSModal from "../src/components/modals/SOSModal";
import AddTaskModal from "../src/components/modals/AddTaskModal";
import { Ionicons } from "@expo/vector-icons";
import { API_ENDPOINTS, fetchAuthApi } from "config/api";
import { mapearTareasPorMes } from "service/TareasService";
import { useAuth } from "context/AuthContext";

const TasksScreen = () => {
  const [activeTab, setActiveTab] = useState("Tareas");
  const [sosModalVisible, setSOSModalVisible] = useState(false);
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const { user } = useAuth();

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
  ]);

  // Añadir un efecto para registrar cuando se monta el componente
  useEffect(() => {
    obtener_tareas();
    console.log("TasksScreen mounted");
    return () => {
      console.log("TasksScreen unmounted");
    };
  }, []);

  async function obtener_tareas() {
    try {
      const tareas = await fetchAuthApi(
        API_ENDPOINTS.TAREAS + "?alumno_id=" + user?.alumno_id,
        {
          method: "GET",
        }
      );
      const tareas_mes = mapearTareasPorMes(tareas);
      setTasks(tareas_mes);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      throw error;
    }
  }

  const handleSOSPress = () => {
    setSOSModalVisible(true);
  };

  const handleCloseSOSModal = () => {
    setSOSModalVisible(false);
  };

  const handleRequestHelp = () => {
    // Aquí iría la lógica para solicitar ayuda
    console.log("Solicitar ayuda");
    setSOSModalVisible(false);
  };

  const handleReport = () => {
    // Aquí iría la lógica para realizar una denuncia
    console.log("Realizar denuncia");
    setSOSModalVisible(false);
  };

  const handleAccessibilityPress = () => {
    setAddTaskModalVisible(true);
  };

  const handleAddTask = async (newTask: {
    subject: string;
    description: string;
    dueDate: string;
    dueTime: string;
    color: string;
    type: string;
  }) => {
    // Determinar el mes actual (en una app real, extraeríamos esto de la fecha)
    const currentMonth = "Marzo";

    // Buscar el grupo de tareas del mes actual
    const monthGroup = tasks.find((group) => group.month === currentMonth);

    if (monthGroup) {
      // Crear una copia de las tareas
      const updatedTasks = [...tasks];

      // Encontrar el índice del grupo del mes actual
      const monthIndex = updatedTasks.findIndex(
        (group) => group.month === currentMonth
      );

      // Generar un nuevo ID para la tarea (en una app real, esto sería más robusto)
      const newId = Math.max(...monthGroup.items.map((item) => item.id), 0) + 1;

      // Añadir la nueva tarea al grupo del mes actual
      updatedTasks[monthIndex].items.push({
        id: newId,
        subject: newTask.subject,
        description: newTask.description,
        dueDate: `${newTask.dueDate} a las ${newTask.dueTime}`,
        color: newTask.color,
      });

      // Actualizar el estado
      setTasks(updatedTasks);

      await fetchAuthApi(API_ENDPOINTS.TAREAS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alumno_id: user?.alumno_id,
          materia_id: newTask.subject,
          tipo_tarea: newTask.type,
          descripcion_tarea: newTask.description,
          fecha_programacion: `${newTask.dueDate} a las ${newTask.dueTime}`,
          color: newTask.color,
          estado_tarea: "pendiente",
        }),
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <MascotMessage
          message="¡Escoge para agregar en tu rutina de tareas!"
          points={500}
        />
        <TaskTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {tasks && tasks.length > 0 ? (
          tasks.map((taskGroup) => (
            <TaskList
              key={taskGroup.id}
              month={taskGroup.month}
              tasks={taskGroup.items || []}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay tareas disponibles</Text>
          </View>
        )}
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddTaskModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9D4FB",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 15,
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
  },
});

export default TasksScreen;
