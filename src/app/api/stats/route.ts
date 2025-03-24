import { NextResponse } from 'next/server'
import { Storage } from '@/lib/storage'

export async function GET() {
  try {
    const storage = Storage.getInstance()
    const stats = storage.getStats()
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: '获取统计数据失败' },
      { status: 500 }
    )
  }
} 