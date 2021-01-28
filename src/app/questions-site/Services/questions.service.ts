import { Injectable, OnInit } from '@angular/core';
import { IQuestion } from '../../models/question.model';
import { HttpService } from './http.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService implements OnInit {
  questions: IQuestion[] = [];
  public questionsSubj = new BehaviorSubject<IQuestion[]>(undefined);
    
    constructor(private http: HttpService, private router: Router, private authService: AuthenticationService) { this.GetQuestions(); }
  ngOnInit() {

  }

  GetQuestions() {
    this.http.GetAllQuestions().subscribe(
      questions => {
        this.questions = questions['questions'];
        this.questionsSubj.next(this.questions);
      },
      error => {
        console.log(error['message']);
        this.checkStatus(error)

      });
  }

  UpdateQuestion(question: IQuestion) {
    this.http.UpdateQuestion(question).subscribe(
      data => {
        alert("Question was updated");
        var newQuest = data['newQuestion'];
        var quest: IQuestion = this.questions.find((ques) => ques.id == newQuest.id);
        this.questionsSubj.next(this.questions);
        if (quest) {
          quest.name = newQuest.name;
          quest.description = newQuest.description;
        }
      },
      error => { alert(error['message']); }
    )
  }

  addQuestion(question: IQuestion) {
    question.creationDate = new Date();
    this.http.CreateQuestion(question).subscribe(
      data => {
        alert(data['message']);
        this.questions.push(data['qa']);
        this.questionsSubj.next(this.questions);
      },
      error => { alert(error['error']['message']); }
    )
  }

  removeQuestion(question: IQuestion) {
    this.http.DeleteQuestion(question.id).subscribe(
      data => {
        alert(data['message']);
        this.questions = this.questions.filter(ques => ques.id != question.id);
        this.questionsSubj.next(this.questions);
      }),
      error => alert(error['message']);
  }

  checkStatus(error) {
    switch (error['status']) {
      case 403:
        this.authService.removeCookie();
        this.router.navigate(['/']);
        break;
      case 401:
        this.authService.removeCookie();
        this.router.navigate(['/']);
        break;
      default:
        break;
    }
  }
}
