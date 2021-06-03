import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentBrowserComponent } from './incident-browser/incident-browser.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { IncidentNewComponent } from './incident-new/incident-new.component';
import { IncidentBasicInfoComponent } from './incident-new/basic-information/incident-basic-info.component';
import { IncidentDevicesComponent } from './incident-new/incident-devices/incident-devices/incident-devices.component';
import { IncidentResolutionComponent } from './incident-new/incident-resolution/incident-resolution.component';
import { IncidentCallsComponent } from './incident-new/incident-calls/incident-calls.component';
import { IncidentCrewComponent } from './incident-new/incident-crew/incident-crew.component';
import { IncidentMultimediaComponent } from './incident-new/incident-multimedia/incident-multimedia.component';
import { IncidentEquipmentComponent } from './incident-new/incident-equipment/incident-equipment.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'incident-browser', component: IncidentBrowserComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'incident-new', component: IncidentNewComponent, children: [
    { path: 'incident-basic-info', component: IncidentBasicInfoComponent },
    { path: 'incident-devices', component: IncidentDevicesComponent },
    { path: 'incident-resolution', component: IncidentResolutionComponent },
    { path: 'incident-calls', component: IncidentCallsComponent },
    { path: 'incident-crew', component: IncidentCrewComponent },
    { path: 'incident-multimedia', component: IncidentMultimediaComponent },
    { path: 'incident-equipment', component: IncidentEquipmentComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
