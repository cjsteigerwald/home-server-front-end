import { MoviesService } from './../movies.service';
import { DataStorageService } from './../../../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
})
export class MovieSearchComponent implements OnInit, OnDestroy {
  // Movie that 'user' is searching for
  moviesSearch = new Array<Movie>();
  // Movies that are currently in the database
  movies = new Array<Movie>();
  // If movie already exists in db
  movieExistsDB = false;
  // Subscription to movie service for movies
  searchSubscription: Subscription;
  moviesSubscription: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    // initialize movies array
    this.dataStorage.fetchMovies().subscribe();
    this.searchSubscription = this.moviesService.movieSearchChanged.subscribe(
      (movies: Movie[]) => {
        this.moviesSearch = movies;
      }
    );
    this.moviesSubscription = this.moviesService.moviesChanged.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
  }

  // Take user input and search for movie(s) exist
  doFilter(filterValue) {
    this.dataStorage.fetchMovieSearch(filterValue);
  }

  // Check if movie exists in db
  checkIfMovieExists(tmdbId: number) {
    if (this.movies.length > 0) {
      return this.movies.find((movie) => movie.tmdbId === tmdbId)
        ? true
        : false;
    } else {
      console.log('There are no movies in db');
    }
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.moviesSubscription.unsubscribe();
  }
} //MovieSearchComponent
