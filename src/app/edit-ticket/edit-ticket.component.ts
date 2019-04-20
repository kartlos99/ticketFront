import {Component, OnInit} from '@angular/core';
import {TicketService} from "../services/ticket.service";
import {Ticket} from "../model/ticket";
import {ShareService} from "../services/share.service";
import {Router} from "@angular/router";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {User} from "../model/user";
import {Status} from "../model/status";

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  model: Ticket = {
    id: 0,
    title: '',
    body: '',
    author: null,
    worker: null,
    startDate: new Date(),
    endDate: null,
    status: null,
    active: true
  };

  editMode: Boolean = false;
  btnText = "Create";
  workerID = 0;
  statusID = 0;

  editingTicket: Ticket;
  allUsers: User[] = [];
  allStates: Status[] = [];

  constructor(
    private myService: TicketService,
    private shareService: ShareService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.shareService.currentTicket.subscribe(ticketUPD => this.editingTicket = ticketUPD);

    if (this.editingTicket != null) {
      console.log(this.editingTicket);
      this.model = this.editingTicket;
      this.editMode = true;
      this.btnText = "Edit";
      this.statusID = this.model.status.id;
      this.workerID = this.model.worker.id;
    }

    console.log("init_editPage");
    if (this.editMode) {
      this.getStates();
    }
    this.getUsers();
  }

  getStates() {
    this.myService.getStates().subscribe(
      data => {
        this.allStates = data;
      },
      err => {
        alert("can't get states");
      }
    )
  }

  getUsers() {
    this.myService.getUsers().subscribe(
      data => {
        this.allUsers = data;
      },
      err => {
        alert("can't get users");
      }
    )
  }

  sendTicket(): void {

    console.log(this.workerID);
    let filteredUser = this.allUsers.filter(user => user.id == this.workerID);
    if (filteredUser.length > 0){
      this.model.worker = filteredUser[0];
    }else {
      this.model.worker = null;
    }

    console.log(this.model);

    if (this.editMode) {
      let filteredStatus = this.allStates.filter(st => st.id == this.statusID);
      if (filteredStatus.length > 0){
        this.model.status = filteredStatus[0];
      }else {
        this.model.status = null;
      }
      this.myService.updateTicket(this.model).subscribe(
        res => {
          console.log("chaiwera!");
          this.router.navigate(["/tickets"]);
        },
        err => {
          alert("ar chaiwera");
        }
      );

    } else {
      this.myService.addTicket(this.model).subscribe(
        res => {
          console.log("chaiwera!");
          this.router.navigate(["/tickets"]);
        },
        err => {
          alert("ar chaiwera");
        }
      );
    }
  }

}

