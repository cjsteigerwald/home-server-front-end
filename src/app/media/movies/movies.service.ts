import { DataStorageService } from './../../shared/data-storage.service';
import { LocalStorageService } from './../../shared/local-storage.service';
import { GlobalService } from './../../globals/global.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesChanged = new Subject<Movie[]>();
  movieSearchChanged = new Subject<Movie[]>();
  private movies: Movie[] = [];
  private movieSearch: Movie[] = [];
  // private aMovie: Movie;

  private movieUrl = this.globalService.getGlobalVars().radarrMovieUrl;
  private movieAPIKey = this.globalService.getGlobalVars().radarrApiKey;

  private API_MOVIES = `${this.movieUrl}/api/movie?apikey=${this.movieAPIKey}`;

  private APT_POSTER = `${this.movieUrl}/api/movie/lookup/tmdb?tmdbId=109445&apikey=`;

  constructor(
    private globalService: GlobalService,
    private localStorageService: LocalStorageService
  ) {}

  // Make call to dataStorageService to download movies
  // and add them to service with addMovie()
  // fetchMovies() {
  //   console.log('After schucks: ')
  //     resp.forEach(movie => {
  //       console.log('TypeOf: ', typeof(movie))
  //       this.addMovie(movie);
  //     });
  //   });
  // }

  // return a single movie based on tmdbId
  getMovie(tmdbId: number) {
    return this.movies.find((movie) => movie.tmdbId === tmdbId);
  }

  // return all movies in DB
  getMovies() {
    return this.movies.slice();
  }

  // Due to how radarr stores metadata a GET of
  // all movies does not include metadata for
  // poster URL also, adding porterUrl property
  // to initial Move objects will not allow them
  // to be JSON.stringify for local storage. Therefore
  // this method is called by data-storage.service.fetchMovies(),
  // once complete this is called and array of movies properly
  // formatted with posterUrl property is sent to local
  // storage
  setMovies(movies: Movie[]) {
    this.movies = movies;
    this.moviesChanged.next(this.movies.slice());
  }

  addMovie(movie: Movie) {
    this.movies.push(movie);
    this.moviesChanged.next(this.movies.slice());
  }

  addToLocalStorage(key: string, value: Movie) {
    this.localStorageService.set(key, value);
  }

  deleteFromLocalStorage(key: string) {
    this.localStorageService.remove(key);
  }

  getFromLocalStorage(key: string) {
    this.localStorageService.get(key);
  }

  // set movies in movieSearch[] that matches user movie search
  setMovieSearch(movieSearch: Movie[]) {
    this.movieSearch = movieSearch;
    this.movieSearchChanged.next(this.movieSearch.slice());
  }
} // MoviesService
