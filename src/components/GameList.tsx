import Image from 'next/image'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'
import { Game } from '@/types/game'

interface GameListProps {
  games: Game[]
}

export default function GameList({ games }: GameListProps) {
  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎮</div>
        <h3 className="text-xl font-semibold mb-2">No Games Available 没有可用的游戏</h3>
        <p className="text-gray-400">Stay tuned for exciting games coming soon!</p>
        <p className="text-gray-400">请继续关注即将推出的精彩游戏！</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <div
          key={game.id}
          className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative h-48">
            <Image
              src={game.thumbnail}
              alt={game.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className="w-4 h-4 text-yellow-400"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              Added: {game.addedDate ? new Date(game.addedDate).toLocaleDateString() : new Date(game.createdAt).toLocaleDateString()}
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
  )
} 