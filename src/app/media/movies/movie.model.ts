export interface Movie {
  title: string;
  id: number;
  year: number;
  overview: string;
  imdbId?: string;
  tmdbId?: number;
  images?: [{ coverType: string; url: string }];
  posterUrl?: string;
}
