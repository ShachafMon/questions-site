import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Question } from '../../models/question.model';
import { User } from '../../models/user.model';
import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  headers = () => new HttpHeaders({ "authorization": `${this.cookieService.get('authToken')}` });


  Login(user: User): Observable<Object> {
    return this.http.post(`${environment.baseServerUrl}/auth/login`, user);
  }

  GetAllQuestions(): Observable<Object> {
    return this.http.get(`${environment.baseServerUrl}/qa`, { headers: this.headers() });
  }

  GetQuestionById(id: number): Observable<Object> {
    return this.http.get(`${environment.baseServerUrl}/${id}`, { headers: this.headers() });
  }
  CreateQuestion(question: Question): Observable<Object> {
    return this.http.post(`${environment.baseServerUrl}/qa/create`, question, { headers: this.headers() });
  }

  UpdateQuestion(question: Question): Observable<Object> {
    return this.http.put(`${environment.baseServerUrl}/qa/update/${question.id}`, question, { headers: this.headers() });
  }

  DeleteQuestion(id: string): Observable<Object> {
    return this.http.delete(`${environment.baseServerUrl}/qa/delete/${id}`, { headers: this.headers() });
  }
}
