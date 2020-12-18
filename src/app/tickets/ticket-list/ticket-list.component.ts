import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  // isLogged: boolean;
  myTickets: any;
  myTicketsCount = 0;

  constructor(private _globalService: GlobalService, private _serviceTitle: Title) {
    // this.isLogged = false;
  }

  ngOnInit(): void {

    // this._serviceTitle.setTitle('Tickets');

    // this._globalService.isLogged.subscribe(
    //   (logged: any) => {
    //     this.isLogged = logged;
    //   }
    // );
    // this._globalService.checkLogStatus();

    this._globalService.httpGetTickets();

    this._globalService.onHttpGetTickets.subscribe(
      (tickets: any) => {
        console.log('tickets', tickets);
        this.myTickets = tickets;
      }
    );

    this._globalService.totalTicketCount.subscribe(
      (ticketCount: any) => {
        console.log('tickets', ticketCount);
        this.myTicketsCount = ticketCount;
      }
    );

  }

}
