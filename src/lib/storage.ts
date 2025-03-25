import fs from 'fs'
import path from 'path'
import { Game } from '@/types/game'

const DATA_FILE = path.join(process.cwd(), 'src/data/games.json')

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
      const rawData = fs.readFileSync(DATA_FILE, 'utf-8')
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
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2))
    } catch (error) {
      console.error('Error saving data file:', error)
    }
  }

  public getGames(): Game[] {
    return this.data.games
  }

  public getGame(id: string): Game | undefined {
    return this.data.games.find(game => String(game.id) === id)
  }

  public addGame(game: Omit<Game, 'id' | 'createdAt' | 'updatedAt' | 'playCount'>): Game {
    const now = new Date().toISOString()
    const newGame: Game = {
      ...game,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: now,
      updatedAt: now,
      playCount: 0
    }
    this.data.games.push(newGame)
    this.saveData()
    return newGame
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