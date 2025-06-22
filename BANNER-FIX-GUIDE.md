# 🎨 Banner Resim Sorunu Çözüm Kılavuzu

## ❌ **Sorun:**
Banner resimleri yüklenemedi ve 404 hatası veriyordu:
```
GET /uploads/banner_1750285414231.jpeg 404 in 258ms
⨯ The requested resource isn't a valid image for /uploads/banner_1750285414231.jpeg received text/html; charset=utf-8
```

## 🔍 **Sebep:**
- Veritabanında banner kayıtları var ama fiziksel resim dosyaları `public/uploads/` klasöründe mevcut değil
- Banner `imageUrl` field'i required (null olamaz)
- Eski banner verilerinde broken image path'leri var

## ✅ **Çözüm:**

### 1. **Banner Fix Script Oluşturuldu:**
```bash
scripts/fix-banners.js
```

### 2. **Script Özellikleri:**
- Eski banner kayıtlarını siler
- Yeni banner'ları Unsplash placeholder resimlerle ekler
- 3 adet güzel banner oluşturur

### 3. **Kullanılan Banner Resimleri:**
- **Çanta 1:** https://images.unsplash.com/photo-1553062407-98eeb64c6a62
- **Çanta 2:** https://images.unsplash.com/photo-1564422170194-896b89110ef8  
- **Genel:** https://images.unsplash.com/photo-1441986300917-64674bd600d8

### 4. **Script Çalıştırma:**
```bash
# Environment variable ile
$env:DATABASE_URL="file:./dev.db"; node scripts/fix-banners.js

# Ya da PowerShell script ile
.\start-dev.ps1
```

## 🎯 **Sonuç:**
✅ Banner resim hataları çözüldü  
✅ Ana sayfa başarıyla yükleniyor  
✅ 3 güzel banner slider çalışıyor  
✅ Artık 404 resim hataları yok  

## 🔧 **Gelecek için Notlar:**

### Banner Ekleme:
1. Admin panel → Banner Yönetimi
2. Resim yüklerken `public/uploads/` klasörüne eklenir
3. Veritabanında doğru path saklanır

### Resim Yükleme Kontrolü:
- `public/uploads/` klasörü yazılabilir olmalı
- Upload API route'u çalışır olmalı: `/api/upload`
- Image dosya boyutu ve formatı kontrol edilmeli

## 📝 **Banner Verileri:**
```javascript
{
  title: "Özel Tasarım Çantalar",
  subtitle: "Yeni Koleksiyon 2024", 
  description: "En yeni tasarımlarımızla stilinizi tamamlayın...",
  imageUrl: "https://images.unsplash.com/photo-...",
  buttonText: "Koleksiyonu İncele",
  buttonLink: "/products"
}
```

---
**💡 Tip:** Eğer banner sorunları tekrar yaşanırsa `scripts/fix-banners.js` script'ini çalıştırmak yeterli! 