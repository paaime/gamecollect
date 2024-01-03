enum Category {
  official = 1,
  wikia = 2,
  wikipedia = 3,
  facebook = 4,
  twitter = 5,
  twitch = 6,
  instagram = 8,
  youtube = 9,
  iphone = 10,
  ipad = 11,
  android = 12,
  steam = 13,
  reddit = 14,
  itch = 15,
  epicgames = 16,
  gog = 17,
  discord = 18,
}

export type Website = {
  id: number;
  category: Category;
  game: number;
  trusted: boolean;
  url: string;
  checksum: string;
};

type IdName = {
  id: number;
  name: string;
};

type Image = {
  id: number;
  image_id: string;
};

export interface IGame {
  id: number;
  name: string;
  artworks: Image[];
  screenshots: Image[];
  cover: Image;
  releaseDate: string;
  genres: IdName[];
  platforms: IdName[];
  themes: IdName[];
  collections: IdName[];
  franchises: IdName[];
  player_perspectives: IdName[];
  game_engines: IdName[];
  game_modes: IdName[];
  summary: string;
  first_release_date: number;
  rating: number;
  rating_count: number;
  slug: string;
  videos: [
    {
      id: number;
      game: number;
      name: string;
      video_id: string;
      checksum: string;
    },
  ];
  involved_companies: [
    {
      id: number;
      company: IdName;
    },
  ];
  storyline: string;
  similar_games: any;
  websites: Website[];
}
