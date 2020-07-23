import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { MoviesComponent } from './media/movies/movies/movies.component';
import { TestComponent } from './test/test/test.component';
import { MovieSearchComponent} from './media/movies/movie-search/movie-search.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/search', component: MovieSearchComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
