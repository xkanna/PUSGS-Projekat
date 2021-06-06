import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DeviceModalComponent } from 'src/app/device-modal/device-modal.component';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device-service/device.service';
import { IncidentService } from 'src/app/services/incident-service/incident.service';


@Component({
  selector: 'incident-devices',
  styleUrls: ['incident-devices.component.css'],
  templateUrl: 'incident-devices.component.html',
})
export class IncidentDevicesComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'type', 'street'];
  dataSource: MatTableDataSource<Device>;

  selectedDeviceId!:string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private incidentService:IncidentService, private deviceService:DeviceService) {
    this.dataSource = new MatTableDataSource();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeviceModalComponent, {
      width: '75%',
      data: { deviceId: this.selectedDeviceId, incidentId: -1}//ovde promeniti ako je bitan id onog ko poziva modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      this.deviceService.getDeviceByName(result).subscribe(
        (res:any)=>{
          this.incidentService.currentDevices.push(res.retval);
          this.dataSource = new MatTableDataSource(this.incidentService.currentDevices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        err=>{
          console.log(err);
        }
      )
      //this.selectedDeviceId = result;//oni salju konkretno animal iz modala u this.modal, mozda mora da se pazi ovde
    });
  }
  

  ngAfterViewInit() {
      this.dataSource = new MatTableDataSource(this.incidentService.currentDevices);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}