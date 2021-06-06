import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from 'src/app/models/device.model';
import { Incident } from 'src/app/models/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private baseUrl = "https://localhost:44364/api/Incidents/"
  public currentIncident!:Incident;
  public currentCrew!:number;
  public currentDevices:Device[] = [];

  constructor(private http: HttpClient) {
    this.currentIncident = new Incident();
    this.currentCrew = -1;
   }
  
  getIncidents(){
    return this.http.get(this.baseUrl);
  }

  addIncident(){
    return this.http.post(this.baseUrl, this.currentIncident);
  }
}
