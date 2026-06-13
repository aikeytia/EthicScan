// Ethic Score Calculator for EthicScan
// Calculates an overall ethical score based on various criteria

/**
 * Calculate overall ethic score from product ethic info
 * @param {Object} ethicInfo - Product ethical information
 * @returns {number} Score between 0-100
 */
export const calculateEthicScore = (ethicInfo) => {
  if (!ethicInfo) return 0;

  const criteria = {
    animalTesting: { weight: 20, inverted: true }, // true = bad, so inverted
    vegan: { weight: 15, inverted: false },
    crueltyFree: { weight: 15, inverted: false },
    sustainable: { weight: 15, inverted: false },
    fairTrade: { weight: 10, inverted: false },
    organicCertified: { weight: 10, inverted: false },
    palmOilFree: { weight: 5, inverted: false },
    recyclablePackaging: { weight: 10, inverted: false },
  };

  let score = 0;
  for (const [key, config] of Object.entries(criteria)) {
    if (ethicInfo[key] !== undefined) {
      const value = config.inverted ? !ethicInfo[key] : ethicInfo[key];
      if (value) score += config.weight;
    }
  }

  return Math.min(100, Math.max(0, score));
};

/**
 * Get score level based on numeric score
 * @param {number} score - Ethic score 0-100
 * @returns {Object} Level info with label, color, and emoji
 */
export const getScoreLevel = (score) => {
  if (score >= 80) {
    return {
      level: 'excellent',
      label: 'Mükemmel',
      labelEn: 'Excellent',
      emoji: '🌟',
      description: 'Bu ürün yüksek etik standartlara sahip!',
    };
  } else if (score >= 60) {
    return {
      level: 'good',
      label: 'İyi',
      labelEn: 'Good',
      emoji: '👍',
      description: 'Bu ürün iyi etik standartlara sahip.',
    };
  } else if (score >= 40) {
    return {
      level: 'medium',
      label: 'Orta',
      labelEn: 'Average',
      emoji: '⚠️',
      description: 'Bu ürünün etik değerlendirmesi orta seviyede.',
    };
  } else {
    return {
      level: 'low',
      label: 'Düşük',
      labelEn: 'Low',
      emoji: '❌',
      description: 'Bu ürün etik açıdan endişe verici.',
    };
  }
};

/**
 * Get color for ethic score
 * @param {number} score - Ethic score 0-100
 * @returns {string} Color hex code
 */
export const getScoreColor = (score) => {
  if (score >= 80) return '#2E7D32';
  if (score >= 60) return '#66BB6A';
  if (score >= 40) return '#FFA726';
  return '#EF5350';
};

/**
 * Get ethic criteria display info
 * @returns {Array} Array of criteria objects with display info
 */
export const getEthicCriteriaList = () => [
  {
    key: 'animalTesting',
    label: 'Hayvan Deneyi',
    icon: '🐰',
    goodValue: false,
    goodLabel: 'Hayvan deneyi yapılmıyor',
    badLabel: 'Hayvan deneyi yapılıyor',
  },
  {
    key: 'vegan',
    label: 'Vegan',
    icon: '🌱',
    goodValue: true,
    goodLabel: '%100 Vegan',
    badLabel: 'Hayvansal içerik mevcut',
  },
  {
    key: 'crueltyFree',
    label: 'Cruelty-Free',
    icon: '💚',
    goodValue: true,
    goodLabel: 'Cruelty-Free sertifikalı',
    badLabel: 'Cruelty-Free sertifikası yok',
  },
  {
    key: 'sustainable',
    label: 'Sürdürülebilir',
    icon: '♻️',
    goodValue: true,
    goodLabel: 'Sürdürülebilir üretim',
    badLabel: 'Sürdürülebilirlik bilgisi yok',
  },
  {
    key: 'fairTrade',
    label: 'Adil Ticaret',
    icon: '🤝',
    goodValue: true,
    goodLabel: 'Adil Ticaret sertifikalı',
    badLabel: 'Adil Ticaret sertifikası yok',
  },
  {
    key: 'organicCertified',
    label: 'Organik',
    icon: '🌿',
    goodValue: true,
    goodLabel: 'Organik sertifikalı',
    badLabel: 'Organik sertifikası yok',
  },
  {
    key: 'palmOilFree',
    label: 'Palm Yağı',
    icon: '🌴',
    goodValue: true,
    goodLabel: 'Palm yağı içermiyor',
    badLabel: 'Palm yağı içeriyor',
  },
  {
    key: 'recyclablePackaging',
    label: 'Geri Dönüşüm',
    icon: '📦',
    goodValue: true,
    goodLabel: 'Geri dönüştürülebilir ambalaj',
    badLabel: 'Geri dönüştürülemez ambalaj',
  },
];
