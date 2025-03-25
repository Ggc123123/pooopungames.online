import { NextResponse } from 'next/server'
import { Storage } from '@/lib/storage'
import { Game } from '@/types/game'

export async function GET() {
  try {
    const storage = Storage.getInstance()
    const games = storage.getGames()
    return NextResponse.json(games)
  } catch (error) {
    console.error('Error fetching games:', error)
    return NextResponse.json(
      { error: '获取游戏列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const storage = Storage.getInstance()
    const data = await request.json()
    
    // 验证必需字段
    const requiredFields = ['title', 'category', 'iframeUrl', 'thumbnail', 'status']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `缺少必需字段: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // 添加游戏
    try {
      const newGame = storage.addGame(data)
      return NextResponse.json(newGame)
    } catch (storageError) {
      console.error('Error saving game data:', storageError)
      return NextResponse.json(
        { error: '保存游戏数据失败，请检查文件权限' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: '处理请求失败' },
      { status: 500 }
    )
  }
} 