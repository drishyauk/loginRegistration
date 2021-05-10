import { Injectable } from '@angular/core';
import { LoginData } from './interface/login-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor() { }

  public login(userName: string){
    localStorage.setItem('ACCESS_TOKEN', userName);
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }


  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('registerd');
  }



}
