import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginData } from 'src/app/interface/login-data';
import { LoginRegServiceService } from '../login-reg-service.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  signUpSubmitted:boolean = false;
  loginSubmitted:boolean = false;
  loginErrMsg: string = '';
  userInfo = [];
  loggedUserDetails = [];
  formGroup1;
  registeredData;

  @Output() messageEvent = new EventEmitter<any>();

  @Input() isLoggedIn: string;

  get lf() { return this.loginForm.controls; }

  constructor(private service: LoginRegServiceService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
      this.formGroup1 = this.fb.group({
        username: '',
        password: ''
      }); 
      if (authService.isLoggedIn()) {
        this.router.navigate(['/login']);
      } else {
        this.createForm();
      }
    }

  ngOnInit() {
     this.registeredData = JSON.parse(localStorage.getItem('registerd'));
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit1(formData) {
   this.signUpSubmitted = false;
    this.loginSubmitted = true;
    if (formData) {
      const loginData: LoginData = {
        email: formData.username,
        password: formData.password
      }
     var ex = this.service.postUserLogin(loginData);
      if ( ex ==  true) {
        this.authService.login(loginData.email);
        this.router.navigate(['/dashboard']);
      } else {
        this.loginErrMsg = "Username or Password is incorrect";
      }
    } 
     if(this.registeredData) {
      if((formData.username == this.registeredData.email) &&(formData.password == this.registeredData.password)) {
        this.router.navigate(['/dashboard']);
      } else {
        this.loginErrMsg = "Username or Password is incorrect";
      }
    }
  }
}
