import { Component, OnInit } from '@angular/core';
import { Incident } from '../models/incident.model';

@Component({
  selector: 'app-incident-new',
  templateUrl: './incident-new.component.html',
  styleUrls: ['./incident-new.component.css']
})
export class IncidentNewComponent implements OnInit {

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
