import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged: boolean;

  constructor(private _globalService: GlobalService, private route: Router) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this._globalService.isLogged.subscribe(
      (logged: any) => {
        console.log('isLogged', logged);
        this.isLogged = logged;
      }
    );
    this._globalService.checkLogStatus();
  }

  onLogout(): void {
    this._globalService.deleteToken();
    this.route.navigate(['/login'])
  }

}
