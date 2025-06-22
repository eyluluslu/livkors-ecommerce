const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function fixBanners() {
  try {
    console.log('🎨 Banner verilerini düzeltiliyor...')
    
    // Önce mevcut bannerlari temizle
    await prisma.heroBanner.deleteMany()
    console.log('🗑️ Eski bannerlar temizlendi')
    
    // Yeni bannerları oluştur - Çalışan Unsplash URL'leri
    const banners = [
      {
        title: 'Özel Tasarım Çantalar',
        subtitle: 'Yeni Koleksiyon 2024',
        description: 'En yeni tasarımlarımızla stilinizi tamamlayın. %30 indirim fırsatını kaçırmayın!',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=600&fit=crop&crop=center',
        buttonText: 'Koleksiyonu İncele',
        buttonLink: '/products',
        isActive: true,
        order: 1
      },
      {
        title: 'Premium Deri Çantalar',
        subtitle: 'Lüks ve Şıklık',
        description: 'Gerçek deri kullanılarak üretilen premium çantalarımız ile farkı yaşayın.',
        imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&h=600&fit=crop&crop=center',
        buttonText: 'Hemen İncele',
        buttonLink: '/products',
        isActive: true,
        order: 2
      },
      {
        title: 'Günlük Kullanım Çantaları',
        subtitle: 'Rahat ve Pratik',
        description: 'Her gün kullanabileceğiniz rahat ve fonksiyonel çantalar burada!',
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&h=600&fit=crop&crop=center',
        buttonText: 'Kategorileri Gör',
        buttonLink: '/categories',
        isActive: true,
        order: 3
      }
    ]
    
    // Bannerlari tek tek ekle
    for (const banner of banners) {
      await prisma.heroBanner.create({
        data: banner
      })
      console.log(`✅ Banner eklendi: ${banner.title}`)
    }
    
    console.log('🎉 Tüm bannerlar başarıyla eklendi!')
    
  } catch (error) {
    console.error('❌ Banner düzeltme hatası:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

fixBanners() 