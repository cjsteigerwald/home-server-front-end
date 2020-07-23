import { MoviesService } from './../../media/movies/movies.service';
import { switchMap, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromFetch } from 'rxjs/fetch';
import { Movie } from 'src/app/media/movies/movie.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  users;
  movies = new Array<Movie>();

  constructor(private http: HttpClient, private moviesService: MoviesService) {}
  ngOnInit(): void {
    this.http
      .get('http://jsonplaceholder.typicode.com/users')
      .subscribe((response) => {
        this.users = response;
      });
  }



  onClick(user) {
    console.log('Clicking Baby: ', user.name);
  }
}
