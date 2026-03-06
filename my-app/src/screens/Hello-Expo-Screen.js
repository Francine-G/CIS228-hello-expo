import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';


export default function WelcomeScreen() {
  const [name, setName] = useState('');

  // Entrance animations
  const headerAnim  = useRef(new Animated.Value(0)).current;
  const logoAnim    = useRef(new Animated.Value(0)).current;
  const formAnim    = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.stagger(180, [
      Animated.spring(headerAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      Animated.spring(logoAnim,   { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      Animated.spring(formAnim,   { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePress = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      Alert.alert('❌ Error', 'Please input a name first.', [
        { text: 'OK', style: 'default' },
      ]);
      return;
    }

    // Button bounce
    Animated.sequence([
      Animated.spring(buttonScale, { toValue: 0.92, tension: 200, friction: 5, useNativeDriver: true }),
      Animated.spring(buttonScale, { toValue: 1,    tension: 200, friction: 5, useNativeDriver: true }),
    ]).start();

    // Greeting alert — Alert styling is controlled by the OS on React Native;
    // wrapping in a custom modal gives full white-background control.
    setTimeout(() => {
      Alert.alert('🎉', `Hello, ${trimmedName}!!`, [
        { text: 'Thanks! 🙌', style: 'default' },
      ]);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2D8257" />

      {/* Header Wave Section */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerAnim,
            transform: [{
              translateY: headerAnim.interpolate({
                inputRange: [0, 1], outputRange: [-40, 0],
              }),
            }],
          },
        ]}
      >
        <Text style={styles.welcomeText}>CatME!</Text>

        {/* Logo */}
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoAnim,
              transform: [{
                scale: logoAnim.interpolate({
                  inputRange: [0, 1], outputRange: [0.5, 1],
                }),
              }],
            },
          ]}
        >
          <Image
            source={require('../../assets/profile.jpg')}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </Animated.View>

        <View style={styles.waveCurve} />
      </Animated.View>

      {/* Form Section */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <Animated.View
          style={[
            styles.formSection,
            {
              opacity: formAnim,
              transform: [{
                translateY: formAnim.interpolate({
                  inputRange: [0, 1], outputRange: [40, 0],
                }),
              }],
            },
          ]}
        >
          <Text style={styles.inputLabel}>Enter your Name</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Your name..."
              placeholderTextColor="#B0BEC5"
              value={name}
              onChangeText={setName}
              returnKeyType="done"
            />
          </View>

          <View style={styles.buttonGlowWrapper}>
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    backgroundColor: '#2D8257',
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 70,
    alignItems: 'center',
    position: 'relative',
  },
  waveCurve: {
    position: 'absolute',
    bottom: -30,
    left: -10,
    right: -10,
    height: 60,
    backgroundColor: '#F0F4F8',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 3,
    marginBottom: 24,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  logoWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  formSection: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 50,
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12,
    alignSelf: 'flex-start',
    letterSpacing: 0.3,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 36,
  },
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  hintText: {
    fontSize: 13,
    color: '#90A4AE',
    marginBottom: 20,
    letterSpacing: 0.2,
  },
  buttonGlowWrapper: {
    width: '100%',
    shadowColor: '#1B5E40',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  button: {
    backgroundColor: '#1B5E40',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});