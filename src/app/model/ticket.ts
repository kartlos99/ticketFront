import {User} from "./user";
import {Status} from "./status";

export interface Ticket {
  id:number;
  title:String;
  body:String;
  author:User;
  worker:User;
  startDate:Date;
  endDate:Date;
  active:Boolean;
  status:Status;
}
