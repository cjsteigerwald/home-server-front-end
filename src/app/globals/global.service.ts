import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private vars = {
    radarrMovieUrl: environment.radarrUrl,
    radarrApiKey: environment.radarrApiKey
  }

  constructor() {}

  getGlobalVars() {
    return this.vars;
  }

} // Global Service
