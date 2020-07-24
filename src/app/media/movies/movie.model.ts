export interface Movie {
  title: string;
  id: number;
  year: number;
  overview: string;
  imdbId?: string;
  tmdbId?: number;
  posterUrl?: string;
  images?: [{ coverType: string; url: string }];
}
