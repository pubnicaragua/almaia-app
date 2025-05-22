"use client";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_ENDPOINTS, fetchAuthApi } from "config/api";
import { useAuth } from "context/AuthContext";

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTask: (task: {
    subject: string;
    description: string;
    dueDate: string;
    dueTime: string;
    color: string;
    type: string;
  }) => void;
}

const AddTaskModal = ({ visible, onClose, onAddTask }: AddTaskModalProps) => {
  const [subject, setSubject] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#2196F3");
  const [taskType, setTaskType] = useState("Tarea");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("30 de marzo");
  const [dueTime, setDueTime] = useState("11:55 am");
  const { user } = useAuth();

  const handleSubjectSelect = (selectedSubject: number) => {
    setSubject(selectedSubject);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleTypeSelect = (type: string) => {
    setTaskType(type);
  };

  const handleFinish = async () => {
    if (subject && description) {
      console.log("guardar tarea ");
      onAddTask({
        subject,
        description,
        dueDate,
        dueTime,
        color: selectedColor,
        type: taskType,
      });
      console.log(dueDate);
      
      await fetchAuthApi(API_ENDPOINTS.TAREAS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alumno_id: user?.alumno_id,
          materia_id: subject,
          tipo_tarea: taskType,
          descripcion_tarea: description,
          fecha_programacion: '2025-05-22',
          color: selectedColor,
          estado_tarea: "pendiente",
        }),
      });
      setSubject("");
      setSelectedColor("#2196F3");
      setTaskType("Tarea");
      setDescription("");
      onClose();
    }
  };

  const colors = [
    { id: 1, value: "#2196F3" },
    { id: 2, value: "#FFC107" },
    { id: 3, value: "#4CAF50" },
    { id: 4, value: "#673AB7" },
    { id: 5, value: "#E1BEE7" },
    { id: 6, value: "#F44336" },
  ];

  const currentDate = "25 mar. 2025";
  const currentTime = "14:55 pm";

  useEffect(() => {
    if (visible) {
      // lógica solo cuando el modal está visible
      obtener_materias();
    }
  }, [visible]);
  if (!visible) return null;

  async function obtener_materias() {
    try {
      const materias_data = await fetchAuthApi(API_ENDPOINTS.MATERIAS, {
        method: "GET",
      });
      console.log("Materias obtenidas:", materias_data);
      setSubjects(materias_data);
    } catch (error) {
      console.error("Error al obtener materias:", error);
    }
  }
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
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
                  key={item.materia_id}
                  style={[
                    styles.subjectButton,
                    subject === item.nombre && styles.selectedSubjectButton,
                    index > 3 && styles.subjectButtonMarginTop,
                  ]}
                  onPress={() => handleSubjectSelect(item.materia_id)}
                >
                  <Text style={styles.subjectButtonText}>{item.nombre}</Text>
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
                  {selectedColor === color.value && (
                    <View style={styles.colorCircleInner} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Tipo de pendiente</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  taskType === "Examen" && styles.selectedTypeButton,
                ]}
                onPress={() => handleTypeSelect("Examen")}
              >
                <Text style={styles.typeButtonText}>Examen</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  taskType === "Tarea" && styles.selectedTypeButton,
                ]}
                onPress={() => handleTypeSelect("Tarea")}
              >
                <Text style={styles.typeButtonText}>Tarea</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>
              ¿Cual es la tarea pendiente?
            </Text>
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

            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinish}
            >
              <Text style={styles.finishButtonText}>Finalizar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

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
});

export default AddTaskModal;
