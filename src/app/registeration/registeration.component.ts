import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginRegServiceService } from '../login-reg-service.service';
import { SignUpData } from '../interface/sign-up-data';
import { MustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  signUpSubmitted:boolean = false;
  loginSubmitted:boolean = false;
  signUpForm: FormGroup;
  private registrationSuccessMsg:string = '';
  private registrationErrsMsg:string = '';
  formGroup2;

  get sf() { return this.signUpForm.controls; }

  constructor(private fb: FormBuilder, 
    private service: LoginRegServiceService, 
    private authService: AuthService, 
    private router: Router) {
      this.formGroup2 = this.fb.group({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }); 
     }

  ngOnInit() {
  }

  createForm(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit2(formData) {
   this.signUpSubmitted = true;
    this.loginSubmitted = false;
    if (formData) {
      const signupdata: SignUpData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      }
      this.service.postSignUpData(signupdata).subscribe(res => {
        //
      });

      localStorage.setItem('registerd', JSON.stringify(signupdata));
      this.router.navigate(['/login']);
    } 

  }
}
