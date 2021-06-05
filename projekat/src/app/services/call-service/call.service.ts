import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Call } from 'src/app/models/call.model';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  private baseUrl = "https://localhost:44364/api/Calls/"

  constructor(private http:HttpClient) { }

  getCallsForIncidentId(id:number){
    return this.http.get(this.baseUrl + id);
  }

  addCall(body:Call){
    console.log(body);
    return this.http.post(this.baseUrl, body);
  }
}
