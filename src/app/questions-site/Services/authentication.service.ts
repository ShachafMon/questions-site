import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements OnInit {

    constructor(private cookieService: CookieService) { }

    ngOnInit() {

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

