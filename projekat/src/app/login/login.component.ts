import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() title!: string;

  loginForm!: FormGroup;

  constructor() {
    
   }

   ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl('')
    });
  }

  onSubmit() {
    //validacija da li je username in use, da li su passwordi isti itd
    console.log(this.loginForm.get('username')?.value);
    console.log(this.loginForm.value);
    console.log(this.loginForm);
  }
}