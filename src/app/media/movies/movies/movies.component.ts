import { DataStorageService } from './../../../shared/data-storage.service';
import { MoviesService } from './../movies.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies = new Array<Movie>();
  subscription: Subscription;

  constructor(
    private moviesService: MoviesService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.dataStorageService.fetchMovies().subscribe();
    this.subscription = this.moviesService.moviesChanged.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
        // console.log('In movies: ', movies);
      }
    );
  } // ngOnInit

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
} // MoviesComponent
