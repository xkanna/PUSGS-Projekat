import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Crew} from '../models/crew.model';
import { RegisterUser } from '../models/registerUser.model';
import { UserService } from '../services/user-service/user.service';

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
    {id: 1, name: 'One', list:[]},
    {id: 2, name: 'Two',list:[]}
  ];

  selectedCrew!:Crew;

  url:any;

  constructor(private service:UserService, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  private loadData(){
    var body:any;
    this.service.getProfile().subscribe(
      (res:any)=>{
        body = res;
        this.registerForm.patchValue({
          username:body.retval.username,
          email:body.retval.email,
          password:"",
          repeat:"",
          firstName:body.retval.fullName.split(' ')[0],
          lastName:body.retval.fullName.split(' ')[1],
          date:body.retval.dob.split('T')[0],
          address:body.retval.street,
          role:body.retval.role,
          crew:body.retval.crewID
        });
      },
      err=>{
        console.log(err);
      }
    );  
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
    var body:RegisterUser = {
      Username:this.registerForm.get('username')?.value,
      Email:this.registerForm.get('email')?.value,
      Password:this.registerForm.get('password')?.value,
      FullName:this.registerForm.get('firstName')?.value + " " + this.registerForm.get('lastName')?.value,
      DOB:this.registerForm.get('date')?.value,
      Street:this.registerForm.get('address')?.value,
      Role:this.registerForm.get('role')?.value,
      CrewID:this.registerForm.get('role')?.value === "crew"? this.selectedCrew.id : -1 
    }
    this.service.editProfile(body, this.registerForm.get('repeat')?.value).subscribe(
      (res:any)=>{
        localStorage.setItem("FullName",body.FullName);
        if(res.msg === "changedpass"){
          localStorage.clear();
          this.router.navigateByUrl("/");
        }else{
          if(res.msg==="ok"){
            this.loadData();
          }
          else{
            //eror pri promeni passa
          }
        }
      },
      err=>{
        console.log(err);
      }
    )
    this.loadData();
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
