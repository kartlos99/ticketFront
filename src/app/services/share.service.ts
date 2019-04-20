import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Ticket} from "../model/ticket";

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private source = new BehaviorSubject<Ticket>(null);
  currentTicket = this.source.asObservable();

  constructor() { }

  setCurrentTicket(ticket: Ticket){
    this.source.next(ticket);
    console.log("servis");
  }
}
