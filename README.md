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
- 🌐 **Global Veritabanı**: Cihaz internete bağlıysa Open Food Facts API üzerinden dünya çapında yüz binlerce ürünün bilgisini anlık olarak çeker ve hesaplar.

### Bonus / Eğlence Özellikleri
- 🌍 **Mutlu Dünya Animasyonu**: Etik skor ≥ 80 olan ürünlerde dans eden dünya
- 🐧 **Üzgün Penguen Animasyonu**: Düşük etik skorlu ürünlerde üzgün penguen
- 📳 **Haptic Feedback**: Tarama anında titreşim geri bildirimi
- ✨ **Micro-Animasyonlar**: Akıcı geçişler ve stagger efektleri
- 📦 **Geniş Veritabanı**: Türk pazarına uygun, hazır ürün örnek verileri

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

## 📱 Ekran Görüntüleri

<img width="452" height="912" alt="Ekran görüntüsü 2026-06-14 015948" src="https://github.com/user-attachments/assets/4eecf4e0-a951-4fd7-8ac3-9545a79ae274" />
<img width="477" height="911" alt="Ekran görüntüsü 2026-06-14 014118" src="https://github.com/user-attachments/assets/8b753f1e-04ed-4c0b-b893-82e897a8e994" />
<img width="481" height="922" alt="Ekran görüntüsü 2026-06-14 014245" src="https://github.com/user-attachments/assets/761f77e1-23ff-4eff-bbbc-752845972162" />
<img width="491" height="915" alt="Ekran görüntüsü 2026-06-14 014309" src="https://github.com/user-attachments/assets/2b26d12f-4bd1-4b74-ae6b-9391944a9b75" />
<img width="451" height="907" alt="Ekran görüntüsü 2026-06-14 020052" src="https://github.com/user-attachments/assets/f89d7134-617f-4293-b79d-c5018b36ef9f" />
<img width="480" height="910" alt="Ekran görüntüsü 2026-06-14 014345" src="https://github.com/user-attachments/assets/a60930e2-39c1-4e45-998a-484189e7e658" />
<img width="452" height="917" alt="Ekran görüntüsü 2026-06-14 020107" src="https://github.com/user-attachments/assets/f01b7701-cd91-4dc9-ad56-354145e210d4" />
<img width="457" height="922" alt="Ekran görüntüsü 2026-06-14 020419" src="https://github.com/user-attachments/assets/814c722a-6231-47a7-8053-7d61120eb50d" /><img width="457" height="916" alt="Ekran görüntüsü 2026-06-14 020534" src="https://github.com/user-attachments/assets/3488b0ce-4a19-41db-aae3-188fefad8da1" />
<img width="460" height="917" alt="Ekran görüntüsü 2026-06-14 020319" src="https://github.com/user-attachments/assets/49c7402a-919a-4ea0-868a-f46de6e78836" />


<!-- Ekran görüntülerinizi bu başlığın hemen altına sürükleyip bırakabilirsiniz -->

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

Bu proje, Mustafa Karakuş tarafından geliştirilmiştir.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

<div align="center">

**🌿 Bilinçli tüketim, daha iyi bir dünya için küçük ama güçlü bir adımdır.**

</div>
