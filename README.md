# 🌿 EthicScan - Barkod Tabanlı Etik Rehber

<div align="center">

**Bilinçli Tüketim için Akıllı Rehberiniz**

Market ürünlerinin barkodunu tarayarak etik üretim süreçlerini (hayvan deneyi, sürdürülebilirlik, adil ticaret) raporlayan mobil uygulama.

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)

</div>

---

## 📋 İçindekiler

- [🎯 Proje Hakkında](#-proje-hakkında)
- [✨ Özellikler](#-özellikler)
- [🛠️ Teknoloji Yığını](#️-teknoloji-yığını)
- [📱 Ekran Görüntüleri](#-ekran-görüntüleri)
- [🚀 Kurulum](#-kurulum)
- [📁 Proje Yapısı](#-proje-yapısı)
- [🗃️ Veritabanı Şeması](#️-veritabanı-şeması)
- [🧮 Etik Skor Hesaplama](#-etik-skor-hesaplama)
- [🤝 Katkıda Bulunma](#-katkıda-bulunma)
- [📄 Lisans](#-lisans)

---

## 🎯 Proje Hakkında

**EthicScan**, tüketicilerin bilinçli alışveriş yapmalarına yardımcı olan yenilikçi bir mobil uygulamadır.

### Problem
Tüketiciler market alışverişi sırasında ürünlerin etik üretim süreçleri hakkında yeterli bilgiye sahip değildir. Hayvan deneyi, sürdürülebilirlik, adil ticaret gibi kriterleri araştırmak zaman alıcı ve karmaşıktır.

### Çözüm
EthicScan, ürün barkodunu tarayarak saniyeler içinde kapsamlı bir etik rapor sunar ve daha etik alternatifler önerir.

### Hedef Kitle
- 🐰 Hayvan hakları savunucuları
- 🌱 Veganlar ve vejetaryenler
- ♻️ Çevre bilincine sahip tüketiciler
- 🤝 Adil ticaret destekçileri

---

## ✨ Özellikler

### Temel Özellikler
- 📷 **Barkod Tarama**: Kamera ile anlık barkod okuma (EAN-13, EAN-8, UPC-A/E)
- 📊 **Etik Skor**: 0-100 arası kapsamlı etik değerlendirme
- 🔍 **Detaylı Rapor**: 8 farklı etik kriter ile değerlendirme
- 🔄 **Alternatif Öneriler**: Daha etik ürün önerileri
- 📝 **Manuel Giriş**: Barkod numarası ile arama
- 📜 **Tarama Geçmişi**: Tüm taramalarınızın kaydı
- ❤️ **Favoriler**: Beğendiğiniz ürünleri kaydedin

### Bonus / Eğlence Özellikleri
- 🌍 **Mutlu Dünya Animasyonu**: Etik skor ≥ 80 olan ürünlerde dans eden dünya
- 🐧 **Üzgün Penguen Animasyonu**: Düşük etik skorlu ürünlerde üzgün penguen
- 📳 **Haptic Feedback**: Tarama anında titreşim geri bildirimi
- ✨ **Micro-Animasyonlar**: Akıcı geçişler ve stagger efektleri

---

## 🛠️ Teknoloji Yığını

| Teknoloji | Kullanım Alanı |
|-----------|---------------|
| **React Native (Expo)** | Cross-platform mobil geliştirme |
| **Expo Router** | File-based navigation |
| **Expo Camera** | Barkod tarama (ML Kit) |
| **Firebase Firestore** | Bulut veritabanı |
| **Open Food Facts API** | Harici ürün veritabanı |
| **Lottie** | Animasyonlar |
| **AsyncStorage** | Yerel veri depolama |
| **Expo Haptics** | Dokunsal geri bildirim |

### Mimari
- **MVVM-benzeri yapı** ile servisler ve UI ayrımı
- **File-based routing** ile Expo Router
- **Offline-first** yaklaşım (sample data + local storage)
- **API fallback** mekanizması (Firestore → Open Food Facts → Local)

---

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Expo Go uygulaması (telefon)

### Adımlar

```bash
# 1. Repoyu klonlayın
git clone https://github.com/KULLANICI_ADI/EthicScan.git
cd EthicScan

# 2. Bağımlılıkları kurun
npm install

# 3. Firebase yapılandırması (opsiyonel)
# services/firebase.js dosyasında kendi Firebase bilgilerinizi girin

# 4. Uygulamayı başlatın
npx expo start

# 5. Expo Go ile QR kodu okutun
```

### Firebase Kurulumu (Opsiyonel)
1. [Firebase Console](https://console.firebase.google.com)'da yeni proje oluşturun
2. Web uygulaması ekleyin
3. Config bilgilerini `services/firebase.js` dosyasına yapıştırın
4. Firestore Database oluşturun

---

## 📁 Proje Yapısı

```
EthicScan/
├── app/                          # Expo Router sayfaları
│   ├── _layout.js                # Root layout
│   ├── index.js                  # Welcome screen
│   ├── scan.js                   # Barkod tarama
│   ├── (tabs)/                   # Tab navigasyon
│   │   ├── _layout.js            # Tab bar config
│   │   ├── home.js               # Ana ekran
│   │   ├── history.js            # Geçmiş
│   │   └── favorites.js          # Favoriler
│   └── product/
│       └── [barcode].js          # Ürün detay (dynamic)
├── assets/
│   └── animations/               # Lottie JSON dosyaları
├── constants/
│   └── Colors.js                 # Tasarım tokenleri
├── data/
│   └── sampleProducts.js         # Örnek ürün verileri
├── services/
│   ├── firebase.js               # Firebase config
│   ├── productService.js         # Ürün servisi
│   ├── openFoodFactsApi.js       # API entegrasyonu
│   └── ethicScoreCalculator.js   # Skor hesaplama
└── README.md
```

---

## 🗃️ Veritabanı Şeması

### Products Collection (Firestore)
```json
{
  "barcode": "8690637058851",
  "name": "Clear Men Şampuan",
  "brand": "Clear (Unilever)",
  "category": "Kişisel Bakım / Şampuan",
  "ethicInfo": {
    "animalTesting": true,
    "vegan": false,
    "crueltyFree": false,
    "sustainable": false,
    "fairTrade": false,
    "organicCertified": false,
    "palmOilFree": false,
    "recyclablePackaging": true
  },
  "ethicScore": 10,
  "alternatives": ["8691234000001"]
}
```

---

## 🧮 Etik Skor Hesaplama

| Kriter | Puan | Açıklama |
|--------|------|----------|
| Hayvan Deneyi Yok | +20 | En ağırlıklı kriter |
| Vegan | +15 | Hayvansal içerik yok |
| Cruelty-Free | +15 | Sertifikalı |
| Sürdürülebilir | +15 | Ekolojik üretim |
| Adil Ticaret | +10 | Fair Trade |
| Organik | +10 | Sertifikalı |
| Palm Yağı İçermez | +5 | Orman koruması |
| Geri Dönüşüm | +10 | Ambalaj |

**Skor Seviyeleri:**
- 🟢 80-100: Mükemmel
- 🟡 60-79: İyi  
- 🟠 40-59: Orta
- 🔴 0-39: Düşük

---

## 👨‍💻 Geliştirici

Bu proje, Mobil Programlama dersi kapsamında geliştirilmiştir.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

<div align="center">

**🌿 Bilinçli tüketim, daha iyi bir dünya için küçük ama güçlü bir adımdır.**

</div>
