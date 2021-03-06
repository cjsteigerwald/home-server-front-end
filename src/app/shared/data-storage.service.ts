import { LocalStorageService } from './local-storage.service';
import { GlobalService } from './../globals/global.service';
import { MoviesService } from './../media/movies/movies.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../media/movies/movie.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private movieUrl = this.globalService.getGlobalVars().radarrMovieUrl;
  private movieAPIKey = this.globalService.getGlobalVars().radarrApiKey;

  private API_MOVIES = `${this.movieUrl}/api/movie?apikey=${this.movieAPIKey}`;

  private APT_POSTER = `${this.movieUrl}/api/movie/lookup/tmdb?tmdbId=109445&apikey=`;

  private API_SEARCH_TITLE = `${this.movieUrl}/api/movie/lookup/tmdb?tmdbId=109445&apikey=`;

  constructor(
    private http: HttpClient,
    private moviesService: MoviesService,
    private globalService: GlobalService
  ) {}

  fetchMovies() {
    return this.http.get<Movie[]>(this.API_MOVIES).pipe(
      map((movies) => {
        const newMovies = [];
        movies.forEach((movie) => {
          this.fetchPosters(movie.tmdbId).subscribe((resp) => {
            // const aMovie = resp;
            // this.moviesService.addMovie({...aMovie});
            // newMovies.push(aMovie);
            movie.posterUrl = resp;
            this.moviesService.addMovie(movie);
          });
        });
        return movies;
      })
    );
  } //fetchMovies()

  fetchPosters(id: number) {
    const url = `${this.movieUrl}/api/movie/lookup/tmdb?tmdbId=${id}&apikey=${this.movieAPIKey}`;
    return this.http.get<Movie>(url).pipe(
      map((movie) => {
        return movie.images[0].url;
      })
    );
  }

  fetchMovie(id: number) {
    const url = `${this.movieUrl}/api/movie/lookup/tmdb?tmdbId=${id}&apikey=${this.movieAPIKey}`;
    return this.http.get<Movie>(url);
  }

  async fetchMovieSearch(title: string) {
    const url = `${this.movieUrl}/api/movie/lookup?term=${title}&apikey=${this.movieAPIKey}`;

    this.http
      .get<Movie[]>(url)
      .pipe(
        map((movies) => {
          return movies.map((movie) => {
            return {
              ...movie,
            };
          });
        }),
        tap((movies) => {
          this.moviesService.setMovieSearch(movies);
        })
      )
      .subscribe((movies) => {});
  }
} //DataStorageService;
