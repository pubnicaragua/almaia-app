"use client"

import { useState, useRef, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface AddTaskModalProps {
  visible: boolean
  onClose: () => void
  onAddTask: (task: {
    subject: string
    description: string
    dueDate: string
    dueTime: string
    color: string
    type: string
  }) => void
}

const AddTaskModal = ({ visible, onClose, onAddTask }: AddTaskModalProps) => {
  const [subject, setSubject] = useState("")
  const [selectedColor, setSelectedColor] = useState("#2196F3")
  const [taskType, setTaskType] = useState("Tarea")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("30 de marzo")
  const [dueTime, setDueTime] = useState("11:55 am")

  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(Dimensions.get("window").height)).current

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(slideAnim, {
          toValue: Dimensions.get("window").height,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start()
    }
  }, [visible])

  const handleSubjectSelect = (selectedSubject: string) => {
    setSubject(selectedSubject)
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
  }

  const handleTypeSelect = (type: string) => {
    setTaskType(type)
  }

  const handleFinish = () => {
    if (subject && description) {
      onAddTask({
        subject,
        description,
        dueDate,
        dueTime,
        color: selectedColor,
        type: taskType,
      })

      // Reset form
      setSubject("")
      setSelectedColor("#2196F3")
      setTaskType("Tarea")
      setDescription("")

      onClose()
    }
  }

  // Datos de asignaturas
  const subjects = [
    { id: 1, name: "MATEMATICAS" },
    { id: 2, name: "FISICA" },
    { id: 3, name: "COMUNICACION" },
    { id: 4, name: "QUIMICA" },
    { id: 5, name: "BIOLOGIA" },
    { id: 6, name: "HISTORIA" },
  ]

  // Colores disponibles
  const colors = [
    { id: 1, value: "#2196F3" }, // Azul
    { id: 2, value: "#FFC107" }, // Amarillo
    { id: 3, value: "#4CAF50" }, // Verde
    { id: 4, value: "#673AB7" }, // Morado
    { id: 5, value: "#E1BEE7" }, // Rosa claro
    { id: 6, value: "#F44336" }, // Rojo
  ]

  // Fecha y hora actuales (en una app real, usaríamos Date)
  const currentDate = "25 mar. 2025"
  const currentTime = "14:55 pm"

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <View style={styles.dateTimeContainer}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateTimeText}>{currentDate}</Text>
                </View>
                <View style={styles.timeBox}>
                  <Text style={styles.dateTimeText}>{currentTime}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Selecciona tu asignatura</Text>
            <View style={styles.subjectsGrid}>
              {subjects.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.subjectButton,
                    subject === item.name && styles.selectedSubjectButton,
                    index > 3 && styles.subjectButtonMarginTop,
                  ]}
                  onPress={() => handleSubjectSelect(item.name)}
                >
                  <Text style={styles.subjectButtonText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Selecciona el color</Text>
            <View style={styles.colorsContainer}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color.id}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color.value },
                    selectedColor === color.value && styles.selectedColorCircle,
                  ]}
                  onPress={() => handleColorSelect(color.value)}
                >
                  {selectedColor === color.value && <View style={styles.colorCircleInner} />}
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Tipo de pendiente</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[styles.typeButton, taskType === "Examen" && styles.selectedTypeButton]}
                onPress={() => handleTypeSelect("Examen")}
              >
                <Text style={styles.typeButtonText}>Examen</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, taskType === "Tarea" && styles.selectedTypeButton]}
                onPress={() => handleTypeSelect("Tarea")}
              >
                <Text style={styles.typeButtonText}>Tarea</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>¿Cual es la tarea pendiente?</Text>
            <View style={styles.descriptionContainer}>
              <TextInput
                style={styles.descriptionInput}
                multiline
                value={description}
                onChangeText={setDescription}
                placeholder="Describe tu tarea aquí..."
                placeholderTextColor="#A0C4F2"
                maxLength={100}
              />
              <Text style={styles.charCount}>{description.length}/100</Text>
            </View>

            <Text style={styles.sectionTitle}>Escoger fecha y hora</Text>
            <View style={styles.dateTimePickerContainer}>
              <TouchableOpacity style={styles.datePickerButton}>
                <Text style={styles.dateTimePickerText}>{dueDate}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.timePickerButton}>
                <Text style={styles.dateTimePickerText}>{dueTime}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
              <Text style={styles.finishButtonText}>Finalizar</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "#A9D4FB",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  dateTimeContainer: {
    flexDirection: "row",
  },
  dateBox: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  timeBox: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dateTimeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    marginBottom: 15,
  },
  subjectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  subjectButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "48%",
    alignItems: "center",
    marginBottom: 10,
  },
  subjectButtonMarginTop: {
    marginTop: 5,
  },
  selectedSubjectButton: {
    backgroundColor: "#1976D2",
  },
  subjectButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  colorsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColorCircle: {
    borderWidth: 2,
    borderColor: "white",
  },
  colorCircleInner: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "white",
  },
  typeContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  typeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  selectedTypeButton: {
    backgroundColor: "#2196F3",
  },
  typeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  descriptionContainer: {
    backgroundColor: "#64B5F6",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    minHeight: 150,
  },
  descriptionInput: {
    color: "white",
    fontSize: 16,
    flex: 1,
    textAlignVertical: "top",
  },
  charCount: {
    color: "white",
    textAlign: "right",
    marginTop: 5,
  },
  dateTimePickerContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  datePickerButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  timePickerButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dateTimePickerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: "#2196F3",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  finishButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default AddTaskModal