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
    private httpClient: HttpClient,
    private globalService: GlobalService,
    private localStorageService: LocalStorageService
  ) {}
  // return a single movie based on tmdbId
  getMovie(tmdbId: number) {
    console.log('Storage: ', this.localStorageService.get('movies'));
    return this.localStorageService.get('movies').find((movie) => movie.tmdbId === tmdbId);
  }

  // return all movies in DB
  getMovies() {    
    return this.localStorageService.get('movies').slice();
  }

  // set movies in movies[] that are currently in DB
  setMovies(movies: Movie[]) {   
    console.log('setMoives(): ', movies)
    this.movies = movies;    
    this.moviesChanged.next(this.movies.slice());
    this.setLocalStorage(this.movies);
  }

  addMovie(movie: Movie) {
    this.movies.push(movie);
    this.setLocalStorage(this.movies);
    this.moviesChanged.next(this.movies.slice());
  }

  setLocalStorage(movies: Movie[]) {
    this.localStorageService.remove('movies');
    this.localStorageService.set('movies', movies );
    // console.log('Set Movies: ', this.localStorageService.get('movies'));
  }

  // set movies in movieSearch[] that matches user movie search
  setMovieSearch(movieSearch: Movie[]) {
    this.movieSearch = movieSearch;
    // console.log('In movie setMovieSearch: ', this.movieSearch);
    this.movieSearchChanged.next(this.movieSearch.slice());
  }
} // MoviesService
