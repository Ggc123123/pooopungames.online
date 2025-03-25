'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaPlus, FaEdit, FaTrash, FaGamepad, FaChartLine, FaUsers, FaPlayCircle, FaEye } from 'react-icons/fa'
import { Game } from '@/types/game'
import { Stats } from '@/lib/storage'
import Image from 'next/image'

export default function GamesManagement() {
  const router = useRouter()
  const [games, setGames] = useState<Game[]>([])
  const [stats, setStats] = useState<Stats>({
    totalVisits: 0,
    todayVisits: 0,
    totalPlays: 0,
    todayPlays: 0,
    activeUsers: 0,
    mostPlayedGame: null
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [gamesResponse, statsResponse] = await Promise.all([
        fetch('/api/games'),
        fetch('/api/stats')
      ])
      const [gamesData, statsData] = await Promise.all([
        gamesResponse.json(),
        statsResponse.json()
      ])
      setGames(gamesData)
      setStats(statsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddGame = () => {
    router.push('/admin/games/add')
  }

  const handleEditGame = (id: string) => {
    router.push(`/admin/games/edit/${id}`)
  }

  const handleDeleteGame = async (id: string) => {
    if (!confirm('确定要删除这个游戏吗？')) return

    try {
      const response = await fetch(`/api/games/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setGames(games.filter(game => game.id !== id))
      } else {
        const error = await response.json()
        alert(error.message || '删除游戏失败')
      }
    } catch (error) {
      console.error('Error deleting game:', error)
      alert('删除游戏失败')
    }
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
      <div className="pt-20 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold">游戏管理</h1>
            <p className="mt-2 text-sm text-gray-400">管理所有游戏，查看统计数据和状态。</p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={handleAddGame}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-apple-blue hover:bg-apple-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apple-blue"
            >
              添加游戏
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Visits */}
          <div className="bg-gray-800/50 overflow-hidden rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaEye className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">总访问量</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">{stats.totalVisits}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-400">
                        <span>今日: {stats.todayVisits}</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Total Plays */}
          <div className="bg-gray-800/50 overflow-hidden rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaGamepad className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">总游戏次数</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">{stats.totalPlays}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-400">
                        <span>今日: {stats.todayPlays}</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-gray-800/50 overflow-hidden rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaUsers className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">活跃用户</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">{stats.activeUsers}</div>
                      {stats.mostPlayedGame && (
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-blue-400">
                          <span>最热门: {stats.mostPlayedGame.title}</span>
                        </div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Games Table */}
        <div className="mt-8">
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Game</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Plays</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Added Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {games.map((game) => (
                  <tr key={game.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-600 rounded-lg overflow-hidden">
                          {game.thumbnail ? (
                            <Image
                              src={game.thumbnail}
                              alt={game.title}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaGamepad className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{game.title}</div>
                          <div className="text-sm text-gray-400">{game.iframeUrl}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-600">
                        {game.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        game.status === 'active' ? 'bg-green-900 text-green-200' : 'bg-gray-600 text-gray-200'
                      }`}>
                        {game.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {game.playCount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {game.addedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleEditGame(game.id)}
                          className="text-apple-blue hover:text-blue-400"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDeleteGame(game.id)}
                          className="text-apple-red hover:text-red-400"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 