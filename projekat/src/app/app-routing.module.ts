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
import { WorkRequestsComponent } from './work-requests/work-requests.component';
import { WorkRequestsNewComponent } from './work-requests-new/work-requests-new.component';
import { WorkRequestsBasicInfoComponent } from './work-requests-new/work-requests-basic-info/work-requests-basic-info.component';
import { WorkRequestsHistoryComponent } from './work-requests-new/work-requests-history/work-requests-history.component';
import { WorkRequestsMultimediaComponent } from './work-requests-new/work-requests-multimedia/work-requests-multimedia.component';
import { WorkRequestsEquipmentComponent } from './work-requests-new/work-requests-equipment/work-requests-equipment.component';
import { UnregisteredGuard } from './guards/unregistered.guard';
import { WorkerGuard } from './guards/worker.guard';
import { CallsComponent } from './calls/calls.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { AddNewDeviceComponent } from './add-new-device/add-new-device.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [UnregisteredGuard] },
  { path: 'incident-browser', component: IncidentBrowserComponent, canActivate: [UnregisteredGuard] },
  { path: 'register', component: RegisterComponent},
  //{ path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [UnregisteredGuard]},
  { path: 'calls', component: CallsComponent},
  { path: 'add-device', component: AddDeviceComponent},
  { path: 'add-new-device', component: AddNewDeviceComponent},
  { path: 'incident-new', component: IncidentNewComponent, canActivate: [UnregisteredGuard, WorkerGuard], children: [
    { path: 'incident-basic-info', component: IncidentBasicInfoComponent },
    { path: 'incident-devices', component: IncidentDevicesComponent },
    { path: 'incident-resolution', component: IncidentResolutionComponent },
    { path: 'incident-calls', component: IncidentCallsComponent },
    { path: 'incident-crew', component: IncidentCrewComponent },
    { path: 'incident-multimedia', component: IncidentMultimediaComponent },
    { path: 'incident-equipment', component: IncidentEquipmentComponent },
  ]},
  { path: 'work-requests', component: WorkRequestsComponent},
  { path: 'work-requests-new', component: WorkRequestsNewComponent, children: [
    { path: 'work-requests-basic-info', component: WorkRequestsBasicInfoComponent },
    { path: 'work-requests-history', component: WorkRequestsHistoryComponent },
    { path: 'work-requests-multimedia', component: WorkRequestsMultimediaComponent },
    { path: 'work-requests-equipment', component: WorkRequestsEquipmentComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
