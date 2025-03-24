import { readGamesData } from '@/utils/gameData'
import { FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'

export async function generateStaticParams() {
  const games = readGamesData()
  return games.map((game) => ({
    id: game.id,
  }))
}

export default async function GamePage({ params }: { params: { id: string } }) {
  const games = readGamesData()
  const game = games.find((g) => g.id === params.id)

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600">游戏不存在</h1>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            返回首页
          </Link>
        </div>
      </div>
    )
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
              返回首页
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
                分类: {game.category}
              </span>
              <span className="text-sm text-gray-400">
                游玩次数: {game.playCount}
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
          </div>

          {/* Game Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-[#7B68EE] text-white text-sm rounded-full">
                  {game.category}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">关于游戏</h2>
              <p className="text-gray-400">
                {game.description || `${game.title} 是一个精彩的在线游戏，你可以直接在浏览器中玩。
                快来体验这款 ${game.category.toLowerCase()} 游戏的乐趣吧！
                无需下载 - 点击即玩。`}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">游戏说明</h2>
              <div className="bg-[#232830] rounded-lg p-4">
                <p className="text-gray-400">
                  1. 点击游戏窗口开始游戏<br />
                  2. 使用鼠标和键盘控制游戏<br />
                  3. 部分游戏可能需要加载时间 - 请耐心等待<br />
                  4. 玩得开心，创造新的高分！
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 