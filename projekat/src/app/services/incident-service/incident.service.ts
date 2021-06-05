import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Incident } from 'src/app/models/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private baseUrl = "https://localhost:44364/api/Incidents/"
  public currentIncident!:Incident;

  constructor(private http: HttpClient) {
    this.currentIncident = new Incident();
   }
  
  getIncidents(){
    return this.http.get(this.baseUrl);
  }

  addIncident(){
    return this.http.post(this.baseUrl, this.currentIncident);
  }
}
