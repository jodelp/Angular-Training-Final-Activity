import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { PagesComponent } from './pages/pages.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { TicketViewComponent } from './tickets/ticket-view/ticket-view.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children:  [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'tickets', component: TicketListComponent
      },
      {
        path: 'my-profile', component: MyProfileComponent
      },
      { path: 'tickets/ticket/:id/view', component: TicketViewComponent},
    ]
  },

  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'about-us', component: AboutUsComponent
  },
  {
    path:'**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
