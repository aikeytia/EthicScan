// Barcode Scanner Screen
import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, BorderRadius } from '../constants/Colors';
import { findSampleProduct } from '../data/sampleProducts';
import { saveToHistory } from '../services/productService';
import { lookupProduct } from '../services/productService';
import { calculateEthicScore } from '../services/ethicScoreCalculator';

const { width, height } = Dimensions.get('window');
const SCAN_AREA = width * 0.7;

export default function ScanScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [showManual, setShowManual] = useState(params.manual === 'true');
  const [manualBarcode, setManualBarcode] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const flashAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Scan line animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(scanLineAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned || isLoading) return;
    setScanned(true);
    setIsLoading(true);
    setErrorMsg(null);

    // Haptic feedback
    try { await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); } catch (e) {}

    // Flash animation
    Animated.sequence([
      Animated.timing(flashAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      Animated.timing(flashAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();

    await processBarcode(data);
  };

  const processBarcode = async (barcode) => {
    try {
      // First check sample data (works offline)
      const sampleProduct = findSampleProduct(barcode);
      if (sampleProduct) {
        await saveToHistory(sampleProduct);
        router.push(`/product/${barcode}`);
        return;
      }

      // Try API lookup
      const product = await lookupProduct(barcode);
      if (product && product.found) {
        await saveToHistory(product);
        router.push(`/product/${barcode}`);
      } else {
        setErrorMsg(`"${barcode}" barkoduna ait ürün bulunamadı.`);
        if (Platform.OS !== 'web') {
          Alert.alert('Ürün Bulunamadı', `"${barcode}" barkoduna ait ürün veritabanımızda bulunamadı.`);
        }
      }
    } catch (error) {
      console.error('Scan error:', error);
      setErrorMsg('Ürün aranırken bir hata oluştu.');
      if (Platform.OS !== 'web') {
        Alert.alert('Hata', 'Ürün aranırken bir hata oluştu.');
      }
    } finally {
      setIsLoading(false);
      setScanned(false);
    }
  };

  const handleManualSubmit = () => {
    const code = manualBarcode.trim();
    if (code.length < 4) {
      setErrorMsg('Lütfen geçerli bir barkod numarası girin.');
      return;
    }
    setScanned(true);
    setIsLoading(true);
    setErrorMsg(null);
    processBarcode(code);
  };

  // Manual barcode entry view
  if (showManual) {
    return (
      <KeyboardAvoidingView style={styles.manualContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="close" size={28} color={Colors.textLight} />
        </TouchableOpacity>
        <View style={styles.manualContent}>
          <View style={styles.manualIcon}>
            <Ionicons name="keypad" size={48} color={Colors.primaryLight} />
          </View>
          <Text style={styles.manualTitle}>Manuel Barkod Girişi</Text>
          <Text style={styles.manualSubtitle}>Ürünün barkod numarasını girin</Text>
          <TextInput
            style={styles.input}
            value={manualBarcode}
            onChangeText={setManualBarcode}
            placeholder="Barkod numarası..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            keyboardType="number-pad"
            autoFocus
            maxLength={20}
          />
          <TouchableOpacity style={styles.submitBtn} onPress={handleManualSubmit} disabled={isLoading}>
            <Text style={styles.submitText}>{isLoading ? 'Aranıyor...' : 'Ara'}</Text>
          </TouchableOpacity>
          {errorMsg && (
            <View style={styles.errorContainer}>
              <Ionicons name="warning" size={20} color={Colors.danger} />
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.switchBtn} onPress={() => setShowManual(false)}>
            <Ionicons name="camera-outline" size={20} color={Colors.primaryLight} />
            <Text style={styles.switchText}>Kamera ile Tara</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // Permission handling
  if (!permission) return <View style={styles.container} />;
  if (!permission.granted) {
    return (
      <View style={styles.permContainer}>
        <Ionicons name="camera-outline" size={60} color={Colors.primaryLight} />
        <Text style={styles.permTitle}>Kamera İzni Gerekli</Text>
        <Text style={styles.permText}>Barkod taramak için kamera erişimine izin verin</Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>İzin Ver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn2} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const scanLineTranslate = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCAN_AREA / 2 + 10, SCAN_AREA / 2 - 10],
  });

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39'] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      {/* Flash overlay */}
      <Animated.View style={[styles.flash, { opacity: flashAnim }]} pointerEvents="none" />

      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Top */}
        <View style={styles.overlayTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)/home')}>
            <Ionicons name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.scanTitle}>Barkod Tara</Text>
          <View style={{ width: 48 }} />
        </View>

        {/* Middle - Scan area */}
        <View style={styles.overlayMiddle}>
          <View style={styles.overlaySide} />
          <View style={styles.scanArea}>
            {/* Corner markers */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
            {/* Scan line */}
            <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanLineTranslate }] }]} />
          </View>
          <View style={styles.overlaySide} />
        </View>

        {/* Bottom */}
        <View style={styles.overlayBottom}>
          <Text style={styles.hint}>
            {isLoading ? '🔍 Ürün aranıyor...' : 'Barkodu çerçevenin içine hizalayın'}
          </Text>
          {scanned && !isLoading && (
            <TouchableOpacity style={styles.rescanBtn} onPress={() => setScanned(false)}>
              <Ionicons name="refresh" size={20} color="#FFF" />
              <Text style={styles.rescanText}>Tekrar Tara</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.manualBtn} onPress={() => setShowManual(true)}>
            <Ionicons name="keypad-outline" size={18} color={Colors.primaryLight} />
            <Text style={styles.manualBtnText}>Manuel Giriş</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  flash: { ...StyleSheet.absoluteFillObject, backgroundColor: '#FFF' },
  overlay: { ...StyleSheet.absoluteFillObject },
  overlayTop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  backButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: Platform.OS === 'ios' ? 55 : 35, left: Spacing.lg, zIndex: 10 },
  scanTitle: { fontSize: 18, fontFamily: 'Inter_600SemiBold', color: '#FFF', textAlign: 'center', flex: 1, marginBottom: Spacing.sm },
  overlayMiddle: { flexDirection: 'row' },
  overlaySide: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  scanArea: { width: SCAN_AREA, height: SCAN_AREA * 0.6, justifyContent: 'center', alignItems: 'center' },
  corner: { position: 'absolute', width: 30, height: 30, borderColor: Colors.primaryLight, borderWidth: 3 },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 8 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 8 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 8 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 8 },
  scanLine: { width: SCAN_AREA - 30, height: 2, backgroundColor: Colors.primaryLight, opacity: 0.8 },
  overlayBottom: { flex: 1.2, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', paddingTop: Spacing.xl },
  hint: { fontSize: 15, fontFamily: 'Inter_500Medium', color: 'rgba(255,255,255,0.8)', textAlign: 'center' },
  rescanBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl, marginTop: Spacing.lg },
  rescanText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#FFF', marginLeft: Spacing.sm },
  manualBtn: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.md, padding: Spacing.sm },
  manualBtnText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: Colors.primaryLight, marginLeft: 6 },
  // Manual entry styles
  manualContainer: { flex: 1, backgroundColor: Colors.backgroundDark },
  manualContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: Spacing.xl },
  manualIcon: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(76,175,80,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.xl },
  manualTitle: { fontSize: 24, fontFamily: 'Inter_700Bold', color: Colors.textLight, marginBottom: Spacing.sm },
  manualSubtitle: { fontSize: 14, fontFamily: 'Inter_400Regular', color: Colors.textMuted, marginBottom: Spacing.xl },
  input: { width: '100%', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: BorderRadius.lg, padding: Spacing.md, fontSize: 20, fontFamily: 'Inter_600SemiBold', color: Colors.textLight, textAlign: 'center', borderWidth: 1, borderColor: 'rgba(76,175,80,0.3)', letterSpacing: 2 },
  submitBtn: { width: '100%', backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, paddingVertical: Spacing.md, alignItems: 'center', marginTop: Spacing.lg },
  submitText: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#FFF' },
  switchBtn: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.lg, padding: Spacing.sm },
  switchText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: Colors.primaryLight, marginLeft: 6 },
  // Permission styles
  permContainer: { flex: 1, backgroundColor: Colors.backgroundDark, justifyContent: 'center', alignItems: 'center', paddingHorizontal: Spacing.xl },
  permTitle: { fontSize: 22, fontFamily: 'Inter_700Bold', color: Colors.textLight, marginTop: Spacing.lg },
  permText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: Colors.textMuted, marginTop: Spacing.sm, textAlign: 'center' },
  permBtn: { backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xxl, marginTop: Spacing.xl },
  permBtnText: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#FFF' },
  backBtn2: { marginTop: Spacing.md, padding: Spacing.sm },
  backBtnText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: Colors.textMuted },
  errorContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(244, 67, 54, 0.1)', padding: Spacing.md, borderRadius: BorderRadius.md, marginTop: Spacing.md, borderWidth: 1, borderColor: 'rgba(244, 67, 54, 0.3)' },
  errorText: { color: Colors.danger, fontFamily: 'Inter_500Medium', fontSize: 14, marginLeft: Spacing.sm },
});
