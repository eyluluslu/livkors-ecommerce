const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'file:./dev.db'
    }
  }
})

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true }
    })

    console.log('📋 Güncel Kullanıcı Durumu:')
    console.log('===========================')
    
    users.forEach((user, index) => {
      const roleIcon = user.role === 'ADMIN' ? '👑' : '👤'
      console.log(`${index + 1}. ${roleIcon} ${user.email} - ${user.name} (${user.role})`)
    })
    
    const adminCount = users.filter(u => u.role === 'ADMIN').length
    console.log('')
    console.log(`🎯 Toplam Admin Sayısı: ${adminCount}`)
    
    if (adminCount === 1) {
      console.log('✅ Perfect! Sadece 1 admin var.')
    } else if (adminCount === 0) {
      console.log('⚠️ Hiç admin yok!')
    } else {
      console.log(`⚠️ ${adminCount} admin var. Sadece 1 olmalı.`)
    }

  } catch (error) {
    console.error('❌ Hata:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()