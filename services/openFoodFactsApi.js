// Open Food Facts API Integration
// Used as fallback when product is not found in our Firestore database

const BASE_URL = 'https://world.openfoodfacts.org/api/v2';

/**
 * Fetch product information from Open Food Facts API
 * @param {string} barcode - Product barcode (EAN-13, UPC-A, etc.)
 * @returns {Object|null} Product data or null if not found
 */
export const fetchProductFromOpenFoodFacts = async (barcode) => {
  try {
    const response = await fetch(
      `${BASE_URL}/product/${barcode}?fields=product_name,brands,categories,image_url,labels_tags,ingredients_analysis_tags,ecoscore_grade,nova_group`,
      {
        headers: {
          'User-Agent': 'EthicScan/1.0 (Mobile App; ethicscan@demo.com)',
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (data.status !== 1 || !data.product) return null;

    const product = data.product;

    // Analyze labels and tags to determine ethical info
    const labels = product.labels_tags || [];
    const ingredientAnalysis = product.ingredients_analysis_tags || [];

    const ethicInfo = {
      animalTesting: false, // Food generally not tested on animals
      vegan: ingredientAnalysis.includes('en:vegan') || labels.includes('en:vegan'),
      crueltyFree: true, // Food products
      sustainable: product.ecoscore_grade ? ['a', 'b'].includes(product.ecoscore_grade) : false,
      fairTrade: labels.some(l => l.includes('fair-trade') || l.includes('fairtrade')),
      organicCertified: labels.some(l => l.includes('organic') || l.includes('bio')),
      palmOilFree: ingredientAnalysis.includes('en:palm-oil-free'),
      recyclablePackaging: false, // Can't determine from API
    };

    return {
      barcode,
      name: product.product_name || 'Bilinmeyen Ürün',
      brand: product.brands || 'Bilinmeyen Marka',
      category: product.categories || 'Genel',
      imageUrl: product.image_url || null,
      ethicInfo,
      source: 'openfoodfacts',
    };
  } catch (error) {
    console.error('Open Food Facts API error:', error);
    return null;
  }
};
