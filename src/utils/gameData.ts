import { Game } from '@/types/game';
import { Storage } from '@/lib/storage';

export function readGamesData(): Game[] {
  const storage = Storage.getInstance();
  return storage.getGames();
} 