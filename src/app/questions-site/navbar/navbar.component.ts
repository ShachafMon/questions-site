import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router : Router, private authService : AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.removeCookie();
    this.router.navigate(['/']);
  }
}
