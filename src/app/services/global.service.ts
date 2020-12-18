import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isLogged = new Subject();
  onHttpLogin = new Subject();
  onHttpGetTickets = new Subject();
  onHttpGetProfile = new Subject();
  onHttpUpdateProfile = new Subject();
  onhttpGetTicket = new Subject();
  totalTicketCount = new Subject();

  constructor(private http: HttpClient) { }

  httpLogin(logins: any){
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login';

    const data = {
      username: 'jodelp@cloudstaff.com',
      passwrod: 'Jodel1234!'
    };

    this.http.post(url, logins).subscribe(
      (response: any) => {
        console.log('success response', response)
        if(response.status == 'success') {
          this.onHttpLogin.next(response.data);
          this.isLogged.next(true);
          this.successAlert('Logged in Successfully');
        }

      },
      (error) => {
        console.log('error response', error);
        // this.errorAlert('Failed Login. \n Incorrect username or password.');
        this.errorAlert('An Error Occured',  error.error.message);
      }
    )
  }

  httpGetTickets(): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/tickets/my';
    const token = this.getToken();

    this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe(
      (response:any) => {
        console.log('this is from httpGetTickets Service', response);

        if(response.status === 'success') {
          this.onHttpGetTickets.next(response.data);
          this.totalTicketCount.next(response.total);
        }
      },
      (error) => {
        console.log('error response', error)
        this.errorAlert('An Error Accured', error.error.message);

      }
    )
  }

  httpGetProfile(): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe(
      (response:any) => {
        console.log('this is from httpGetProfile Service', response);

        if(response.status === 'success') {
          this.onHttpGetProfile.next(response.data);
        }
      },
      (error) => {
        console.log('error response', error)
      }
    )
  }

  httpUpdateProfile(data: any): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.put(url, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe(
      (response: any) => {
        console.log('this is from http update profile service', response);

        if(response.status === 'success') {
          this.onHttpUpdateProfile.next(response.data);
          this.onHttpGetProfile.next(response.data);
          this.successAlert('Successfully updated profile');
        }
      },
      (error) => {
        console.log('error response in GetProfile', error);
      }
    );
  }

  httpGetTicket(ticket_id:string): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/tickets/my/'+ticket_id;
    const token = this.getToken();

    this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+token)
    }).subscribe(
      (response:any) => {
        console.log('Ticket Data: ', response);
        if(response.status === 'success') {
          this.onhttpGetTicket.next(response.data);
        }
      },
      (error) => {
        console.log('error response', error);
      }
    )

  }


  setToken(token: string): string {
    localStorage.setItem('token', token);
    return token;
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token?.toString() || '';
  }

  checkLogStatus(): void {
    const token = localStorage.getItem('token');

    if(token) {
      this.isLogged.next(true);
    }else {
      this.isLogged.next(false);
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    this.isLogged.next(false);
    this.successAlert('Logged out Successfully');
  }

  successAlert(message:string){
    swal.fire({
      icon: 'success',
      title: message,
    })
  }

  errorAlert(title:string, message:string, ){
    swal.fire({
      icon: 'error',
      title: title,
      text: message,
    })

  }




}
