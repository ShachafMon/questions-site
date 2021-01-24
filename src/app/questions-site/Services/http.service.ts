import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Question } from '../../models/question.model';
import { User } from '../../models/user.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private cookieService : CookieService) { }

  headers = () => new HttpHeaders({ "authorization": `${this.cookieService.get('authToken')}` });
  private baseUrl = 'http://localhost:3000';

  Login(user: User): Observable<Object> {
    return this.http.post(`${this.baseUrl}/auth/login`, user);
  }

  GetAllQuestions(): Observable<Object> {
    return this.http.get(`${this.baseUrl}/qa`, { headers: this.headers() });
  }

  GetQuestionById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: this.headers() });
  }
  CreateQuestion(question: Question): Observable<Object> {
    return this.http.post(`${this.baseUrl}/qa/create`, question, { headers: this.headers() });
  }

  UpdateQuestion(question: Question): Observable<Object> {
    return this.http.put(`${this.baseUrl}/qa/update/${question.id}`, question, { headers: this.headers() });
  }

  DeleteQuestion(id: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/qa/delete/${id}`, { headers: this.headers() });
  }
}
