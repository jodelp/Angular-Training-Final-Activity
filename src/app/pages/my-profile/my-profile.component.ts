import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  profileForm: any;

  isLogged: boolean;

  constructor(private _globalService: GlobalService, private _serviceTitle: Title) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this._serviceTitle.setTitle('Profile');

    this._globalService.isLogged.subscribe(
      (logged: any) => {
        console.log('isLogged', logged);
        this.isLogged = logged;
      }
    );
    this._globalService.checkLogStatus();

    this._globalService.httpGetProfile();

    this._globalService.onHttpGetProfile.subscribe(
      (profile: any) => {
        this.fillForm(profile);
      }

    );

    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      alias: new FormControl('', [Validators.required]),
      job_title: new FormControl('', [Validators.required]),
      mobile_number: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
    });


  }

  fillForm(profile: any): void {
    this.profileForm.patchValue({
      email: profile.email,
      first_name: profile.meta.first_name,
      last_name: profile.meta.last_name,
      alias: profile.alias,
      job_title: profile.meta.job_title,
      mobile_number: profile.meta.mobile_number
    });
  }

  onSubmit(): void {

    if(this.profileForm.valid) {
      const formValues = this.profileForm.value;
      const newFormValues = {
        meta: {
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          job_title: formValues.job_title,
          mobile_number: formValues.mobile_number,
          timezone: 'Asia/Manila'
        },
        current_password: '',
        email: formValues.email,
        alias: formValues.alias
      }

      this._globalService.httpUpdateProfile(newFormValues);
    }

    console.log('form is valid', this.profileForm.valid);
    console.log(this.profileForm.value);
  }

}
