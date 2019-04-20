import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../model/ticket";
import {Status} from "../model/status";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private HOST_URL = "http://localhost:8080";
  private GET_ALL_TICKETS_URL = this.HOST_URL + "/ticket";
  private ADD_TICKET_URL = this.HOST_URL + "/ticket";
  private DEL_TICKET_URL = this.HOST_URL + "/ticket/";
  private UPDATE_TICKET_URL = this.HOST_URL + "/ticket/";
  private GET_STATES_URL = this.HOST_URL + "/states";
  private GET_USERS_URL = this.HOST_URL + "/users";
  private GET_SEARCHED_TICKETS_URL = this.HOST_URL + "/ticket/filter?filter=";

  constructor(private http: HttpClient) { }

  getTickets() : Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.GET_ALL_TICKETS_URL);
  }

  addTicket(ticket: Ticket) : Observable<any> {
    return this.http.post(this.ADD_TICKET_URL, ticket);
  }

  delTicket(id: number) : Observable<any> {
    return this.http.delete(this.DEL_TICKET_URL + id);
  }

  updateTicket(ticket: Ticket) {
    return this.http.put(this.UPDATE_TICKET_URL + ticket.id, ticket);
  }

  getStates() : Observable<Status[]> {
    return this.http.get<Status[]>(this.GET_STATES_URL);
  }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.GET_USERS_URL);
  }

  getTicketSearch(text: String) : Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.GET_SEARCHED_TICKETS_URL + text);
  }
}
