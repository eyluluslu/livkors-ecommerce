const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'file:./dev.db'
    }
  }
})

async function setSingleAdmin() {
  try {
    console.log('👑 Tek Admin Ayarlama İşlemi Başlatılıyor...')
    console.log('')

    // Mevcut kullanıcıları listele
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true }
    })

    console.log('📋 Mevcut Kullanıcılar:')
    console.log('====================')
    users.forEach((user, index) => {
      const roleIcon = user.role === 'ADMIN' ? '👑' : '👤'
      console.log(`${index + 1}. ${roleIcon} ${user.email} - ${user.name} (${user.role})`)
    })
    console.log('')

    // Varsayılan admin: admin@test.com
    const adminEmail = 'admin@test.com'
    
    console.log(`🎯 Sadece "${adminEmail}" admin olarak ayarlanacak...`)
    console.log('')

    // Önce herkesi USER yap
    await prisma.user.updateMany({
      data: { role: 'USER' }
    })

    // Sonra belirtilen kullanıcıyı ADMIN yap
    const updatedUser = await prisma.user.update({
      where: { email: adminEmail },
      data: { role: 'ADMIN' }
    })

    console.log('✅ İşlem tamamlandı!')
    console.log('')
    console.log('🎉 Yeni Admin:')
    console.log(`👑 ${updatedUser.email} - ${updatedUser.name}`)
    console.log('')
    console.log('👥 Diğer tüm kullanıcılar USER rolüne geçirildi.')

  } catch (error) {
    console.error('❌ Hata:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

setSingleAdmin() 