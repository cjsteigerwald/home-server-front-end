import { GlobalService } from './../globals/global.service';
import { MoviesService } from './../media/movies/movies.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../media/movies/movie.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private movieUrl = this.globalService.getGlobalVars().radarrMovieUrl;
  private movieAPIKey = this.globalService.getGlobalVars().radarrApiKey;

  private API_MOVIES = `${this.movieUrl}/api/movie?apikey=${this.movieAPIKey}`;

  private APT_POSTER = `${this.movieUrl}/api/movie/lookup/tmdb?tmdbId=109445&apikey=`;

  constructor(
    private http: HttpClient,
    private moviesService: MoviesService,
    private globalService: GlobalService
  ) {}

  fetchMovies() {
    return this.http.get<Movie[]>(this.API_MOVIES).pipe(
      map((movies) => {
        return movies.map((movie) => {
          return {
            ...movie,
          };
        });
      }),
      map((movies) => {
        // movies has internal directory for movie posters in
        // metadata, therefore need to reach out to imdb to get
        // movie posters and add property for posterUrl
        movies.forEach((movie) => {
          this.fetchPosters(movie.tmdbId).subscribe((resp) => {
            movie.posterUrl = resp;
          });
        });
        return movies;
      }),
      tap((movies) => {
        this.moviesService.setMovies(movies);
      })
    ); 
  } //fetchMovies()

  fetchPosters(id: string) {
    const url = `${this.movieUrl}/api/movie/lookup/tmdb?tmdbId=${id}&apikey=${this.movieAPIKey}`;
    return this.http.get<Movie>(url).pipe(
      map((movie) => {
        return movie.images[0].url;
      })
    );
  }
}
