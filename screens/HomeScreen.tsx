import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from 'sonner-native';

interface LoginScreenProps {
  navigation: any;
}

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const response = await fetch('https://api-almaia.onrender.com/api/v1/health', {
        method: 'GET',
        timeout: 5000,
      });
      
      if (response.ok) {
        setConnectionStatus('online');
      } else {
        setConnectionStatus('offline');
      }
    } catch (error) {
      console.log('Connection check failed:', error);
      setConnectionStatus('offline');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };  const handleLogin = async () => {
    setIsLoading(true);

    try {
      // Simular un token mock para pruebas
      const mockToken = 'mock-token-for-testing-' + Date.now();
      const mockUserId = '194353';
      const mockStudentId = '45';

      // Guardar datos simulados para permitir navegación
      await AsyncStorage.setItem('authToken', mockToken);
      await AsyncStorage.setItem('userId', mockUserId);
      await AsyncStorage.setItem('studentId', mockStudentId);
      
      toast.success('¡Modo demo activado! Navegación completa habilitada');
      
      // Navegar al dashboard directamente para pruebas
      navigation.navigate('Dashboard');

    } catch (error) {
      console.error('Error durante el login demo:', error);
      toast.error('Error al activar modo demo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRealLogin = async () => {
    // Validaciones básicas
    if (!email.trim()) {
      toast.error('Por favor ingresa tu correo electrónico');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Por favor ingresa un correo electrónico válido');
      return;
    }

    if (!password.trim()) {
      toast.error('Por favor ingresa tu contraseña');
      return;
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const loginPayload = {
        email: email.toLowerCase().trim(),
        password: password,
      };

      console.log('Intentando login real con:', { email: loginPayload.email });

      const loginResponse = await fetch('https://api-almaia.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'AlmaIA-Parent-App/1.0',
        },
        body: JSON.stringify(loginPayload),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        if (loginResponse.status === 400) {
          toast.error('Credenciales inválidas. Verifica tu correo y contraseña.');
        } else if (loginResponse.status === 500) {
          toast.error('Error interno del servidor. Usa el modo demo para probar la app.');
        } else if (loginResponse.status === 401) {
          toast.error('Usuario no autorizado. Verifica tus credenciales.');
        } else {
          toast.error(loginData?.message || `Error ${loginResponse.status}: ${loginResponse.statusText}`);
        }
        return;
      }

      // Guardar token real
      await AsyncStorage.setItem('authToken', loginData.token);
      toast.success('¡Bienvenido a AlmaIA!');
      
      // Navegar según el estado del usuario
      navigation.navigate('CompleteProfile');

    } catch (error: any) {
      console.error('Error durante el login real:', error);
      toast.error('Error de conexión. Usa el modo demo para probar la app.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header con gradiente y personaje Almie */}
          <View style={styles.header}>
            <View style={styles.gradientBackground} />
            
            {/* Bocadillo de diálogo */}
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>
                <Text style={styles.speechBold}>¡Hola!</Text> Soy{'\n'}
                <Text style={styles.speechBold}>Almie</Text> y te doy{'\n'}
                la <Text style={styles.speechBold}>bienvenida</Text>
              </Text>
              <View style={styles.speechTail} />
            </View>

            {/* Personaje Almie */}
            <View style={styles.almieContainer}>
              <View style={styles.almie}>
                {/* Ojos */}
                <View style={styles.eyes}>
                  <View style={styles.eye} />
                  <View style={styles.eye} />
                </View>
                {/* Sonrisa */}
                <View style={styles.smile} />
              </View>
              
              {/* Brazos */}
              <View style={styles.leftArm} />
              <View style={styles.rightArm} />
              
              {/* Mano derecha saludando */}
              <View style={styles.rightHand}>
                <Text style={styles.waveEmoji}>👋</Text>
              </View>
              
              {/* Pies */}
              <View style={styles.feet}>
                <View style={styles.foot} />
                <View style={styles.foot} />
              </View>
            </View>
          </View>          {/* Formulario */}
          <View style={styles.form}>
            {/* Estado de conexión */}
            {connectionStatus === 'offline' && (
              <View style={styles.connectionWarning}>
                <Text style={styles.connectionWarningText}>
                  ⚠️ Problemas de conexión detectados
                </Text>
              </View>
            )}

            {/* Campo Email */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Correo"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            {/* Campo Contraseña */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                editable={!isLoading}
              />
            </View>            {/* Credenciales de demo */}
            <TouchableOpacity 
              style={styles.demoCredentialsContainer}
              onPress={() => {
                setEmail('apo1@mail.com');
                setPassword('41m4Ia2025#');
                toast.info('Credenciales de demo cargadas');
              }}
            >
              <Text style={styles.demoCredentialsText}>
                📋 Usar credenciales de demo
              </Text>
            </TouchableOpacity>

            {/* Navegación rápida para pruebas */}
            <View style={styles.quickNavContainer}>
              <Text style={styles.quickNavTitle}>🚀 Navegación rápida para pruebas:</Text>
              
              <View style={styles.quickNavButtons}>
                <TouchableOpacity 
                  style={styles.quickNavButton}
                  onPress={() => navigation.navigate('CompleteProfile')}
                >
                  <Text style={styles.quickNavButtonText}>Perfil</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.quickNavButton}
                  onPress={() => navigation.navigate('Dashboard')}
                >
                  <Text style={styles.quickNavButtonText}>Dashboard</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.quickNavButton}
                  onPress={() => navigation.navigate('UserProfile')}
                >
                  <Text style={styles.quickNavButtonText}>Mi Perfil</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Link olvidar contraseña */}
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

          {/* Botones de Login */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#333" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Modo Demo (Navegar Libremente)</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.realLoginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleRealLogin}
              disabled={isLoading}
            >
              <Text style={styles.realLoginButtonText}>Login Real (Requiere API)</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: height * 0.55,
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
    backgroundColor: '#334155', // Color azul oscuro similar al diseño
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  speechBubble: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
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
  },
  almie: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    marginBottom: 8,
  },
  eye: {
    width: 12,
    height: 18,
    backgroundColor: '#000',
    borderRadius: 6,
    marginHorizontal: 4,
  },
  smile: {
    width: 20,
    height: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    borderRadius: 10,
  },
  leftArm: {
    position: 'absolute',
    left: -15,
    top: 20,
    width: 3,
    height: 25,
    backgroundColor: '#000',
    borderRadius: 2,
    transform: [{ rotate: '-30deg' }],
  },
  rightArm: {
    position: 'absolute',
    right: -15,
    top: 20,
    width: 3,
    height: 25,
    backgroundColor: '#000',
    borderRadius: 2,
    transform: [{ rotate: '30deg' }],
  },
  rightHand: {
    position: 'absolute',
    right: -28,
    top: 15,
  },
  waveEmoji: {
    fontSize: 16,
  },
  feet: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -15,
    justifyContent: 'center',
  },
  foot: {
    width: 12,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 6,
    marginHorizontal: 2,
  },
  form: {
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 16,
  },  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
  },
  connectionWarning: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFEAA7',
  },
  connectionWarningText: {
    color: '#856404',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  demoCredentialsContainer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },  demoCredentialsText: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '500',
  },
  quickNavContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F0F4F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickNavTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
    textAlign: 'center',
  },
  quickNavButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  quickNavButton: {
    flex: 1,
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  quickNavButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 40,
    gap: 12,
  },
  loginButton: {
    backgroundColor: '#FFC107',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFC107',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  realLoginButton: {
    backgroundColor: '#334155',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#334155',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.6,
    shadowOpacity: 0.1,
  },
  loginButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  realLoginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});