import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

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

}
