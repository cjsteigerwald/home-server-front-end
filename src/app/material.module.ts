import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatCardModule],
  exports: [MatButtonModule, MatIconModule, MatToolbarModule, MatCardModule],
})
export class MaterialModule {}
