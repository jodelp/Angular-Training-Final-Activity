import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {

  isLogged: boolean;
  ticket_id: any;
  selectedTicket: any;

  constructor(private _globalService: GlobalService, private _serviceTitle: Title,
    private router: ActivatedRoute) {
      this.isLogged = false;
      console.log('Ticket id: ', this.router.snapshot.params.id);
    }

  ngOnInit(): void {
    this._serviceTitle.setTitle('Tickets');

    this._globalService.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged;
      }
    );
    this._globalService.checkLogStatus();

    this.router.params.subscribe(
      (params: Params) => {
        this.ticket_id = params.id;
      }
    );

    this._globalService.httpGetTicket(this.ticket_id);

    this._globalService.onhttpGetTicket.subscribe(
      (ticketData: any) => {
        this.selectedTicket = ticketData;
      }
    );

  }

}
