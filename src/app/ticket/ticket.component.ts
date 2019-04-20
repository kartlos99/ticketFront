import {Component, OnInit} from '@angular/core';
import {Ticket} from "../model/ticket";
import {TicketService} from "../services/ticket.service";
import {ShareService} from "../services/share.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  tickets: Ticket[] = [];
  searchText = "";

  constructor(
    private myService: TicketService,
    private shareService: ShareService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.myService.getTickets().subscribe(
      data => {
        this.tickets = data;
      },
      err => {
        alert("can't get tickets");
      }
    )
  }

  deleteTicket(ticket: Ticket) {
    if (confirm("are you sure?")) {
      this.myService.delTicket(ticket.id).subscribe(
        resp => {
          let indexOfTicket = this.tickets.indexOf(ticket);
          this.tickets.splice(indexOfTicket, 1);
        },
        err => {
          alert("can't delete ticket!");
        }
      )
    }
  }

  createEditTicket(ticket: Ticket) {
    this.shareService.setCurrentTicket(ticket);
    this.router.navigate(["/addticket"]);
  }

  getSearchedTickets(searchText: String) {
    this.myService.getTicketSearch(searchText).subscribe(
      data => this.tickets = data,
      err => alert("search request errot: ")
    );
  }
}
