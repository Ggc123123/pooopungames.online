'use client'

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FaGamepad, FaFire, FaStar } from 'react-icons/fa'
import { Game } from '@/types/game'

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    try {
      const response = await fetch('/api/games')
      const data = await response.json()
      setGames(data.filter((game: Game) => game.status === 'active'))
    } catch (error) {
      console.error('Error fetching games:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B1015] text-white flex items-center justify-center">
        <div className="animate-spin text-apple-blue">
          <FaGamepad className="h-8 w-8" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B1015] text-white">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-[#0B1015]/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-apple-blue rounded flex items-center justify-center text-white font-bold text-xl">
                  P
                </div>
                <div className="ml-2 text-xl font-bold text-white flex items-center">
                  <span className="text-apple-blue">Pooo</span>
                  <span className="text-white">Pun</span>
                  <span className="text-gray-400">Games</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Play Amazing Games Online
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Discover a world of free online games. Join millions of players and experience the best gaming entertainment.
          </p>
        </section>

        {/* Featured Games */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center">
              <FaFire className="mr-2 text-apple-blue" />
              Featured Games
            </h2>
          </div>
          
          {games.length === 0 ? (
            <div className="text-center py-12 bg-gray-800/50 rounded-lg">
              <FaGamepad className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-400">No Games Available</h3>
              <p className="mt-2 text-sm text-gray-500">Stay tuned for exciting games coming soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="group bg-[#1A1D24] rounded-lg overflow-hidden hover:ring-1 hover:ring-apple-blue transition-all duration-300"
                >
                  <div className="relative aspect-[4/3]">
                    {game.thumbnail ? (
                      <Image
                        src={game.thumbnail}
                        alt={game.title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                        <FaGamepad className="h-12 w-12 text-gray-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D24] to-transparent opacity-50"></div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg text-white group-hover:text-apple-blue transition-colors">
                        {game.title}
                      </h3>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className="w-4 h-4 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      Added: {game.addedDate ? new Date(game.addedDate).toLocaleDateString() : 'Recently'}
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      Category: {game.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Plays: {game.playCount}
                      </div>
                      <Link
                        href={`/games/${game.id}`}
                        className="px-6 py-2 bg-[#7B68EE] text-white rounded-md hover:bg-[#6A5ACD] transition-colors text-sm font-medium"
                      >
                        Play Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Categories */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center">
              <FaGamepad className="mr-2 text-apple-blue" />
              Game Categories
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Action', 'Adventure', 'Arcade', 'Board', 'Casual', 'Puzzle', 'Racing', 'Shooter', 'Sports', 'Strategy'].map((category) => (
              <div
                key={category}
                className="bg-gray-800/50 rounded-lg p-4 text-center hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <h3 className="text-sm font-medium">{category}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-sm">
            &copy; 2024 PoooPun Games. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
} 