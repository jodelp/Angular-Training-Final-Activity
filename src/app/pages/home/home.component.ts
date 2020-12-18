import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged: boolean;
  loggedUser: any;

  constructor(private _serviceTitle: Title, private _globalService: GlobalService) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this._serviceTitle.setTitle('Home');
    this._globalService.isLogged.subscribe(
      (logged: any) => {
        console.log('isLogged', logged);
        this.isLogged = logged;
      }
    );
    this._globalService.checkLogStatus();

    this._globalService.httpGetProfile();
    this._globalService.onHttpGetProfile.subscribe(
      (data: any) => {
        this.loggedUser = data;
      }
    );
  }

}
