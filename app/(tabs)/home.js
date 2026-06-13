// Home Screen - Main dashboard with scan button and recent scans
import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/Colors';
import { getHistory } from '../../services/productService';
import { getScoreColor } from '../../services/ethicScoreCalculator';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [recentScans, setRecentScans] = useState([]);
  const [totalScans, setTotalScans] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const scanBtnScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      loadRecentScans();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  const loadRecentScans = async () => {
    const history = await getHistory();
    setRecentScans(history.slice(0, 5));
    setTotalScans(history.length);
    if (history.length > 0) {
      const avg = Math.round(history.reduce((sum, h) => sum + (h.ethicScore || 0), 0) / history.length);
      setAvgScore(avg);
    }
  };

  const handleScanPress = () => {
    Animated.sequence([
      Animated.timing(scanBtnScale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scanBtnScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      router.push('/scan');
    });
  };

  const renderRecentItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.recentItem}
      onPress={() => router.push(`/product/${item.barcode}`)}
      activeOpacity={0.7}
    >
      <View style={[styles.recentScore, { backgroundColor: getScoreColor(item.ethicScore) + '20' }]}>
        <Text style={[styles.recentScoreText, { color: getScoreColor(item.ethicScore) }]}>
          {item.ethicScore}
        </Text>
      </View>
      <View style={styles.recentInfo}>
        <Text style={styles.recentName} numberOfLines={1}>{item.productName}</Text>
        <Text style={styles.recentBrand} numberOfLines={1}>{item.brand}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Animated.ScrollView 
        style={[styles.scrollView, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hoş Geldiniz! 👋</Text>
            <Text style={styles.subtitle}>Bugün ne tarayacaksın?</Text>
          </View>
          <View style={styles.logoSmall}>
            <Ionicons name="leaf" size={24} color={Colors.primaryLight} />
          </View>
        </View>

        {/* Scan Button - Hero */}
        <Animated.View style={[styles.scanButtonContainer, { transform: [{ scale: scanBtnScale }] }]}>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleScanPress}
            activeOpacity={0.85}
          >
            <View style={styles.scanButtonInner}>
              <View style={styles.scanIconCircle}>
                <Ionicons name="barcode-outline" size={48} color="#FFFFFF" />
              </View>
              <Text style={styles.scanButtonText}>Barkod Tara</Text>
              <Text style={styles.scanButtonSubtext}>Ürünü tara, etik bilgisini öğren</Text>
            </View>
            {/* Decorative glow */}
            <View style={styles.scanGlow} />
          </TouchableOpacity>
        </Animated.View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="scan-outline" size={24} color={Colors.primaryLight} />
            <Text style={styles.statNumber}>{totalScans}</Text>
            <Text style={styles.statLabel}>Toplam Tarama</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="analytics-outline" size={24} color={Colors.secondary} />
            <Text style={styles.statNumber}>{avgScore || '-'}</Text>
            <Text style={styles.statLabel}>Ort. Etik Skor</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="leaf-outline" size={24} color={Colors.accent} />
            <Text style={styles.statNumber}>{recentScans.filter(s => s.ethicScore >= 80).length}</Text>
            <Text style={styles.statLabel}>Etik Ürün</Text>
          </View>
        </View>

        {/* Manual Barcode Entry */}
        <TouchableOpacity
          style={styles.manualEntry}
          onPress={() => router.push('/scan?manual=true')}
          activeOpacity={0.7}
        >
          <Ionicons name="keypad-outline" size={22} color={Colors.primaryLight} />
          <Text style={styles.manualEntryText}>Manuel Barkod Gir</Text>
          <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
        </TouchableOpacity>

        {/* Recent Scans */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Son Taramalar</Text>
          {recentScans.length > 0 && (
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={styles.seeAll}>Tümünü Gör</Text>
            </TouchableOpacity>
          )}
        </View>

        {recentScans.length > 0 ? (
          recentScans.map((item, index) => (
            <View key={item.barcode + index}>
              {renderRecentItem({ item, index })}
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="scan-circle-outline" size={60} color="rgba(255,255,255,0.15)" />
            <Text style={styles.emptyText}>Henüz bir ürün taramadınız</Text>
            <Text style={styles.emptySubtext}>İlk barkodunuzu tarayarak başlayın!</Text>
          </View>
        )}

        {/* Bottom padding for tab bar */}
        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: Colors.textLight,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: Colors.textMuted,
    marginTop: 4,
  },
  logoSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  scanButtonContainer: {
    marginBottom: Spacing.xl,
  },
  scanButton: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  scanButtonInner: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.xl + 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.4)',
  },
  scanGlow: {
    position: 'absolute',
    top: -20,
    left: '20%',
    right: '20%',
    height: 40,
    backgroundColor: Colors.primaryLight,
    opacity: 0.15,
    borderRadius: 20,
    transform: [{ scaleX: 1.5 }],
  },
  scanIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  scanButtonText: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: Colors.textLight,
    marginBottom: 4,
  },
  scanButtonSubtext: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.7)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: Colors.textLight,
    marginTop: Spacing.xs,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: Colors.textMuted,
    marginTop: 2,
  },
  manualEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  manualEntryText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: Colors.textLight,
    marginLeft: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.textLight,
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.primaryLight,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  recentScore: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  recentScoreText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.textLight,
  },
  recentBrand: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.textMuted,
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: 'rgba(255,255,255,0.4)',
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.25)',
    marginTop: Spacing.xs,
  },
});
