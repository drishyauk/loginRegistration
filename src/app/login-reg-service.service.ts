import { Injectable } from '@angular/core';
import { LoginData } from './interface/login-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlockingProxy } from 'blocking-proxy';
import { SignUpData } from './interface/sign-up-data';

@Injectable({
  providedIn: 'root'
})
export class LoginRegServiceService {

  loginDetails = {
    "username": "drishya@example.com",
    "password": "test@123"
  }

  constructor(private http: HttpClient) { }
  
  postUserLogin(data: LoginData) {
    var res;
    var entereddetails = data;
    var loginStatus: Boolean = false;
    if ((entereddetails.email == this.loginDetails.username) && (entereddetails.password == this.loginDetails.password)) {
      loginStatus = true;
    } else {
      loginStatus = false;
    }
    const headers = new HttpHeaders()
      // .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      return loginStatus;
   // return this.http.post(loginStatus, data, {
     // headers: headers, responseType: 'json'
    //})
  }

  postSignUpData(data: SignUpData) {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      localStorage.setItem('ACCESS_TOKEN', JSON.stringify(data));
    return this.http.post(``, data, {
      headers: headers, responseType: 'json'
    });

  }
  
}
