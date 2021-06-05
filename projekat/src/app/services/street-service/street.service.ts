import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreetService {
  private baseUrl = "https://localhost:44364/api/Streets/";

  constructor(private http:HttpClient) { }

  getStreets(){
    return this.http.get(this.baseUrl);
  }
}
