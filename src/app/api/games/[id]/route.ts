import { NextResponse } from 'next/server'
import { Storage } from '@/lib/storage'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const storage = Storage.getInstance()
    const game = storage.getGame(Number(params.id))
    
    if (!game) {
      return NextResponse.json(
        { error: '游戏不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(game)
  } catch (error) {
    console.error('Error fetching game:', error)
    return NextResponse.json(
      { error: '获取游戏信息失败' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const storage = Storage.getInstance()
    const data = await request.json()
    const updatedGame = storage.updateGame(Number(params.id), data)
    
    if (!updatedGame) {
      return NextResponse.json(
        { error: '游戏不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedGame)
  } catch (error) {
    console.error('Error updating game:', error)
    return NextResponse.json(
      { error: '更新游戏失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const storage = Storage.getInstance()
    const success = storage.deleteGame(Number(params.id))
    
    if (!success) {
      return NextResponse.json(
        { error: '游戏不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting game:', error)
    return NextResponse.json(
      { error: '删除游戏失败' },
      { status: 500 }
    )
  }
} 