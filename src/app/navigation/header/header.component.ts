import { GlobalService } from './../../globals/global.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private test1;
  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.test1 = this.globalService.getGlobalVars();
    console.log(this.test1);
  }

  onToggleSidenav() {}
}
