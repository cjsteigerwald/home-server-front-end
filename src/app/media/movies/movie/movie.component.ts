import { DataStorageService } from './../../../shared/data-storage.service';
import { MoviesService } from './../movies.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params, Data } from '@angular/router';
import { Movie } from '../movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit, OnDestroy {
  movie;
  tmdbId: number;
  subscription: Subscription;
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tmdbId = +params['id'];
    });
    this.subscription = this.dataStorageService
      .fetchMovie(this.tmdbId)
      .subscribe((resp) => {
        this.movie = resp;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
