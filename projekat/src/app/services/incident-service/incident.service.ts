import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor() { }

  test(): number {
    return 5;
  }
}
