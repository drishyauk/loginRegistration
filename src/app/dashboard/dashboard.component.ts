import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedIn: boolean = false;
  constructor(private auth:AuthService,
    private route: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.loggedIn = false;
    this.route.navigate(['/login']);

  }

}
