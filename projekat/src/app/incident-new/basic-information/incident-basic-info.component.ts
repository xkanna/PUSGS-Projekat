import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/models/incident.model';
import { IncidentService } from 'src/app/services/incident-service/incident.service';

@Component({
  selector: 'incident-basic-info',
  templateUrl: './incident-basic-info.component.html',
  styleUrls: ['./incident-basic-info.component.css']
})
export class IncidentBasicInfoComponent implements OnInit {

  private inc!:Incident

  constructor(private service:IncidentService) {  }

  ngOnInit(): void {
    this.inc = this.service.currentIncident;//curr incident mora da se reset, vrv kad se klikne new ili mozda edit ako imamo
  }



}
