"use client"
<<<<<<< HEAD
import { StyleSheet, View, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
=======
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, ActivityIndicator, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState, useCallback } from "react"
>>>>>>> c93316b (Update App AlmaIA)
import ProfileHeader from "../components/profile/ProfileHeader"
import PersonalInfoSection from "../components/profile/PersonalInfoSection"
import WeeklyRegisterSection from "../components/profile/WeeklyRegisterSection"
import AchievementsSection from "../components/profile/AchievementsSection"
import SOSModal from "../components/modals/SOSModal"
import AccessibilityModal from "components/modals/AccessibilityModal"
<<<<<<< HEAD
=======
import { useAuth } from "context/AuthContext"
import { useProfile } from "context/ProfileContext"
import { Ionicons } from "@expo/vector-icons"
>>>>>>> c93316b (Update App AlmaIA)

const ProfileScreen = () => {
  const [sosModalVisible, setSOSModalVisible] = useState(false)
  const [accessibilityModalVisible, setAccessibilityModalVisible] = useState(false)
<<<<<<< HEAD

  const handleRequestHelp = () => {
    // Aquí iría la lógica para solicitar ayuda
=======
  const [refreshing, setRefreshing] = useState(false)
  const { logout } = useAuth()
  const { profileData, isLoading, fetchProfile } = useProfile()

  const handleRequestHelp = () => {
>>>>>>> c93316b (Update App AlmaIA)
    console.log("Solicitar ayuda")
    setSOSModalVisible(false)
  }

  const handleReport = () => {
<<<<<<< HEAD
    // Aquí iría la lógica para realizar una denuncia
=======
>>>>>>> c93316b (Update App AlmaIA)
    console.log("Realizar denuncia")
    setSOSModalVisible(false)
  }

<<<<<<< HEAD
  // Datos del usuario (en una aplicación real vendrían de una API o contexto)
  const userData = {
    id: "194353",
    fullName: "Paolo César Fernández Costa",
    nickname: "Xorieh",
    nationality: "Chile",
    age: "8 años",
    school: "Santiago Apostol",
    phone: "+51 943 925 343",
    father: "Cesar Fernández",
    mother: "Paola Costa",
    profileImage: require("../assets/icon.png"),
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfileHeader name="Paolo Fernandez" profileImage={userData.profileImage} onSOSPress={() => setSOSModalVisible(true)} onAccesPress={() => setAccessibilityModalVisible(true)} />

        <View style={styles.content}>
=======
  const handleLogout = () => {
    logout()
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await fetchProfile()
    } finally {
      setRefreshing(false)
    }
  }, [fetchProfile])

  // Formatear la fecha de nacimiento
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    } catch (error) {
      console.error("Error al formatear la fecha:", error)
      return dateString
    }
  }

  // Calcular la edad a partir de la fecha de nacimiento
  const calculateAge = (dateString: string) => {
    if (!dateString) return ""
    try {
      const birthDate = new Date(dateString)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      return `${age} años`
    } catch (error) {
      console.error("Error al calcular la edad:", error)
      return ""
    }
  }

  if (isLoading && !profileData) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </SafeAreaView>
    )
  }

  // Usar datos de la API o datos por defecto si no hay datos
  const userData = profileData
    ? {
        id: profileData.usuario.usuario_id.toString(),
        fullName: `${profileData.persona.nombres} ${profileData.persona.apellidos}`,
        nickname: profileData.usuario.nombre_social,
        nationality: "Chile", // Este dato no viene en la API, se podría añadir
        age: calculateAge(profileData.persona.fecha_nacimiento),
        school: "Santiago Apostol", // Este dato no viene en la API, se podría añadir
        phone: profileData.usuario.telefono_contacto,
        father: "Cesar Fernández", // Este dato no viene en la API, se podría añadir
        mother: "Paola Costa", // Este dato no viene en la API, se podría añadir
        profileImage: profileData.usuario.url_foto_perfil
          ? { uri: profileData.usuario.url_foto_perfil }
          : require("../assets/icon.png"),
      }
    : {
        id: "194353",
        fullName: "Paolo César Fernández Costa",
        nickname: "Xorieh",
        nationality: "Chile",
        age: "8 años",
        school: "Santiago Apostol",
        phone: "+51 943 925 343",
        father: "Cesar Fernández",
        mother: "Paola Costa",
        profileImage: require("../assets/icon.png"),
      }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <ProfileHeader
          name={profileData?.usuario.nombre_social || "Usuario"}
          profileImage={userData.profileImage}
          onSOSPress={() => setSOSModalVisible(true)}
          onAccesPress={() => setAccessibilityModalVisible(true)}
        />

        <View style={styles.content}>
          {isLoading && (
            <View style={styles.refreshingContainer}>
              <ActivityIndicator size="small" color="#2196F3" />
              <Text style={styles.refreshingText}>Actualizando...</Text>
            </View>
          )}

>>>>>>> c93316b (Update App AlmaIA)
          <PersonalInfoSection
            id={userData.id}
            fullName={userData.fullName}
            nickname={userData.nickname}
            nationality={userData.nationality}
            age={userData.age}
            school={userData.school}
            phone={userData.phone}
            father={userData.father}
            mother={userData.mother}
          />

<<<<<<< HEAD
          <WeeklyRegisterSection currentStreak={1} bestStreak={1} />

          <AchievementsSection />
=======
          {profileData?.rol && (
            <View style={styles.rolContainer}>
              <Text style={styles.rolTitle}>Rol en el sistema</Text>
              <View style={styles.rolContent}>
                <Text style={styles.rolName}>{profileData.rol.nombre}</Text>
                <Text style={styles.rolDescription}>{profileData.rol.descripcion}</Text>
              </View>
            </View>
          )}

          <WeeklyRegisterSection currentStreak={1} bestStreak={1} />

          <AchievementsSection />

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="white" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
>>>>>>> c93316b (Update App AlmaIA)
        </View>
      </ScrollView>

      <SOSModal
        visible={sosModalVisible}
        onClose={() => setSOSModalVisible(false)}
        onRequestHelp={handleRequestHelp}
        onReport={handleReport}
      />
      <AccessibilityModal visible={accessibilityModalVisible} onClose={() => setAccessibilityModalVisible(false)} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
<<<<<<< HEAD
    backgroundColor: "white"
=======
    backgroundColor: "white",
>>>>>>> c93316b (Update App AlmaIA)
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
<<<<<<< HEAD
=======
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  refreshingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    padding: 8,
    backgroundColor: "#f0f9ff",
    borderRadius: 8,
  },
  refreshingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#2196F3",
  },
  rolContainer: {
    marginBottom: 20,
  },
  rolTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  rolContent: {
    borderWidth: 0.5,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#FFFFFF",
  },
  rolName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 5,
  },
  rolDescription: {
    fontSize: 16,
    color: "#666",
  },
  logoutButton: {
    backgroundColor: "#FF4757",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutIcon: {
    marginRight: 10,
  },
>>>>>>> c93316b (Update App AlmaIA)
})

export default ProfileScreen
