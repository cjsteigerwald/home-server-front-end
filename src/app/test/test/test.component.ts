import { switchMap, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {fromFetch} from 'rxjs/fetch';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  users;
  
  constructor(private http: HttpClient) {
  //   this.http.get('http://jsonplaceholder.typicode.com/users').pipe(
  //     map(response => {
  //       response.name = 'Hola';
  //     })
  //   )
  //     .subscribe((response) => {
  //       this.users = response;
  //       console.log('this.user: ', this.users);
  //     });
  }
 


  ngOnInit(): void {
    
    
  }
}
