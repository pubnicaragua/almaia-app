import { ScrollView, StyleSheet, View, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/home/Header"
import MascotGreeting from "../components/home/MascotGreeting"
import DaySelector from "../components/home/DaySelector"
import StreakCounter from "../components/home/StreakCounter"
import TaskList from "../components/home/TaskList"
import DiarySection from "../components/home/DiarySection"
import { TASKS_DATA } from "../data/mockData"
import colors from "constants/colors"
import { useEffect, useState } from "react"
import { mapearTareas, mapearTareasPorMes } from "service/TareasService"
import { API_ENDPOINTS, fetchAuthApi } from "config/api"
import { useAuth } from "context/AuthContext"
import { Task } from "types"
const HomeScreen = () => {
const [tasks, setTasks] = useState<Task[]>([]);
    const { user } = useAuth()

 useEffect(() => {
    obtener_tareas();
    console.log("TasksScreen mounted");
    return () => {
      console.log("TasksScreen unmounted");
    };
  }, []);
  async function obtener_tareas() {
    try {
     const tareas = await fetchAuthApi(API_ENDPOINTS.TAREAS+"?alumno_id="+user?.alumno_id, {
        method: "GET",
      });
      console.log(tareas);
      const tareas_mes = mapearTareas(tareas)     
      setTasks(tareas_mes)
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      throw error;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primaryBlueLow} barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <MascotGreeting />
        <View style={styles.daySection}>
          <DaySelector />
          <StreakCounter />
        </View>
        <TaskList title="Tareas" tasks={tasks} />
        <DiarySection />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  daySection: {
    flexDirection: "column",
    backgroundColor: colors.primaryBlueStrong,
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
  },
})

export default HomeScreen
