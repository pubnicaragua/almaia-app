import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Modal,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from 'sonner-native';

interface DashboardScreenProps {
  navigation: any;
}

interface Recordatorio {
  calendario_escolar_id: number;
  fecha_importante: string;
  descripcion: string;
}

const { width } = Dimensions.get('window');

const meses = [
  { key: '01', label: 'Ene' },
  { key: '02', label: 'Feb' },
  { key: '03', label: 'Mar' },
  { key: '04', label: 'Abr' },
  { key: '05', label: 'Jun' },
  { key: '06', label: 'Jul' },
];

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([]);
  const [isLoadingRecordatorios, setIsLoadingRecordatorios] = useState(true);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [currentYear, setCurrentYear] = useState(2025);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');
  const [selectedTab, setSelectedTab] = useState('Inicio');

  useEffect(() => {
    loadRecordatorios();
  }, []);

  const loadRecordatorios = async () => {
    setIsLoadingRecordatorios(true);
    try {
      const token = await AsyncStorage.getItem('authToken');      // Permitir navegación sin token para pruebas
      if (!token) {
        console.log('Usando modo demo para Dashboard');
        token = 'demo-token';
      }

      // Por ahora usaremos un colegio_id por defecto
      const colegioId = 1;      const response = await fetch(`https://api-almaia.onrender.com/api/v1/colegios/calendarios_fechas_importantes?colegio_id=${colegioId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Sesión expirada. Por favor inicia sesión nuevamente.');
          navigation.navigate('Home');
          return;
        }
        throw new Error('Error al cargar recordatorios');
      }

      const data = await response.json();
      setRecordatorios(data);

    } catch (error) {
      console.error('Error al cargar recordatorios:', error);
      // Usar datos simulados en caso de error
      setRecordatorios([
        {
          calendario_escolar_id: 1,
          fecha_importante: '2025-05-27',
          descripcion: 'Reunión de padres en el liceo de Santiago.'
        },
        {
          calendario_escolar_id: 2,
          fecha_importante: '2025-05-30',
          descripcion: 'Examen mensual de Paolo, pendiente.'
        }
      ]);
    } finally {
      setIsLoadingRecordatorios(false);
    }
  };

  const calculateDaysRemaining = (fecha: string) => {
    const today = new Date();
    const targetDate = new Date(fecha);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Vencido';
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    return `Faltan ${diffDays} días`;
  };

  const handleGenerateKey = async () => {
    setIsGeneratingKey(true);

    try {
      const token = await AsyncStorage.getItem('authToken');
      const studentId = await AsyncStorage.getItem('studentId');      // Permitir navegación sin token para pruebas
      if (!token) {
        console.log('Usando modo demo para Dashboard');
        token = 'demo-token';
      }

      if (!studentId) {
        toast.error('Error: ID del estudiante no encontrado');
        return;
      }      // TODO: Usar endpoint real cuando esté implementado
      // const response = await fetch('https://api-almaia.onrender.com/api/v1/alumnos/generar-clave', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     alumno_id: parseInt(studentId),
      //   }),
      // });

      // Por ahora, simular la generación de clave
      const simulatedKey = Math.floor(10000 + Math.random() * 90000).toString();
      setGeneratedKey(simulatedKey);
      setShowKeyModal(true);
      
      toast.success('¡Clave dinámica generada exitosamente!');

    } catch (error) {
      console.error('Error al generar clave dinámica:', error);
      toast.error('Error de conexión. Intenta más tarde.');
    } finally {
      setIsGeneratingKey(false);
    }
  };

  const handleDownloadReport = async (mes: string) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const studentId = await AsyncStorage.getItem('studentId');
      
      if (!token || !studentId) {
        toast.error('Sesión expirada. Por favor inicia sesión nuevamente.');
        navigation.navigate('Home');
        return;
      }

      // TODO: Implementar cuando el endpoint esté disponible      // const response = await fetch(`https://api-almaia.onrender.com/api/v1/informes/alumnos?alumno_id=${studentId}&mes=${mes}&anio=${currentYear}`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Accept': 'application/json',
      //   },
      // });

      // Por ahora, mostrar mensaje informativo
      toast.info(`Descarga de informe de ${meses.find(m => m.key === mes)?.label} ${currentYear} no disponible aún`);
      
      // Simular descarga (descomenta cuando el endpoint esté listo)
      // if (response.ok) {
      //   const data = await response.json();
      //   if (data.url_pdf) {
      //     Linking.openURL(data.url_pdf);
      //   }
      // }

    } catch (error) {
      console.error('Error al descargar informe:', error);
      toast.error('Error al descargar informe');
    }
  };  const handleResponderPreguntas = () => {
    // Navegar a Pantalla 9 - Preguntas personalizadas
    navigation.navigate('PersonalizedQuestion');
  };

  const formatKeyDigits = (key: string) => {
    return key.split('').map((digit, index) => (
      <Text key={index} style={styles.modalKeyDigit}>
        {digit}
      </Text>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header con Almie y SOS */}
      <View style={styles.header}>
        <View style={styles.gradientBackground} />
        
        {/* Título Hoy y botón SOS */}        <View style={styles.headerTop}>
          <Text style={styles.todayTitle}>Hoy</Text>
          <TouchableOpacity style={styles.sosButton} onPress={() => navigation.navigate('SOS')}>
            <Text style={styles.sosButtonText}>SOS</Text>
          </TouchableOpacity>
        </View>

        {/* Bocadillo de diálogo */}
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>
            <Text style={styles.speechBold}>¿Conoces</Text> bien{'\n'}
            a tu <Text style={styles.speechBold}>hijo?</Text>
          </Text>
          <View style={styles.speechTail} />
        </View>

        {/* Personaje Almie */}
        <View style={styles.almieContainer}>
          <View style={styles.almie}>
            <View style={styles.eyes}>
              <View style={styles.eye} />
              <View style={styles.eye} />
            </View>
            <View style={styles.smile} />
          </View>
          
          <View style={styles.leftArm} />
          <View style={styles.rightArm} />
          <View style={styles.rightHand}>
            <Text style={styles.waveEmoji}>👋</Text>
          </View>
          
          <View style={styles.feet}>
            <View style={styles.foot} />
            <View style={styles.foot} />
          </View>
        </View>

        {/* Botón Responder preguntas */}
        <TouchableOpacity style={styles.answerButton} onPress={handleResponderPreguntas}>
          <Text style={styles.answerButtonText}>Responder preguntas</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recordatorios y fechas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recordatorios y fechas</Text>
          
          {isLoadingRecordatorios ? (
            <ActivityIndicator color="#334155" size="small" style={styles.loader} />
          ) : (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.recordatoriosScroll}
            >
              {recordatorios.map((recordatorio, index) => (
                <View key={recordatorio.calendario_escolar_id} style={styles.recordatorioCard}>
                  <Text style={styles.recordatorioTitle}>
                    {recordatorio.descripcion.split(' ')[0]}
                  </Text>
                  <Text style={styles.recordatorioDescription}>
                    {recordatorio.descripcion}
                  </Text>
                  <View style={styles.recordatorioFooter}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.recordatorioTime}>
                      {calculateDaysRemaining(recordatorio.fecha_importante)}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Informes psicoemocionales */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Informes psicoemocionales</Text>
            <TouchableOpacity style={styles.yearSelector}>
              <Text style={styles.yearSelectorText}>{currentYear}</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.monthsGrid}>
            {meses.map((mes) => (
              <TouchableOpacity
                key={mes.key}
                style={styles.monthButton}
                onPress={() => handleDownloadReport(mes.key)}
              >
                <Ionicons name="download-outline" size={20} color="#333" />
                <Text style={styles.monthButtonText}>{mes.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Generar clave dinámica */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Generar clave dinámica para mi hijo</Text>
          <TouchableOpacity
            style={[styles.generateKeyButton, isGeneratingKey && styles.generateKeyButtonDisabled]}
            onPress={handleGenerateKey}
            disabled={isGeneratingKey}
          >
            {isGeneratingKey ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.generateKeyButtonText}>Generar clave</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navegación inferior */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={[styles.navItem, selectedTab === 'Inicio' && styles.navItemActive]}
          onPress={() => setSelectedTab('Inicio')}
        >
          <Ionicons 
            name="home" 
            size={24} 
            color={selectedTab === 'Inicio' ? '#334155' : '#666'} 
          />
          <Text style={[styles.navText, selectedTab === 'Inicio' && styles.navTextActive]}>
            Inicio
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.navItem, selectedTab === 'Convenios' && styles.navItemActive]}
          onPress={() => setSelectedTab('Convenios')}
        >
          <Ionicons 
            name="cube-outline" 
            size={24} 
            color={selectedTab === 'Convenios' ? '#334155' : '#666'} 
          />
          <Text style={[styles.navText, selectedTab === 'Convenios' && styles.navTextActive]}>
            Convenios
          </Text>
        </TouchableOpacity>        <TouchableOpacity
          style={[styles.navItem, selectedTab === 'Yo' && styles.navItemActive]}
          onPress={() => {
            setSelectedTab('Yo');
            navigation.navigate('UserProfile');
          }}
        >
          <Ionicons 
            name="person-outline" 
            size={24} 
            color={selectedTab === 'Yo' ? '#334155' : '#666'} 
          />
          <Text style={[styles.navText, selectedTab === 'Yo' && styles.navTextActive]}>
            Yo
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal de clave generada */}
      <Modal
        visible={showKeyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowKeyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowKeyModal(false)}
              >
                <Ionicons name="close" size={24} color="#334155" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalTitle}>Clave dinámica generada</Text>
            
            <View style={styles.modalKeyContainer}>
              {formatKeyDigits(generatedKey)}
            </View>
            
            <Text style={styles.modalInstructions}>
              Ingresa este código en la app de AlmaIA Niños para que tu hijo pueda acceder a su cuenta.
            </Text>
            
            <Text style={styles.modalExpiration}>
              Este código expira en 15 minutos
            </Text>
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowKeyModal(false)}
            >
              <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 280,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '85%',
    backgroundColor: '#334155',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerTop: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 3,
  },
  todayTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  sosButton: {
    backgroundColor: '#EF4444',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  speechBubble: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 2,
  },
  speechText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  speechBold: {
    fontWeight: 'bold',
  },
  speechTail: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
  },
  almieContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 16,
  },
  almie: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 1,
  },
  eyes: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  eye: {
    width: 8,
    height: 12,
    backgroundColor: '#000',
    borderRadius: 4,
    marginHorizontal: 3,
  },
  smile: {
    width: 16,
    height: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    borderRadius: 8,
  },
  leftArm: {
    position: 'absolute',
    left: -12,
    top: 15,
    width: 2,
    height: 20,
    backgroundColor: '#000',
    borderRadius: 1,
    transform: [{ rotate: '-30deg' }],
  },
  rightArm: {
    position: 'absolute',
    right: -12,
    top: 15,
    width: 2,
    height: 20,
    backgroundColor: '#000',
    borderRadius: 1,
    transform: [{ rotate: '30deg' }],
  },
  rightHand: {
    position: 'absolute',
    right: -22,
    top: 12,
  },
  waveEmoji: {
    fontSize: 14,
  },
  feet: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -12,
    justifyContent: 'center',
  },
  foot: {
    width: 8,
    height: 6,
    backgroundColor: '#000',
    borderRadius: 4,
    marginHorizontal: 1,
  },
  answerButton: {
    backgroundColor: '#FFC107',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8,
    zIndex: 2,
  },
  answerButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  yearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  yearSelectorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
  },
  loader: {
    marginVertical: 20,
  },
  recordatoriosScroll: {
    marginBottom: 8,
  },
  recordatorioCard: {
    backgroundColor: '#64748B',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 160,
    minHeight: 120,
  },
  recordatorioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  recordatorioDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: 12,
    flex: 1,
  },
  recordatorioFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordatorioTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  monthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  monthButton: {
    backgroundColor: '#FFC107',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    aspectRatio: 1,
    marginBottom: 8,
  },
  monthButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  generateKeyButton: {
    backgroundColor: '#334155',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateKeyButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  generateKeyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    opacity: 1,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  navTextActive: {
    color: '#334155',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: width * 0.9,
    maxWidth: 400,
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  modalCloseButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalKeyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  modalKeyDigit: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#334155',
    marginHorizontal: 6,
  },
  modalInstructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  modalExpiration: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#FFC107',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  modalButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});