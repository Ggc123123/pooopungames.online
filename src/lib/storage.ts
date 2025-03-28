import fs from 'fs'
import path from 'path'
import { Game } from '@/types/game'

// 使用相对路径
const DATA_FILE = path.join('src', 'data', 'games.json')

export interface Stats {
  totalVisits: number
  todayVisits: number
  totalPlays: number
  todayPlays: number
  activeUsers: number
  mostPlayedGame: {
    id: string
    title: string
  } | null
}

interface StorageData {
  games: Game[]
  stats: Stats
}

export class Storage {
  private static instance: Storage
  private data: StorageData

  private constructor() {
    this.data = this.readData()
    // 确保所有游戏的 ID 都是字符串类型
    this.data.games = this.data.games.map((game: Game) => ({
      ...game,
      id: String(game.id)
    }))
  }

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage()
    }
    return Storage.instance
  }

  private readData(): StorageData {
    try {
      // 尝试多个可能的路径
      let rawData: string | null = null
      const possiblePaths = [
        DATA_FILE,
        path.join(process.cwd(), DATA_FILE),
        path.join(process.cwd(), 'public', DATA_FILE)
      ]

      for (const filePath of possiblePaths) {
        try {
          if (fs.existsSync(filePath)) {
            rawData = fs.readFileSync(filePath, 'utf-8')
            console.log('Successfully read from:', filePath)
            break
          }
        } catch (e) {
          console.log('Failed to read from:', filePath)
        }
      }

      if (!rawData) {
        console.error('Could not find games.json in any location')
        throw new Error('Games data file not found')
      }

      const data = JSON.parse(rawData)
      // 确保所有游戏的 ID 都是字符串类型
      data.games = data.games.map((game: Game) => ({
        ...game,
        id: String(game.id)
      }))
      return data
    } catch (error) {
      console.error('Error reading data file:', error)
      return {
        games: [],
        stats: {
          totalVisits: 0,
          todayVisits: 0,
          totalPlays: 0,
          todayPlays: 0,
          activeUsers: 0,
          mostPlayedGame: null
        }
      }
    }
  }

  private saveData(): void {
    try {
      const filePath = path.join(process.cwd(), DATA_FILE)
      const dirPath = path.dirname(filePath)
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }
      fs.writeFileSync(filePath, JSON.stringify(this.data, null, 2))
    } catch (error) {
      console.error('Error saving data file:', error)
      throw new Error('Failed to save data: ' + (error instanceof Error ? error.message : String(error)))
    }
  }

  public getGames(): Game[] {
    return this.data.games
  }

  public getGame(id: string): Game | undefined {
    return this.data.games.find(game => String(game.id) === id)
  }

  public addGame(game: Omit<Game, 'id' | 'createdAt' | 'updatedAt' | 'playCount'>): Game {
    try {
      // 检查标题是否已存在
      const existingGame = this.data.games.find(g => g.title.toLowerCase() === game.title.toLowerCase())
      if (existingGame) {
        throw new Error('游戏标题已存在')
      }

      const now = new Date().toISOString()
      const newGame: Game = {
        ...game,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: now,
        updatedAt: now,
        playCount: 0,
        addedDate: now
      }
      this.data.games.push(newGame)
      this.saveData()
      return newGame
    } catch (error) {
      console.error('Error in addGame:', error)
      throw new Error('添加游戏失败: ' + (error instanceof Error ? error.message : String(error)))
    }
  }

  public updateGame(id: string, updates: Partial<Game>): Game | null {
    const index = this.data.games.findIndex(game => String(game.id) === id)
    if (index === -1) return null

    this.data.games[index] = {
      ...this.data.games[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    this.saveData()
    return this.data.games[index]
  }

  public deleteGame(id: string): boolean {
    const initialLength = this.data.games.length
    this.data.games = this.data.games.filter(game => String(game.id) !== id)
    if (this.data.games.length !== initialLength) {
      this.saveData()
      return true
    }
    return false
  }

  public getStats(): Stats {
    return this.data.stats
  }

  public incrementStats(type: 'visits' | 'plays'): void {
    if (type === 'visits') {
      this.data.stats.totalVisits++
      this.data.stats.todayVisits++
    } else {
      this.data.stats.totalPlays++
      this.data.stats.todayPlays++
    }
    this.saveData()
  }

  public resetDailyStats(): void {
    this.data.stats.todayVisits = 0
    this.data.stats.todayPlays = 0
    this.saveData()
  }
} 