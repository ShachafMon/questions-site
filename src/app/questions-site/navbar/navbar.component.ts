import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { NavigationService } from '../Services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private routerService: NavigationService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.removeCookie();
    this.routerService.navigateTo("/");
  }

  navigate(target: string) {
    this.routerService.navigateTo(`/manager/${target}`);
  }
}
