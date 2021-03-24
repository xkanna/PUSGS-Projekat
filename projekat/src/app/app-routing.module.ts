import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentBrowserComponent } from './incident-browser/incident-browser.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'incident-browser', component: IncidentBrowserComponent },
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
