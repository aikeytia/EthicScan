// Sample Product Data for EthicScan
// This data will be used locally and can be seeded to Firestore

export const sampleProducts = [
  // ====== KIŞISEL BAKIM - DÜŞÜK ETİK ======
  {
    barcode: "8690637058851",
    name: "Clear Men Cool Sport Şampuan",
    brand: "Clear (Unilever)",
    category: "Kişisel Bakım / Şampuan",
    imageUrl: "https://images.openfoodfacts.org/images/products/869/063/705/8851/front_en.3.400.jpg",
    ethicInfo: {
      animalTesting: true,
      vegan: false,
      crueltyFree: false,
      sustainable: false,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: false,
      recyclablePackaging: true,
    },
    ethicScore: 10,
    description: "Unilever markasıdır. Çin pazarında satış yaptığı için zorunlu hayvan deneyi uygulamaktadır.",
    alternatives: ["8691234000001", "8691234000002"],
  },
  {
    barcode: "3600523735099",
    name: "L'Oréal Paris Elseve Şampuan",
    brand: "L'Oréal",
    category: "Kişisel Bakım / Şampuan",
    imageUrl: null,
    ethicInfo: {
      animalTesting: true,
      vegan: false,
      crueltyFree: false,
      sustainable: false,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: false,
      recyclablePackaging: true,
    },
    ethicScore: 10,
    description: "L'Oréal Group markasıdır. Hayvan deneyi uygulamalarıyla bilinen şirketler arasındadır.",
    alternatives: ["8691234000001", "8691234000003"],
  },
  {
    barcode: "4005900036131",
    name: "Nivea Creme",
    brand: "Nivea (Beiersdorf)",
    category: "Kişisel Bakım / Cilt Bakım",
    imageUrl: null,
    ethicInfo: {
      animalTesting: true,
      vegan: false,
      crueltyFree: false,
      sustainable: false,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: false,
      recyclablePackaging: true,
    },
    ethicScore: 10,
    description: "Beiersdorf markasıdır. Çin pazarı nedeniyle hayvan deneyi kapsamındadır.",
    alternatives: ["8691234000003"],
  },
  {
    barcode: "8690506484149",
    name: "Head & Shoulders Şampuan",
    brand: "Head & Shoulders (P&G)",
    category: "Kişisel Bakım / Şampuan",
    imageUrl: null,
    ethicInfo: {
      animalTesting: true,
      vegan: false,
      crueltyFree: false,
      sustainable: false,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: false,
      recyclablePackaging: true,
    },
    ethicScore: 10,
    description: "Procter & Gamble markasıdır. Hayvan deneyi yapan firmalar arasındadır.",
    alternatives: ["8691234000001", "8691234000002"],
  },

  // ====== KIŞISEL BAKIM - YÜKSEK ETİK ======
  {
    barcode: "8691234000001",
    name: "The Body Shop Tea Tree Şampuan",
    brand: "The Body Shop",
    category: "Kişisel Bakım / Şampuan",
    imageUrl: null,
    ethicInfo: {
      animalTesting: false,
      vegan: true,
      crueltyFree: true,
      sustainable: true,
      fairTrade: true,
      organicCertified: false,
      palmOilFree: false,
      recyclablePackaging: true,
    },
    ethicScore: 85,
    description: "The Body Shop, hayvan deneyi karşıtı aktivizmin öncülerindendir. Leaping Bunny sertifikalıdır.",
    alternatives: [],
  },
  {
    barcode: "8691234000002",
    name: "Bioblas Botanic Oils Şampuan",
    brand: "Bioblas",
    category: "Kişisel Bakım / Şampuan",
    imageUrl: null,
    ethicInfo: {
      animalTesting: false,
      vegan: true,
      crueltyFree: true,
      sustainable: true,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: true,
      recyclablePackaging: true,
    },
    ethicScore: 80,
    description: "Türk markası Bioblas, vegan formüllere sahip ve hayvan deneyi yapmamaktadır.",
    alternatives: [],
  },
  {
    barcode: "8691234000003",
    name: "Lush Dream Cream",
    brand: "Lush",
    category: "Kişisel Bakım / Cilt Bakım",
    imageUrl: null,
    ethicInfo: {
      animalTesting: false,
      vegan: true,
      crueltyFree: true,
      sustainable: true,
      fairTrade: true,
      organicCertified: true,
      palmOilFree: true,
      recyclablePackaging: true,
    },
    ethicScore: 100,
    description: "Lush, %100 vegan ve cruelty-free markadır. Naked (ambalajsız) ürün seçenekleri sunar.",
    alternatives: [],
  },

  // ====== GIDA - KARMA ======
  {
    barcode: "8690504056157",
    name: "Ülker Çikolatalı Gofret",
    brand: "Ülker",
    category: "Gıda / Atıştırmalık",
    imageUrl: null,
    ethicInfo: {
      animalTesting: false,
      vegan: false,
      crueltyFree: true,
      sustainable: false,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: false,
      recyclablePackaging: true,
    },
    ethicScore: 35,
    description: "Ülker, palm yağı kullanımı nedeniyle sürdürülebilirlik endişeleri taşımaktadır.",
    alternatives: ["8691234000010"],
  },
  {
    barcode: "8690504032366",
    name: "Eti Burçak Bisküvi",
    brand: "Eti",
    category: "Gıda / Atıştırmalık",
    imageUrl: null,
    ethicInfo: {
      animalTesting: false,
      vegan: false,
      crueltyFree: true,
      sustainable: false,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: false,
      recyclablePackaging: true,
    },
    ethicScore: 35,
    description: "Eti, geleneksel Türk markasıdır. Palm yağı içeren ürünleri bulunmaktadır.",
    alternatives: ["8691234000010"],
  },
  {
    barcode: "8691234000010",
    name: "Dardanel Organik Tahıl Barı",
    brand: "Dardanel",
    category: "Gıda / Atıştırmalık",
    imageUrl: null,
    ethicInfo: {
      animalTesting: false,
      vegan: true,
      crueltyFree: true,
      sustainable: true,
      fairTrade: false,
      organicCertified: true,
      palmOilFree: true,
      recyclablePackaging: true,
    },
    ethicScore: 90,
    description: "Organik sertifikalı, vegan ve sürdürülebilir üretim yapılmaktadır.",
    alternatives: [],
  },

  // ====== TEMİZLİK ======
  {
    barcode: "8690506434748",
    name: "Fairy Sıvı Bulaşık Deterjanı",
    brand: "Fairy (P&G)",
    category: "Temizlik / Bulaşık",
    imageUrl: null,
    ethicInfo: {
      animalTesting: true,
      vegan: false,
      crueltyFree: false,
      sustainable: false,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: false,
      recyclablePackaging: true,
    },
    ethicScore: 10,
    description: "Procter & Gamble markasıdır. Hayvan deneyi yapan firmalar arasındadır.",
    alternatives: ["8691234000020"],
  },
  {
    barcode: "8691234000020",
    name: "Frosch Limonlu Bulaşık Deterjanı",
    brand: "Frosch",
    category: "Temizlik / Bulaşık",
    imageUrl: null,
    ethicInfo: {
      animalTesting: false,
      vegan: true,
      crueltyFree: true,
      sustainable: true,
      fairTrade: false,
      organicCertified: true,
      palmOilFree: true,
      recyclablePackaging: true,
    },
    ethicScore: 90,
    description: "Frosch, doğa dostu Alman markasıdır. Hayvan deneyi yapmaz ve biyolojik olarak parçalanabilir formüller kullanır.",
    alternatives: [],
  },

  // ====== KOZMETİK ======
  {
    barcode: "3614272049529",
    name: "Maybelline Fit Me Foundation",
    brand: "Maybelline (L'Oréal)",
    category: "Kozmetik / Fondöten",
    imageUrl: null,
    ethicInfo: {
      animalTesting: true,
      vegan: false,
      crueltyFree: false,
      sustainable: false,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: false,
      recyclablePackaging: false,
    },
    ethicScore: 0,
    description: "L'Oréal grubuna ait Maybelline, hayvan deneyi yapan markalar arasındadır.",
    alternatives: ["8691234000030"],
  },
  {
    barcode: "8691234000030",
    name: "e.l.f. Flawless Finish Foundation",
    brand: "e.l.f. Cosmetics",
    category: "Kozmetik / Fondöten",
    imageUrl: null,
    ethicInfo: {
      animalTesting: false,
      vegan: true,
      crueltyFree: true,
      sustainable: true,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: true,
      recyclablePackaging: true,
    },
    ethicScore: 85,
    description: "e.l.f. %100 vegan ve cruelty-free kozmetik markasıdır. Uygun fiyatlı etik alternatif sunar.",
    alternatives: [],
  },

  // ====== İÇECEK ======
  {
    barcode: "5449000000996",
    name: "Coca-Cola",
    brand: "Coca-Cola",
    category: "Gıda / İçecek",
    imageUrl: null,
    ethicInfo: {
      animalTesting: false,
      vegan: true,
      crueltyFree: true,
      sustainable: false,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: true,
      recyclablePackaging: true,
    },
    ethicScore: 55,
    description: "Coca-Cola, sürdürülebilirlik ve su kullanımı konularında eleştirilmektedir.",
    alternatives: ["8691234000040"],
  },
  {
    barcode: "8691234000040",
    name: "Organik Limonata",
    brand: "Doğadan",
    category: "Gıda / İçecek",
    imageUrl: null,
    ethicInfo: {
      animalTesting: false,
      vegan: true,
      crueltyFree: true,
      sustainable: true,
      fairTrade: true,
      organicCertified: true,
      palmOilFree: true,
      recyclablePackaging: true,
    },
    ethicScore: 100,
    description: "Organik sertifikalı, adil ticaret uyumlu ve sürdürülebilir üretim yapılmaktadır.",
    alternatives: [],
  },

  // Extra products for variety
  {
    barcode: "8690637055027",
    name: "Dove Güzellik Sabunu",
    brand: "Dove (Unilever)",
    category: "Kişisel Bakım / Sabun",
    imageUrl: null,
    ethicInfo: {
      animalTesting: true,
      vegan: false,
      crueltyFree: false,
      sustainable: false,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: false,
      recyclablePackaging: true,
    },
    ethicScore: 10,
    description: "Unilever markasıdır. PETA tarafından hayvan deneyi yapan firmalar listesindedir.",
    alternatives: ["8691234000001", "8691234000003"],
  },
  {
    barcode: "3017624010701",
    name: "Nutella",
    brand: "Ferrero",
    category: "Gıda / Kahvaltılık",
    imageUrl: null,
    ethicInfo: {
      animalTesting: false,
      vegan: false,
      crueltyFree: true,
      sustainable: false,
      fairTrade: false,
      organicCertified: false,
      palmOilFree: false,
      recyclablePackaging: true,
    },
    ethicScore: 35,
    description: "Ferrero, yoğun palm yağı kullanımı nedeniyle orman tahribatı endişesi yaratmaktadır.",
    alternatives: ["8691234000010"],
  },
];

/**
 * Get all sample products as a map indexed by barcode
 */
export const getSampleProductsMap = () => {
  const map = {};
  sampleProducts.forEach(product => {
    map[product.barcode] = product;
  });
  return map;
};

/**
 * Find a sample product by barcode
 */
export const findSampleProduct = (barcode) => {
  return sampleProducts.find(p => p.barcode === barcode) || null;
};

/**
 * Get alternatives from sample data
 */
export const getSampleAlternatives = (barcodes) => {
  if (!barcodes || barcodes.length === 0) return [];
  return barcodes
    .map(barcode => sampleProducts.find(p => p.barcode === barcode))
    .filter(Boolean);
};
