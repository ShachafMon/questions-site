import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpService, private router: Router, private authService: AuthenticationService) { }
  passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
  wrongLogin: boolean;
  loginForm: FormGroup;
  rememberme: boolean;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(this.passRegex), Validators.minLength(6), Validators.maxLength(20)]]
    });

  }

  async submitLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm).then(() => this.router.navigate(['/manager'])).catch(()=>this.wrongLogin = true);
    }
  }
  get username() { return this.loginForm.get('username') }
  get password() { return this.loginForm.get('password') }
}
