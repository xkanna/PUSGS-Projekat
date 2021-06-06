import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TeamService } from '../services/team-service/team.service';
import { Crewmate } from '../models/crewmate.model';
import { Crew } from '../models/crew.model';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {

  public name!:string;
  public selectedWorkers:Crewmate[] = [];
  public workers:Crewmate[] = [];

  constructor(private service:TeamService){
    service.getFreeCrewmates().subscribe(
      (res:any)=>{
        console.log(res.list);
        this.workers = res.list;
      }
    )
  }

  onSubmit(){
    var body:Crew = new Crew();
    body.id = -1;
    body.list = [];
    this.selectedWorkers.forEach(function(value){
      body.list.push(value.username);
    });
    body.name = this.name;
    this.service.addCrew(body).subscribe(
      (res:any)=>{
        console.log(body);
        //alert toster uspesno
      },
      err=>{
        console.log(err);
      }
    )
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
