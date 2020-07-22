import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { MediaComponent } from './media/media/media.component';
import { MoviesComponent } from './media/movies/movies/movies.component';
import { MovieComponent } from './media/movies/movie/movie.component';
import { HeaderComponent } from './navigation/header/header.component';
import { GlobalService } from './globals/global.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { TestComponent } from './test/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MediaComponent,
    MovieComponent,
    MoviesComponent,
    HeaderComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
