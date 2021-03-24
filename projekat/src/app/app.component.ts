import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentTitle = "Home";

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.currentTitle=val.url;
        this.currentTitle = this.currentTitle.split('-').join(' ');
        this.currentTitle = this.currentTitle.split('/')[1];
      }
  });
  }
}
