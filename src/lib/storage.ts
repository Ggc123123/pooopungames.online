import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'src/data/games.json')

export interface Game {
  id: number
  title: string
  category: string
  iframeUrl: string
  status: string
  addedDate: string
  playCount: number
  thumbnail: string
}

export interface Stats {
  totalVisits: number
  todayVisits: number
  totalPlays: number
  todayPlays: number
  activeUsers: number
  mostPlayedGame: {
    id: number
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
      return JSON.parse(rawData)
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

  // 游戏相关方法
  public getGames(): Game[] {
    return this.data.games
  }

  public getGame(id: number): Game | undefined {
    return this.data.games.find(game => game.id === id)
  }

  public addGame(game: Omit<Game, 'id' | 'addedDate' | 'playCount'>): Game {
    const newGame: Game = {
      ...game,
      id: Math.max(0, ...this.data.games.map(g => g.id)) + 1,
      addedDate: new Date().toISOString().split('T')[0],
      playCount: 0
    }
    this.data.games.push(newGame)
    this.saveData()
    return newGame
  }

  public updateGame(id: number, updates: Partial<Game>): Game | null {
    const index = this.data.games.findIndex(game => game.id === id)
    if (index === -1) return null

    this.data.games[index] = {
      ...this.data.games[index],
      ...updates
    }
    this.saveData()
    return this.data.games[index]
  }

  public deleteGame(id: number): boolean {
    const initialLength = this.data.games.length
    this.data.games = this.data.games.filter(game => game.id !== id)
    if (this.data.games.length !== initialLength) {
      this.saveData()
      return true
    }
    return false
  }

  // 统计相关方法
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