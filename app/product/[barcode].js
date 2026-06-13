// Product Detail Screen - Shows product ethic info with animations
import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Colors, Spacing, BorderRadius } from '../../constants/Colors';
import { findSampleProduct, getSampleAlternatives } from '../../data/sampleProducts';
import { lookupProduct, toggleFavorite, isFavorite as checkFavorite, getAlternativeProducts } from '../../services/productService';
import { getScoreColor, getScoreLevel, getEthicCriteriaList, calculateEthicScore } from '../../services/ethicScoreCalculator';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { barcode } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scoreAnim = useRef(new Animated.Value(0)).current;
  const slideAnims = useRef([...Array(8)].map(() => new Animated.Value(50))).current;
  const fadeAnims = useRef([...Array(8)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    loadProduct();
  }, [barcode]);

  const loadProduct = async () => {
    setLoading(true);
    // Check sample data first
    let prod = findSampleProduct(barcode);
    if (prod) {
      setProduct(prod);
      if (prod.alternatives && prod.alternatives.length > 0) {
        const alts = getSampleAlternatives(prod.alternatives);
        setAlternatives(alts);
      }
    } else {
      // Try API
      const result = await lookupProduct(barcode);
      if (result && result.found) {
        setProduct(result);
      } else {
        setProduct({ barcode, name: 'Bilinmeyen Ürün', brand: 'Bilinmeyen', ethicScore: 0, ethicInfo: {}, description: 'Bu ürün veritabanımızda bulunamadı.', alternatives: [] });
      }
    }
    const fav = await checkFavorite(barcode);
    setIsFav(fav);
    setLoading(false);
    startAnimations();
  };

  const startAnimations = () => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    Animated.timing(scoreAnim, { toValue: 1, duration: 1200, delay: 300, useNativeDriver: false }).start();
    // Stagger criteria items
    const anims = slideAnims.map((anim, i) => 
      Animated.parallel([
        Animated.timing(anim, { toValue: 0, duration: 400, delay: 500 + i * 80, useNativeDriver: true }),
        Animated.timing(fadeAnims[i], { toValue: 1, duration: 400, delay: 500 + i * 80, useNativeDriver: true }),
      ])
    );
    Animated.parallel(anims).start();
  };

  const handleToggleFavorite = async () => {
    if (!product) return;
    const result = await toggleFavorite(product);
    setIsFav(result.isFavorite);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryLight} />
        <Text style={styles.loadingText}>Ürün bilgileri yükleniyor...</Text>
      </View>
    );
  }

  if (!product) return null;

  const score = product.ethicScore || 0;
  const scoreLevel = getScoreLevel(score);
  const scoreColor = getScoreColor(score);
  const criteria = getEthicCriteriaList();
  const isEthical = score >= 80;

  const animatedScore = scoreAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, score],
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView style={{ opacity: fadeAnim }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)/home')}>
            <Ionicons name="arrow-back" size={24} color={Colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favBtn} onPress={handleToggleFavorite}>
            <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={24} color={isFav ? Colors.danger : Colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* Animation Section */}
        {showAnimation && (
          <View style={styles.animationContainer}>
            <LottieView
              source={isEthical ? require('../../assets/animations/happy-earth.json') : require('../../assets/animations/sad-penguin.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
            <Text style={[styles.animText, { color: isEthical ? Colors.scoreExcellent : Colors.scoreLow }]}>
              {isEthical ? '🎉 Harika bir seçim!' : '😔 Daha iyi alternatifler var'}
            </Text>
          </View>
        )}

        {/* Product Info Card */}
        <View style={styles.productCard}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productBrand}>{product.brand}</Text>
          {product.category && <Text style={styles.productCategory}>{product.category}</Text>}
        </View>

        {/* Score Circle */}
        <View style={styles.scoreSection}>
          <View style={[styles.scoreCircle, { borderColor: scoreColor }]}>
            <AnimatedText style={[styles.scoreNumber, { color: scoreColor }]} value={animatedScore} />
            <Text style={styles.scoreLabel}>/ 100</Text>
          </View>
          <View style={[styles.scoreBadge, { backgroundColor: scoreColor + '20' }]}>
            <Text style={[styles.scoreBadgeText, { color: scoreColor }]}>{scoreLevel.emoji} {scoreLevel.label}</Text>
          </View>
          <Text style={styles.scoreDesc}>{scoreLevel.description}</Text>
        </View>

        {/* Description */}
        {product.description && (
          <View style={styles.descCard}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.primaryLight} />
            <Text style={styles.descText}>{product.description}</Text>
          </View>
        )}

        {/* Ethic Criteria */}
        <Text style={styles.sectionTitle}>Etik Değerlendirme</Text>
        {criteria.map((criterion, index) => {
          const value = product.ethicInfo ? product.ethicInfo[criterion.key] : undefined;
          const isGood = value !== undefined ? (criterion.goodValue === value) : false;
          return (
            <Animated.View key={criterion.key} style={[styles.criterionItem, { opacity: fadeAnims[index], transform: [{ translateX: slideAnims[index] }] }]}>
              <Text style={styles.criterionIcon}>{criterion.icon}</Text>
              <View style={styles.criterionInfo}>
                <Text style={styles.criterionLabel}>{criterion.label}</Text>
                <Text style={[styles.criterionStatus, { color: isGood ? Colors.success : Colors.danger }]}>
                  {value !== undefined ? (isGood ? criterion.goodLabel : criterion.badLabel) : 'Bilgi yok'}
                </Text>
              </View>
              <Ionicons name={isGood ? 'checkmark-circle' : 'close-circle'} size={24} color={value !== undefined ? (isGood ? Colors.success : Colors.danger) : Colors.textMuted} />
            </Animated.View>
          );
        })}

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>🌱 Daha Etik Alternatifler</Text>
            {alternatives.map((alt) => (
              <TouchableOpacity key={alt.barcode} style={styles.altItem} onPress={() => router.push(`/product/${alt.barcode}`)} activeOpacity={0.7}>
                <View style={[styles.altScore, { backgroundColor: getScoreColor(alt.ethicScore) + '20' }]}>
                  <Text style={[styles.altScoreText, { color: getScoreColor(alt.ethicScore) }]}>{alt.ethicScore}</Text>
                </View>
                <View style={styles.altInfo}>
                  <Text style={styles.altName}>{alt.name}</Text>
                  <Text style={styles.altBrand}>{alt.brand}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Source info */}
        {product.source === 'openfoodfacts' && (
          <View style={styles.sourceCard}>
            <Ionicons name="globe-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.sourceText}>Kaynak: Open Food Facts</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </Animated.ScrollView>
    </View>
  );
}

// Animated number component
function AnimatedText({ style, value }) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    const id = value.addListener(({ value: v }) => { setDisplay(Math.round(v).toString()); });
    return () => value.removeListener(id);
  }, [value]);
  return <Text style={style}>{display}</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundDark },
  loadingContainer: { flex: 1, backgroundColor: Colors.backgroundDark, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, fontFamily: 'Inter_500Medium', color: Colors.textMuted, marginTop: Spacing.md },
  scrollContent: { paddingBottom: Spacing.xxl },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: Platform.OS === 'ios' ? 55 : 35, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  favBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  animationContainer: { alignItems: 'center', paddingVertical: Spacing.md },
  lottie: { width: 180, height: 180 },
  animText: { fontSize: 18, fontFamily: 'Inter_700Bold', marginTop: Spacing.sm },
  productCard: { marginHorizontal: Spacing.lg, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: BorderRadius.xl, padding: Spacing.xl, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  productName: { fontSize: 22, fontFamily: 'Inter_700Bold', color: Colors.textLight, textAlign: 'center' },
  productBrand: { fontSize: 16, fontFamily: 'Inter_500Medium', color: Colors.textMuted, marginTop: 4 },
  productCategory: { fontSize: 13, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.3)', marginTop: 4, backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  scoreSection: { alignItems: 'center', paddingVertical: Spacing.xl },
  scoreCircle: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  scoreNumber: { fontSize: 42, fontFamily: 'Inter_700Bold' },
  scoreLabel: { fontSize: 14, fontFamily: 'Inter_400Regular', color: Colors.textMuted },
  scoreBadge: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, marginTop: Spacing.md },
  scoreBadgeText: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  scoreDesc: { fontSize: 14, fontFamily: 'Inter_400Regular', color: Colors.textMuted, marginTop: Spacing.sm, textAlign: 'center', paddingHorizontal: Spacing.xl },
  descCard: { flexDirection: 'row', marginHorizontal: Spacing.lg, backgroundColor: 'rgba(76,175,80,0.1)', borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.lg, borderWidth: 1, borderColor: 'rgba(76,175,80,0.2)' },
  descText: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular', color: Colors.textLight, marginLeft: Spacing.sm, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', color: Colors.textLight, marginHorizontal: Spacing.lg, marginBottom: Spacing.md, marginTop: Spacing.sm },
  criterionItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: Spacing.lg, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  criterionIcon: { fontSize: 24, marginRight: Spacing.md },
  criterionInfo: { flex: 1 },
  criterionLabel: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: Colors.textLight },
  criterionStatus: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  altItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: Spacing.lg, backgroundColor: 'rgba(76,175,80,0.08)', borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: 'rgba(76,175,80,0.2)' },
  altScore: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md },
  altScoreText: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  altInfo: { flex: 1 },
  altName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: Colors.textLight },
  altBrand: { fontSize: 12, fontFamily: 'Inter_400Regular', color: Colors.textMuted, marginTop: 2 },
  sourceCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Spacing.lg, padding: Spacing.sm },
  sourceText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: Colors.textMuted, marginLeft: 4 },
});
