// Favorites Screen
import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../../constants/Colors';
import { getFavorites } from '../../services/productService';
import { getScoreColor, getScoreLevel } from '../../services/ethicScoreCalculator';

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(useCallback(() => { loadFavorites(); }, []));

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
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
          <Text style={[styles.itemLevel, { color: getScoreColor(item.ethicScore) }]}>{level.emoji} {level.label}</Text>
        </View>
        <Ionicons name="heart" size={22} color={Colors.danger} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorilerim</Text>
        <Ionicons name="heart" size={24} color={Colors.danger} />
      </View>
      {favorites.length > 0 ? (
        <FlatList data={favorites} keyExtractor={(item, i) => item.barcode + i} renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: Spacing.lg, paddingBottom: 100 }} showsVerticalScrollIndicator={false} />
      ) : (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={70} color="rgba(255,255,255,0.1)" />
          <Text style={styles.emptyTitle}>Favori Yok</Text>
          <Text style={styles.emptyText}>Beğendiğiniz ürünleri favorilere ekleyin</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundDark },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold', color: Colors.textLight },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  scoreCircle: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md },
  scoreText: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: Colors.textLight },
  itemBrand: { fontSize: 13, fontFamily: 'Inter_400Regular', color: Colors.textMuted, marginTop: 2 },
  itemLevel: { fontSize: 12, fontFamily: 'Inter_500Medium', marginTop: 4 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: Spacing.xl },
  emptyTitle: { fontSize: 20, fontFamily: 'Inter_600SemiBold', color: 'rgba(255,255,255,0.4)', marginTop: Spacing.lg },
  emptyText: { fontSize: 14, fontFamily: 'Inter_400Regular', color: 'rgba(255,255,255,0.25)', marginTop: Spacing.xs, textAlign: 'center' },
});
