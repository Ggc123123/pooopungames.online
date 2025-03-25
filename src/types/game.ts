export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  iframeUrl: string;
  playCount: number;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
  addedDate: string;
} 