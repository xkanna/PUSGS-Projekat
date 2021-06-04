import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() title!: string;

  userFullName!:string;

  constructor(private router:Router) {
    
   }

  ngOnInit(): void {
    this.userFullName = localStorage.getItem("FullName") as string;
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/");
  }
}
