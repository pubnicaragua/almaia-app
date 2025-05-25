import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { API_ENDPOINTS, fetchAuthApi } from "config/api";

const EditProfileScreen = ({ navigation }) => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [name, setName] = useState("");
  const [tieneRespuesta, setTieneRespuesta] = useState<boolean>(false);
  const [usuario, setUsuario] = useState({
    usuario_id: 0,
    nombre_social: "",
    email: "",
    encripted_password: "",
    rol_id: 0,
    telefono_contacto: "",
    ultimo_inicio_sesion: null, // o new Date().toISOString() si deseas un valor por defecto
    estado_usuario: true,
    intentos_inicio_sesion: 0,
    url_foto_perfil: null,
    persona_id: 0,
    idioma_id: 0,
  });

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSaveChanges = async() => {
    // Aquí puedes agregar la lógica para guardar los cambios
    await fetchAuthApi(API_ENDPOINTS.USUARIO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_id: usuario.usuario_id,
        nombre_social:name,
        email: usuario.email,
        encripted_password: usuario.encripted_password,
        rol_id: usuario.rol_id,
        telefono_contacto: usuario.telefono_contacto,
        ultimo_inicio_sesion: usuario.ultimo_inicio_sesion,
        estado_usuario: usuario.estado_usuario,
        intentos_inicio_sesion: usuario.intentos_inicio_sesion,
        url_foto_perfil: usuario.url_foto_perfil ?? null, // Opcional
        persona_id: usuario.persona_id,
        idioma_id: usuario.idioma_id,
      }),
    });

    Alert.alert("Éxito", "Cambios guardados correctamente");
  };

  const handleSelectPhoto = () => {
    // Aquí puedes agregar la lógica para seleccionar una foto
    Alert.alert(
      "Seleccionar foto",
      "Funcionalidad para seleccionar foto de perfil"
    );
  };
  useEffect(() => {
    if (!tieneRespuesta) {
      obtenerPerfil();
    }
  }, []); // Añade dependencias vacías para evitar bucles
  async function obtenerPerfil() {
    const perfil = await fetchAuthApi(API_ENDPOINTS.PROFILE, { method: "GET" });
    setName(perfil.usuario.nombre_social);
    setUsuario(perfil.usuario);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#87CEEB" />

      <LinearGradient
        colors={["#87CEEB", "#B0E0E6", "#E0F6FF"]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft} />
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Profile Icon */}
        <View style={styles.profileIconContainer}>
          <TouchableOpacity
            style={styles.profileIcon}
            onPress={handleSelectPhoto}
          >
            <Ionicons name="camera-outline" size={32} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Edita tu perfil</Text>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={handleSelectPhoto}
          >
            <TextInput
              style={styles.input}
              placeholder="Sube una foto nueva de perfil"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              value={profilePhoto}
              editable={false}
            />
            <Ionicons
              name="camera-outline"
              size={20}
              color="rgba(255, 255, 255, 0.8)"
            />
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
              value={name}
              onChangeText={setName}
            />
            <Ionicons
              name="pencil-outline"
              size={20}
              color="rgba(255, 255, 255, 0.8)"
            />
          </View>
        </View>

        {/* Curved Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.curvedBackground} />

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Guardar cambios</Text>
          </TouchableOpacity>

          {/* Bottom Indicator */}
          <View style={styles.bottomIndicator} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerLeft: {
    width: 40, // Para balancear el botón de cerrar
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileIconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    paddingHorizontal: 30,
    marginBottom: 60,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
  },
  curvedBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  saveButton: {
    backgroundColor: "#2196F3",
    borderRadius: 25,
    paddingVertical: 18,
    marginHorizontal: 30,
    marginBottom: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default EditProfileScreen;
