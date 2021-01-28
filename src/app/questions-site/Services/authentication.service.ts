import { Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from './http.service';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements OnInit {

    constructor(private cookieService: CookieService, private http: HttpService) { }

    ngOnInit() {

    }

    login(loginForm: FormGroup): Promise<void> {
        return new Promise((res, rej) => {
            this.http.Login(loginForm.value).subscribe(
                data => {
                    this.setToken(data['token']);
                    res();
                },
                error => {
                    rej();
                }
            )

        })
    }
  
    setToken(token: string) {
        this.cookieService.set('authToken', token);
    }

    checkToken(): boolean {
        return this.cookieService.check('authToken');
    }

    getToken(): string {
        return this.cookieService.get('authToken');
    }
    
    removeCookie() {
        this.cookieService.delete('authToken');
    }

}

