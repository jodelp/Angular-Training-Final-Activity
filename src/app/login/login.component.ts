import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { Login } from './login-module';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  isLogged: boolean;

  logins: Login = {
    username: '',
    password: ''
  }

  constructor(private _globalService: GlobalService, private route: Router,
    private _serviceTitle: Title) {
    this.isLogged = false;
  }

  ngOnInit(): void {

    this._serviceTitle.setTitle('Login');

    this._globalService.isLogged.subscribe(
      (logged: any) => {
        console.log('isLogged', logged);
        this.isLogged = logged;
      }
    );
    this._globalService.checkLogStatus();

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    if(this.isLogged){
      this.route.navigate(['/']);
     }

  }


  onSubmit(): void {

    if(this.loginForm.valid) {

      this._globalService.httpLogin(this.loginForm.value);
      this._globalService.onHttpLogin.subscribe(
        (response: any) => {
          const token = response.token;
          this._globalService.setToken(token);

          this.route.navigate(['/']);
          console.log('token form service', this._globalService.getToken());

        }
      );
    } else {
      this.alertInfo('Please complete all required fields.');
    }


  }

  alertInfo(message:string){
    Swal.fire({
      icon: 'info',
      title: 'Form Field required',
      text: message
    })
  }

}
