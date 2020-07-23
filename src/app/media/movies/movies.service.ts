import { DataStorageService } from './../../shared/data-storage.service';
import { GlobalService } from './../../globals/global.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    private globalService: GlobalService
  ) {}

  getMovies() {
    return this.movies.slice();
  }

  setMovies(movies: Movie[]) {
    this.movies = movies;
    // console.log('In movie setMovies: ', this.movies);
    this.moviesChanged.next(this.movies.slice());
  }

  setMovieSearch(movieSearch: Movie[]) {    
    this.movieSearch = movieSearch;
    // console.log('In movie setMovieSearch: ', this.movieSearch);
    this.movieSearchChanged.next(this.movieSearch.slice());
  }
} // MoviesService
