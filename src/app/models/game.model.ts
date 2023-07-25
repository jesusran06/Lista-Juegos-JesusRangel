export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
}

export interface GameDetail extends Game {
  screenshots: object[];
  status: string;
  description: string;
  minimum_system_requirements: MinimumSystemRequirements;
}

export interface MinimumSystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}



