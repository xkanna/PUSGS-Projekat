import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Incident } from 'src/app/models/incident.model';
import { IncidentService } from 'src/app/services/incident-service/incident.service';

@Component({
  selector: 'incident-basic-info',
  templateUrl: './incident-basic-info.component.html',
  styleUrls: ['./incident-basic-info.component.css']
})
export class IncidentBasicInfoComponent implements OnInit {

  registerForm!: FormGroup;

  public inc!:Incident

  constructor(private service:IncidentService) {  }

  ngOnInit(): void {
    this.inc = this.service.currentIncident;//curr incident mora da se reset, vrv kad se klikne new ili mozda edit ako imamo
  }

  private initForm() {
    this.registerForm = new FormGroup({
      'date': new FormControl(''),
      'date1': new FormControl(''),
      'voltage': new FormControl(''),
      'description': new FormControl(''),
      'date2': new FormControl(''),
      'date3': new FormControl(''),
      'date4': new FormControl(''),

    });
  }

}
