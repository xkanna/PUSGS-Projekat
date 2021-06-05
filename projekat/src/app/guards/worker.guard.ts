import { Injectable } from "@angular/core";
import {CanActivate, Router} from "@angular/router";

@Injectable()
export class WorkerGuard implements CanActivate {
    constructor(private router:Router){}
    canActivate() {
      /*
      if(localStorage.Role==="Worker"){
        console.log("wtf");
        this.router.navigateByUrl('/dashboard');
        return false;
      }*/
      return true;
    }
  }