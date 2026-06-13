// History Screen - Shows all past scans
import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../../constants/Colors';
import { getHistory, clearHistory } from '../../services/productService';
import { getScoreColor, getScoreLevel } from '../../services/ethicScoreCalculator';

export default function HistoryScreen() {
  const router = useRouter();
  const [history, setHistory] = useState([]);

  useFocusEffect(useCallback(() => { loadHistory(); }, []));

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  const handleClear = () => {
    Alert.alert('Geçmişi Temizle', 'Tüm tarama geçmişiniz silinecek. Emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Temizle', style: 'destructive', onPress: async () => { await clearHistory(); setHistory([]); } },
    ]);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr); const now = new Date();
    const mins = Math.floor((now - d) / 60000);
    if (mins < 1) return 'Az önce';
    if (mins < 60) return `${mins} dk önce`;
    if (mins < 1440) return `${Math.floor(mins/60)} saat önce`;
    return d.toLocaleDateString('tr-TR');
  };

  const renderItem = ({ item }) => {
    const level = getScoreLevel(item.ethicScore);
    return (
      <TouchableOpacity style={styles.item} onPress={() => router.push(`/product/${item.barcode}`)} activeOpacity={0.7}>
        <View style={[styles.scoreCircle, { backgroundColor: getScoreColor(item.ethicScore) + '20' }]}>
          <Text style={[styles.scoreText, { color: getScoreColor(item.ethicScore) }]}>{item.ethicScore}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName} numberOfLines={1}>{item.productName}</Text>
          <Text style={styles.itemBrand} numberOfLines={1}>{item.brand}</Text>
          <View style={styles.row}>
            <Text style={styles.itemDate}>{formatDate(item.scannedAt)}</Text>
            <Text style={[styles.itemLevel, { color: getScoreColor(item.ethicScore) }]}>{level.emoji} {level.label}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tarama Geçmişi</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
            <Ionicons name="trash-outline" size={18} color={Colors.danger} />
          </TouchableOpacity>
        )}
      </View>
      {history.length > 0 ? (
        <FlatList data={history} keyExtractor={(item, i) => item.barcode + i} renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: Spacing.lg, paddingBottom: 100 }} showsVerticalScrollIndicator={false} />
      ) : (
        <View style={styles.empty}>
          <Ionicons name="time-outline" size={70} color="rgba(255,255,255,0.1)" />
          <Text style={styles.emptyTitle}>Geçmiş Boş</Text>
          <Text style={styles.emptyText}>Bir ürünü taradığınızda burada görünecek</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundDark },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold', color: Colors.textLight },
  clearBtn: { padding: Spacing.sm },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  scoreCircle: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md },
  scoreText: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: Colors.textLight },
  itemBrand: { fontSize: 13, fontFamily: 'Inter_400Regular', color: Colors.textMuted, marginTop: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  itemDate: { fontSize: 11, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.3)' },
  itemLevel: { fontSize: 11, fontFamily: 'Inter_500Medium' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: Spacing.xl },
  emptyTitle: { fontSize: 20, fontFamily: 'Inter_600SemiBold', color: 'rgba(255,255,255,0.4)', marginTop: Spacing.lg },
  emptyText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.25)', marginTop: Spacing.xs, textAlign: 'center' },
});
