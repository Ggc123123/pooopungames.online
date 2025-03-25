import { NextResponse } from 'next/server'
import gamesData from '@/data/games.json'

export async function GET() {
  try {
    return NextResponse.json(gamesData.games)
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

    // 检查标题是否已存在
    const existingGame = gamesData.games.find(
      game => game.title.toLowerCase() === data.title.toLowerCase()
    )
    if (existingGame) {
      return NextResponse.json(
        { error: '游戏标题已存在' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()
    const newGame = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: now,
      updatedAt: now,
      playCount: 0,
      addedDate: now
    }

    return NextResponse.json(newGame)
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: '处理请求失败' },
      { status: 500 }
    )
  }
} 