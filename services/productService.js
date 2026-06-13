// Product Service - Handles all product-related operations
// Works with Firestore and falls back to Open Food Facts API
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  query, 
  where,
  orderBy,
  limit,
  addDoc,
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { fetchProductFromOpenFoodFacts } from './openFoodFactsApi';
import { calculateEthicScore } from './ethicScoreCalculator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRODUCTS_COLLECTION = 'products';
const HISTORY_KEY = '@ethicscan_history';
const FAVORITES_KEY = '@ethicscan_favorites';

/**
 * Look up a product by barcode
 * Priority: 1. Firestore DB → 2. Open Food Facts API → 3. Not Found
 */
export const lookupProduct = async (barcode) => {
  try {
    // 1. Try Firestore first
    const firestoreProduct = await getProductFromFirestore(barcode);
    if (firestoreProduct) {
      return { ...firestoreProduct, found: true };
    }

    // 2. Fallback to Open Food Facts API
    const offProduct = await fetchProductFromOpenFoodFacts(barcode);
    if (offProduct) {
      const score = calculateEthicScore(offProduct.ethicInfo);
      const productWithScore = {
        ...offProduct,
        ethicScore: score,
        description: 'Bu ürün Open Food Facts veritabanından alınmıştır. Etik bilgileri tahminidir.',
        alternatives: [],
        found: true,
      };
      return productWithScore;
    }

    // 3. Not found
    return { barcode, found: false };
  } catch (error) {
    console.error('Product lookup error:', error);
    // If Firebase fails (e.g., no internet or bad config), try OFF API
    try {
      const offProduct = await fetchProductFromOpenFoodFacts(barcode);
      if (offProduct) {
        const score = calculateEthicScore(offProduct.ethicInfo);
        return { ...offProduct, ethicScore: score, alternatives: [], found: true };
      }
    } catch (e) {
      console.error('Fallback also failed:', e);
    }
    return { barcode, found: false };
  }
};

/**
 * Get product from Firestore
 */
const getProductFromFirestore = async (barcode) => {
  try {
    // If using dummy config, skip Firestore to prevent hanging
    if (db.app.options.apiKey.includes('Demo_Replace')) {
      return null;
    }
    const docRef = doc(db, PRODUCTS_COLLECTION, barcode);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Firestore read error:', error);
    return null;
  }
};

/**
 * Get alternative products for a given list of barcodes
 */
export const getAlternativeProducts = async (barcodes) => {
  if (!barcodes || barcodes.length === 0) return [];
  
  try {
    const alternatives = [];
    for (const barcode of barcodes.slice(0, 5)) {
      const product = await getProductFromFirestore(barcode);
      if (product) alternatives.push(product);
    }
    return alternatives;
  } catch (error) {
    console.error('Error fetching alternatives:', error);
    return [];
  }
};

// ====== LOCAL STORAGE (History & Favorites) ======

/**
 * Save scan to history (local storage)
 */
export const saveToHistory = async (product) => {
  try {
    const history = await getHistory();
    const entry = {
      barcode: product.barcode,
      productName: product.name,
      brand: product.brand || '',
      ethicScore: product.ethicScore || 0,
      imageUrl: product.imageUrl || null,
      scannedAt: new Date().toISOString(),
    };
    
    // Remove duplicate if exists
    const filtered = history.filter(h => h.barcode !== product.barcode);
    const updated = [entry, ...filtered].slice(0, 50); // Keep last 50
    
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving history:', error);
    return [];
  }
};

/**
 * Get scan history from local storage
 */
export const getHistory = async () => {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
};

/**
 * Clear scan history
 */
export const clearHistory = async () => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

/**
 * Toggle favorite status
 */
export const toggleFavorite = async (product) => {
  try {
    const favorites = await getFavorites();
    const exists = favorites.find(f => f.barcode === product.barcode);
    
    let updated;
    if (exists) {
      updated = favorites.filter(f => f.barcode !== product.barcode);
    } else {
      const entry = {
        barcode: product.barcode,
        productName: product.name,
        brand: product.brand || '',
        ethicScore: product.ethicScore || 0,
        imageUrl: product.imageUrl || null,
        addedAt: new Date().toISOString(),
      };
      updated = [entry, ...favorites];
    }
    
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return { favorites: updated, isFavorite: !exists };
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return { favorites: [], isFavorite: false };
  }
};

/**
 * Get favorites from local storage
 */
export const getFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

/**
 * Check if product is favorite
 */
export const isFavorite = async (barcode) => {
  try {
    const favorites = await getFavorites();
    return favorites.some(f => f.barcode === barcode);
  } catch (error) {
    return false;
  }
};
