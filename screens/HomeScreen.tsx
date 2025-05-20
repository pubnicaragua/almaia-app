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

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
<<<<<<< HEAD
      <StatusBar
        backgroundColor={colors.primaryBlueLow}
        barStyle="light-content"
      />
=======
      <StatusBar backgroundColor={colors.primaryBlueLow} barStyle="light-content" />
>>>>>>> c93316b (Update App AlmaIA)
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <MascotGreeting />
        <View style={styles.daySection}>
          <DaySelector />
          <StreakCounter />
        </View>
        <TaskList title="Tareas" tasks={TASKS_DATA} />
        <DiarySection />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "white"
=======
    backgroundColor: "white",
>>>>>>> c93316b (Update App AlmaIA)
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
