'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaGamepad, FaPlay, FaExpand, FaCompress } from 'react-icons/fa'
import { Game } from '@/lib/storage'
import Link from 'next/link'

export default function GamePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [game, setGame] = useState<Game | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    fetchGame()
    
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [params.id])

  const toggleFullscreen = async () => {
    try {
      const gameContainer = document.getElementById('game-container')
      if (!gameContainer) return

      if (!isFullscreen) {
        await gameContainer.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error)
    }
  }

  const fetchGame = async () => {
    try {
      const response = await fetch(`/api/games/${params.id}`)
      if (!response.ok) {
        throw new Error('Game not found')
      }
      const data = await response.json()
      setGame(data)
    } catch (error) {
      console.error('Error fetching game:', error)
      router.push('/')
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

  if (!game) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0B1015] text-white">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-[#0B1015]/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href="/"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <FaArrowLeft className="h-4 w-4 mr-2" />
              Back to Games
            </Link>
          </div>
        </div>
      </nav>

      {/* Game Content */}
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#1A1D24] rounded-lg overflow-hidden shadow-xl">
          {/* Game Title Bar */}
          <div className="bg-[#232830] p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">{game.title}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                Category: {game.category}
              </span>
              <span className="text-sm text-gray-400">
                Plays: {game.playCount}
              </span>
            </div>
          </div>

          {/* Game Frame */}
          <div id="game-container" className="relative aspect-[16/9] w-full">
            <iframe
              src={game.iframeUrl}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-200 text-white"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <FaCompress className="w-5 h-5" />
              ) : (
                <FaExpand className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Game Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-[#7B68EE] text-white text-sm rounded-full">
                  {game.category}
                </span>
                <span className="text-gray-400 text-sm">
                  Added: {new Date(game.addedDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPlay className="text-apple-blue" />
                <span className="text-gray-400">{game.playCount} plays</span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">About This Game</h2>
              <p className="text-gray-400">
                {game.title} is an exciting online game that you can play right in your browser. 
                Jump into this {game.category.toLowerCase()} game and start your adventure! 
                No downloads required - just click play and enjoy the game.
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">How to Play</h2>
              <div className="bg-[#232830] rounded-lg p-4">
                <p className="text-gray-400">
                  1. Click the game window to start<br />
                  2. Use your mouse and keyboard to control the game<br />
                  3. Some games may need to load first - please be patient<br />
                  4. Have fun and try to beat your high score!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 