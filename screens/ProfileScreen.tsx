"use client"
import { StyleSheet, View, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import ProfileHeader from "../components/profile/ProfileHeader"
import PersonalInfoSection from "../components/profile/PersonalInfoSection"
import WeeklyRegisterSection from "../components/profile/WeeklyRegisterSection"
import AchievementsSection from "../components/profile/AchievementsSection"
import SOSModal from "../components/modals/SOSModal"
import AccessibilityModal from "components/modals/AccessibilityModal"

const ProfileScreen = () => {
  const [sosModalVisible, setSOSModalVisible] = useState(false)
  const [accessibilityModalVisible, setAccessibilityModalVisible] = useState(false)

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

          <WeeklyRegisterSection currentStreak={1} bestStreak={1} />

          <AchievementsSection />
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
    backgroundColor: "white"
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
})

export default ProfileScreen
