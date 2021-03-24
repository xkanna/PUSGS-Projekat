import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {Crew} from '../models/crew.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'repeat': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'date': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'role': new FormControl('', Validators.required),
      'crew': new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    console.log(this.registerForm);
  }
}
