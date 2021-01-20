import { Injectable, OnInit } from '@angular/core';
import { Question } from '../../models/question.model';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService implements OnInit {
  questions: Question[];
  public questionsSubj = new Subject<Question[]>();
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

  UpdateQuestion(question: Question) {
    this.http.UpdateQuestion(question).subscribe(
      data => {
        alert("Question was updated");
        var newQuest = data['newQuestion'];
        var quest: Question = this.questions.find((ques) => ques.id == newQuest.id);
        if (quest) {
          quest.name = newQuest.name;
          quest.description = newQuest.description;
        }
      },
      error => { alert(error['message']); }
    )
  }

  addQuestion(question: Question) {
    question.creationDate = new Date();
    this.http.CreateQuestion(question).subscribe(
      data => {
        alert(data['message']);
        this.questions.push(data['qa']);
      },
      error => { alert(error['error']['message']); }
    )
  }

  removeQuestion(question: Question) {
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
