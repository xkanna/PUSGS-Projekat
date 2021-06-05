import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device.model';
import { Street } from '../models/street.model';
import { DeviceService } from '../services/device-service/device.service';
import { StreetService } from '../services/street-service/street.service';

@Component({
  selector: 'add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.css']
})
export class AddNewDeviceComponent implements OnInit {

  selectedType!:string;
  name!:string;
  streets!:Street[];
  selectedStreet!:string;

  constructor(private streetService:StreetService, private deviceService:DeviceService) { 
    streetService.getStreets().subscribe(
      (res:any)=>{
        this.streets = res;
      },
      err=>{
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
  }

  onCauseChange($event:any){
    this.refreshName();
  }

  onSubmit(){
    var body:Device = new Device();
    body.name = this.name;
    body.street = this.selectedStreet;
    body.type = this.selectedType;
    this.deviceService.addDevice(body).subscribe(
      (res:any)=>{
        //toster pop up gj u did it
        this.refreshName();
      },
      err=>{
        console.log(err);
      }
    )
  }

  refreshName(){
    this.deviceService.getNextId(this.selectedType).subscribe(
      (res:any)=>{
        this.name = res.newId;
      },
      err=>{
        console.log(err);
      }
    )
  }
}
