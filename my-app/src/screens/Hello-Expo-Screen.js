import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';


export default function WelcomeScreen() {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const headerAnim  = useRef(new Animated.Value(0)).current;
  const logoAnim    = useRef(new Animated.Value(0)).current;
  const formAnim    = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const logoFloat   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(180, [
      Animated.spring(headerAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      Animated.spring(logoAnim,   { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      Animated.spring(formAnim,   { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(logoFloat, { toValue: -6, duration: 1800, useNativeDriver: true }),
        Animated.timing(logoFloat, { toValue: 0,  duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handlePress = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      Alert.alert('Oops!', 'Please type your name first, meow~', [
        { text: 'Got it!', style: 'default' },
      ]);
      return;
    }

    Animated.sequence([
      Animated.spring(buttonScale, { toValue: 0.92, tension: 200, friction: 5, useNativeDriver: true }),
      Animated.spring(buttonScale, { toValue: 1,    tension: 200, friction: 5, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      Alert.alert(
        '🐱 Hello there!',
        `Welcome to CatME, ${trimmedName}! \nYour account has been created!`,
        [{ text: 'Purrfect!', style: 'default' }]
      );
    }, 300);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B5E40" />

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerAnim,
            transform: [{
              translateY: headerAnim.interpolate({
                inputRange: [0, 1], outputRange: [-50, 0],
              }),
            }],
          },
        ]}
      >
        <Text style={styles.appTitle}>CatME!</Text>
        <Text style={styles.appSubtitle}>Your purrsonalized profile app</Text>

        {/* App Logo */}
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoAnim,
              transform: [
                {
                  scale: logoAnim.interpolate({
                    inputRange: [0, 1], outputRange: [0.4, 1],
                  }),
                },
                { translateY: logoFloat },
              ],
            },
          ]}
        >
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Wave curve */}
        <View style={styles.waveCurve} />
      </Animated.View>

      {/* Form Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
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
          <Text style={styles.inputLabel}>What's your name?</Text>
          <Text style={styles.inputHint}>We'll use this to personalize your experience</Text>

          {/* TextInput */}
          <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
            <Text style={styles.inputIcon}>🐾</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type your name here..."
              placeholderTextColor="#B0BEC5"
              value={name}
              onChangeText={setName}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              returnKeyType="done"
              onSubmitEditing={handlePress}
              autoCapitalize="words"
            />
          </View>

          {/* Button Row */}
          <View style={styles.buttonRow}>
            {/* Submit Button */}
            <View style={[styles.buttonGlowWrapper, { flex: 1 }]}>
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

            {/* Reset Button */}
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => setName('')}
              activeOpacity={0.75}
            >
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerNote}>By continuing you agree to our Terms of Service</Text>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7F4',
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    backgroundColor: '#3371f7',
    paddingTop: 44,
    paddingHorizontal: 24,
    paddingBottom: 80,
    alignItems: 'center',
    position: 'relative',
  },
  pawDecor: {
    fontSize: 13,
    opacity: 0.4,
    letterSpacing: 6,
    marginBottom: 6,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  appSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 0.5,
    marginBottom: 20,
    marginTop: 4,
    fontStyle: 'italic',
  },
  logoWrapper: {
    width: 135,
    height: 135,
    borderRadius: 68,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: '#1b325e',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  waveCurve: {
    position: 'absolute',
    bottom: -32,
    left: -12,
    right: -12,
    height: 64,
    backgroundColor: '#F0F7F4',
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
  },

  // ── Form ────────────────────────────────────────────────
  formSection: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 52,
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1b2c3a',
    marginBottom: 4,
    alignSelf: 'flex-start',
    letterSpacing: 0.2,
  },
  inputHint: {
    fontSize: 13,
    color: '#7FA898',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#1b3a5e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputContainerFocused: {
    borderColor: '#27628a',
    shadowOpacity: 0.16,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1B3A2D',
    fontWeight: '500',
  },
  buttonGlowWrapper: {
    shadowColor: '#1b275e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 22,
    elevation: 10,
  },
  button: {
    backgroundColor: '#1b2b5e',
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 8,
  },
  buttonEmoji: {
    fontSize: 22,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 26,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#2d5c82',
    backgroundColor: 'transparent',
    gap: 6,
  },
  resetEmoji: {
    fontSize: 18,
  },
  resetText: {
    color: '#2d5982',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  footerNote: {
    fontSize: 11,
    color: '#A0B8AE',
    marginTop: 20,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});