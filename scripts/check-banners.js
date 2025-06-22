const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkBanners() {
  try {
    console.log('📋 Mevcut Banner Verileri:')
    console.log('='.repeat(50))
    
    const banners = await prisma.heroBanner.findMany({
      orderBy: { order: 'asc' }
    })
    
    if (banners.length === 0) {
      console.log('❌ Hiç banner bulunamadı!')
      return
    }
    
    banners.forEach((banner, index) => {
      console.log(`${index + 1}. ${banner.title}`)
      console.log(`   Button Text: ${banner.buttonText}`)
      console.log(`   Button Link: ${banner.buttonLink}`)
      console.log(`   Active: ${banner.isActive}`)
      console.log(`   Image URL: ${banner.imageUrl}`)
      console.log('   ' + '-'.repeat(40))
    })
    
  } catch (error) {
    console.error('❌ Banner kontrol hatası:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkBanners() 