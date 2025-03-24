import { NextResponse } from 'next/server'
import { Storage } from '@/lib/storage'

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
    const newGame = storage.addGame(data)
    return NextResponse.json(newGame)
  } catch (error) {
    console.error('Error adding game:', error)
    return NextResponse.json(
      { error: '添加游戏失败' },
      { status: 500 }
    )
  }
} 