import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: ['./side-content.component.css']
})
export class SideContentComponent implements OnInit {

  isLogged: boolean;

  profilePic: any;
  full_name: any;
  email: any;
  job_title: any;
  mobile_number: any;

  constructor(private _globalService: GlobalService, private route: Router) {
    this.isLogged = false;
  }

  ngOnInit(): void {

      this._globalService.httpGetProfile();

      this._globalService.isLogged.subscribe(
        (logged : any) => {
          this.isLogged = logged;
        }
       );

      this._globalService.checkLogStatus();

      if(this._globalService.getToken() === ''){
        this.route.navigate(['/']);
      }

      this._globalService.onHttpGetProfile.subscribe(
        (data: any) => {
          this.profilePic = data.meta.photo_url;
          this.full_name = data.meta.first_name +' '+ data.meta.last_name;
          this.email = data.email;
          this.job_title = data.meta.job_title;
          this.mobile_number = data.meta.mobile_number;
        }
      );

  }

}
