import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Incident } from 'src/app/models/incident.model';
import { IncidentService } from 'src/app/services/incident-service/incident.service';

@Component({
  selector: 'calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css']
})
export class CallsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
