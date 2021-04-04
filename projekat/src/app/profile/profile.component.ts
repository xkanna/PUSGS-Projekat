import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {Crew} from '../models/crew.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

registerForm!: FormGroup;

  roles: string[] = [
    "Crew Member",
    "Dispatcher",
    "Worker"
  ];

  selectedRole!:string;
  crews: Crew[] = [
    {id: 1, name: 'One'},
    {id: 2, name: 'Two'}
  ];

  selectedCrew!:Crew;

  url:any;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl(''),
      'repeat': new FormControl(''),
      'email': new FormControl(''),
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'date': new FormControl(''),
      'address': new FormControl(''),
      'role': new FormControl(''),
      'crew': new FormControl(''),
      'image': new FormControl(null)
    });
  }

  onSubmit() {
    //validacija da li je username in use, da li su passwordi isti itd
    console.log(this.registerForm.get('username')?.value);
    console.log(this.registerForm.value);
    console.log(this.registerForm);
  }

  onSelectFile(event:any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log(event.target.files[0]);

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
        console.log(this.registerForm.get('image')?.value);
      }
    }
}
}
