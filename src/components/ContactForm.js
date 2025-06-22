'use client'

import { useState } from 'react'
import { updateContactInfo } from '@/lib/site-actions'

export default function ContactForm({ initialData = null }) {
  const [formData, setFormData] = useState({
    email: initialData?.email || 'info@livkors.com',
    phone: initialData?.phone || '+90 212 123 45 67',
    address: initialData?.address || 'Beyoğlu, İstanbul',
    workingHours: initialData?.workingHours || '09:00 - 18:00',
    socialTitle: initialData?.socialTitle || '📱 Bizi Takip Edin',
    facebook: initialData?.facebook || '#',
    instagram: initialData?.instagram || '#',
    twitter: initialData?.twitter || '#',
    whatsapp: initialData?.whatsapp || '#'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const result = await updateContactInfo(formData)
      
      if (result.success) {
        setMessage('İletişim bilgileri başarıyla güncellendi!')
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        setMessage(result.error || 'Bir hata oluştu')
      }
    } catch (error) {
      setMessage('Bir hata oluştu: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">📞 İletişim Bilgileri</h3>
        <p className="text-gray-600">Ana sayfada görüntülenecek iletişim bilgilerini düzenleyin</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.includes('başarıyla') 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📧 E-posta Adresi
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📞 Telefon Numarası
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📍 Adres
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Working Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🕒 Çalışma Saatleri
            </label>
            <input
              type="text"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">🌐 Sosyal Medya Linkleri</h4>
          
          {/* Social Media Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🏷️ Sosyal Medya Başlığı
            </label>
            <input
              type="text"
              name="socialTitle"
              value={formData.socialTitle}
              onChange={handleChange}
              placeholder="📱 Bizi Takip Edin"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Ana sayfada sosyal medya ikonlarının üstünde görüntülenecek başlık</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facebook */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📘 Facebook
              </label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/yourpage"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📷 Instagram
              </label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/yourpage"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Twitter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🐦 Twitter
              </label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/yourpage"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📱 WhatsApp
              </label>
              <input
                type="url"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="https://wa.me/905xxxxxxxxx"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg font-medium ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition-colors`}
          >
            {isSubmitting ? '⏳ Güncelleniyor...' : '💾 Bilgileri Kaydet'}
          </button>
        </div>
      </form>
    </div>
  )
} 