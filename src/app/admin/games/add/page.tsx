'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaArrowLeft, FaSave, FaImage } from 'react-icons/fa'

interface FormData {
  title: string
  category: string
  iframeUrl: string
  thumbnail: string
  status: 'active' | 'inactive'
}

const INITIAL_FORM_DATA: FormData = {
  title: '',
  category: '',
  iframeUrl: '',
  thumbnail: '',
  status: 'active'
}

const CATEGORIES = [
  'Action',
  'Adventure',
  'Arcade',
  'Board',
  'Card',
  'Casino',
  'Casual',
  'Educational',
  'Music',
  'Puzzle',
  'Racing',
  'Role Playing',
  'Simulation',
  'Sports',
  'Strategy'
]

export default function AddGame() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewError, setPreviewError] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('添加游戏失败')
      }

      router.push('/admin/games')
    } catch (error) {
      console.error('Error adding game:', error)
      alert('添加游戏失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageError = () => {
    setPreviewError(true)
  }

  const handleImageLoad = () => {
    setPreviewError(false)
  }

  return (
    <div className="min-h-screen bg-[#0B1015] text-white">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-[#0B1015]/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-apple-blue rounded flex items-center justify-center text-white font-bold text-xl">
                  P
                </div>
                <div className="ml-2 text-xl font-bold text-white flex items-center">
                  <span className="text-apple-blue">Pooo</span>
                  <span className="text-white">Pun</span>
                  <span className="text-gray-400">Games</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => router.back()}
            className="mr-4 text-gray-400 hover:text-white"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-2xl font-bold">Add New Game</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6">
          <div className="space-y-6">
            {/* Game Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Game Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-apple-blue"
                placeholder="Enter game title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Game Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-apple-blue"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select category</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Game URL */}
            <div>
              <label htmlFor="iframeUrl" className="block text-sm font-medium text-gray-300 mb-2">
                Game URL (iframe)
              </label>
              <input
                type="text"
                id="iframeUrl"
                name="iframeUrl"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-apple-blue"
                placeholder="Enter game iframe URL"
                value={formData.iframeUrl}
                onChange={handleInputChange}
              />
            </div>

            {/* Game Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-apple-blue"
                placeholder="Enter game description"
              ></textarea>
            </div>

            {/* Game Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Status
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    className="form-radio text-apple-blue"
                    checked={formData.status === 'active'}
                    onChange={handleInputChange}
                  />
                  <span className="ml-2 text-sm text-gray-300">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    className="form-radio text-apple-blue"
                    checked={formData.status === 'inactive'}
                    onChange={handleInputChange}
                  />
                  <span className="ml-2 text-sm text-gray-300">Inactive</span>
                </label>
              </div>
            </div>

            {/* Thumbnail URL */}
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-300">
                缩略图 URL
              </label>
              <input
                type="url"
                id="thumbnail"
                name="thumbnail"
                required
                value={formData.thumbnail}
                onChange={handleInputChange}
                placeholder="https://example.com/thumbnail.jpg"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-apple-blue"
              />
            </div>

            {/* Thumbnail Preview */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                缩略图预览
              </label>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-700 border-2 border-dashed border-gray-600">
                {formData.thumbnail ? (
                  previewError ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <FaImage className="h-12 w-12" />
                      <span className="ml-2">图片加载失败</span>
                    </div>
                  ) : (
                    <Image
                      src={formData.thumbnail}
                      alt="缩略图预览"
                      fill
                      className="object-cover"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />
                  )
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <FaImage className="h-12 w-12" />
                    <span className="ml-2">请输入缩略图 URL</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 bg-apple-blue text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave className="mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Game'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
} 