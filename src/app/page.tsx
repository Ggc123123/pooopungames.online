'use client'

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FaGamepad } from 'react-icons/fa'
import { Game } from '@/types/game'
import GameList from '@/components/GameList'

async function getGames(): Promise<Game[]> {
  try {
    const response = await fetch('https://pooopungames.online/data/games.json')
    if (!response.ok) {
      throw new Error('获取游戏列表失败')
    }
    const data = await response.json()
    return data.games || []
  } catch (error) {
    console.error('Error fetching games:', error)
    return []
  }
}

export default async function Home() {
  const games = await getGames()

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
              <FaGamepad className="mr-2 text-apple-blue" />
              Featured Games 特色游戏
            </h2>
          </div>
          <GameList games={games} />
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