'use client'

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FaGamepad, FaFire, FaStar } from 'react-icons/fa'
import { Game } from '@/types/game'
import GameList from '@/components/GameList'

async function getGames(): Promise<Game[]> {
  try {
    const response = await fetch('/data/games.json')
    if (!response.ok) {
      throw new Error('获取游戏列表失败')
    }
    const data = await response.json()
    return data.games || []
  } catch (error) {
    console.error('Error fetching games:', error)
    return []
  }
}

export default async function Home() {
  const games = await getGames()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">特色游戏</h1>
      <GameList games={games} />
    </main>
  )
} 