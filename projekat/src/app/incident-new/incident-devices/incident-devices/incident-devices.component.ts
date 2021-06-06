import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DeviceModalComponent } from 'src/app/device-modal/device-modal.component';
import { Device } from 'src/app/models/device.model';
import { IncidentService } from 'src/app/services/incident-service/incident.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
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

  constructor(public dialog: MatDialog, private incidentService:IncidentService) {
    this.dataSource = new MatTableDataSource();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeviceModalComponent, {
      width: '75%',
      data: { deviceId: this.selectedDeviceId, incidentId: -1}//ovde promeniti ako je bitan id onog ko poziva modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.selectedDeviceId = result;//oni salju konkretno animal iz modala u this.modal, mozda mora da se pazi ovde
    });
  }
  

  ngAfterViewInit() {
    this.incidentService.getIncidents().subscribe(
      (res:any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}