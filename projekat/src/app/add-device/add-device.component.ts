import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Device } from '../models/device.model';
import { DeviceService } from '../services/device-service/device.service';

@Component({
  selector: 'add-device',
  styleUrls: ['add-device.component.css'],
  templateUrl: 'add-device.component.html',
})
export class AddDeviceComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'type', 'street'];
  dataSource!: MatTableDataSource<Device>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:DeviceService) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.service.getDevices().subscribe(
      (res:any)=>{
        console.log(res);
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

