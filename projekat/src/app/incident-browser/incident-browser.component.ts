import { Component, OnInit } from '@angular/core';
import { Incident } from '../models/incident.model';

@Component({
  selector: 'app-incident-browser',
  templateUrl: './incident-browser.component.html',
  styleUrls: ['./incident-browser.component.css']
})
export class IncidentBrowserComponent implements OnInit {

  incidents:Incident[] = new Array();

  constructor() {
    //pull data from api, remove mock
    let temp = new Incident;
    temp.id = "WR1";
    temp.incidentTime = new Date();
    temp.status = "Draft";
    temp.address = "TestAddr";
    this.incidents.push(temp);
    this.incidents.push(temp);
    this.incidents.push(temp);
    this.incidents.push(temp);
    this.incidents.push(temp);
    this.incidents.push(temp);
   }

  ngOnInit(): void {
  }

}
