export interface Movie {
  title: string;
  id: number;
  overview: string;
  imdbId?: string;
  tmdbId?: string;
  images?: [{ coverType: string; url: string }];
  posterUrl?: string;
}
