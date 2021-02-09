import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';



@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }
  
  ngOnInit() {
    if (!this.authService.checkToken()) {
      this.router.navigate(['/']);
    }
  }
}
