import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Device } from 'src/app/models/device.model';
import { Incident } from 'src/app/models/incident.model';
import { CallService } from 'src/app/services/call-service/call.service';
import { IncidentService } from 'src/app/services/incident-service/incident.service';
import { StreetService } from 'src/app/services/street-service/street.service';

@Component({
  selector: 'incident-basic-info',
  templateUrl: './incident-basic-info.component.html',
  styleUrls: ['./incident-basic-info.component.css']
})
export class IncidentBasicInfoComponent implements OnInit {

  registerForm!: FormGroup;

  public inc!:Incident
  // public description!:string;
  // public voltage!:number;
  // public calls!:number;
  // public confirmed!:boolean;
  // public priority!:number;
  // public selectedType!:string;
  // public affectedCustomers!:number;
  // public ata:Date = new Date();
  // public eta:Date = new Date();
  // public etr:Date = new Date();
  // public outageTime:Date = new Date();
  // public scheduledTime:Date = new Date();

  constructor(private service:IncidentService, private streetService:StreetService, private callService:CallService) {  }

  ngOnInit(): void {
    this.inc = this.service.currentIncident;//curr incident mora da se reset, vrv kad se klikne new ili mozda edit ako imamo
    
    var body:Device[] = this.service.currentDevices;
    this.streetService.getPriorityForDevices(body).subscribe(
      (res:any)=>{
        this.inc.priority = res.max;
        console.log(res.max);
      },
      err=>{
        console.log(err);
      }
    )

    this.callService.getCallsForDevices(body).subscribe(
      (res:any)=>{
        this.inc.calls = (res.retval).length;
      }
    )
  }

  ngOnDestroy():void{
    this.service.currentIncident = this.inc;
  }

}
