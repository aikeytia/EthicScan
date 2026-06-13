// Welcome/Splash Screen - First screen users see
import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, BorderRadius } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entry animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGradient}>
        <View style={styles.gradientOverlay} />
      </View>

      {/* Decorative circles */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo Area */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="leaf" size={48} color="#FFFFFF" />
          </View>
          <Text style={styles.logoText}>EthicScan</Text>
          <Text style={styles.tagline}>Bilinçli Tüketim Rehberiniz</Text>
        </View>

        {/* Feature highlights */}
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="barcode-outline" size={24} color={Colors.primaryLight} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Barkod Tara</Text>
              <Text style={styles.featureDesc}>Ürünlerin etik bilgilerini anında öğrenin</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="heart-outline" size={24} color={Colors.primaryLight} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Etik Değerlendirme</Text>
              <Text style={styles.featureDesc}>Hayvan deneyi, vegan, sürdürülebilirlik</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="swap-horizontal-outline" size={24} color={Colors.primaryLight} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Alternatif Öneriler</Text>
              <Text style={styles.featureDesc}>Daha etik seçenekleri keşfedin</Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.replace('/(tabs)/home')}
            activeOpacity={0.85}
          >
            <View style={styles.ctaGradient}>
              <Ionicons name="arrow-forward" size={24} color="#FFFFFF" style={styles.ctaIcon} />
              <Text style={styles.ctaText}>Başlayalım</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.versionText}>v1.0.0 • Etik Alışverişin Gücü</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.backgroundDark,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 94, 32, 0.15)',
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 200,
    height: 200,
    bottom: 100,
    left: -80,
  },
  circle3: {
    width: 150,
    height: 150,
    top: height * 0.3,
    right: -50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 3,
    borderColor: Colors.primaryLight,
    shadowColor: Colors.primaryLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logoText: {
    fontSize: 42,
    fontFamily: 'Inter_700Bold',
    color: Colors.textLight,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  features: {
    width: '100%',
    marginBottom: Spacing.xxl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.15)',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.textLight,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.textMuted,
  },
  ctaButton: {
    overflow: 'hidden',
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md + 2,
    paddingHorizontal: Spacing.xxl,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  ctaIcon: {
    marginRight: Spacing.sm,
  },
  ctaText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: Colors.textLight,
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.3)',
  },
});
