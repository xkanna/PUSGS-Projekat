import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Crew} from '../models/crew.model';
import {RegisterUser} from '../models/registerUser.model'
import {UserService} from '../services/user-service/user.service'

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

  url:any;

  constructor(private userService: UserService, private router:Router) { }

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
    var body:RegisterUser = {
      Username:this.registerForm.get('username')?.value,
      Email:this.registerForm.get('email')?.value,
      Password:this.registerForm.get('password')?.value,
      FullName:this.registerForm.get('firstName')?.value + " " + this.registerForm.get('lastName')?.value,
      DOB:this.registerForm.get('date')?.value,
      Street:this.registerForm.get('address')?.value,
      Role:this.registerForm.get('role')?.value,
      CrewID:this.registerForm.get('role')?.value === "crew"? this.selectedCrew.id : -1 
    };

    this.userService.register(body).subscribe(
      (res:any)=>{
        this.registerForm.reset();
        console.log("worked");
        this.router.navigateByUrl('/');
      },
      err=>{
        console.log(err);
      }
    );

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
