import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TicketComponent} from "./ticket/ticket.component";
import {UserComponent} from "./user/user.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {EditTicketComponent} from "./edit-ticket/edit-ticket.component";

const routes: Routes = [
  {
    path:'tickets',
    component:TicketComponent
  },
  {
    path:'users',
    component:UserComponent
  },
  {
    path:'',
    component:TicketComponent,
    pathMatch:'full'
  },
  {
    path:'addticket',
    component:EditTicketComponent
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
