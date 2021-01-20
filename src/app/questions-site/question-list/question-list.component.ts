import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { NewEditService } from '../new-edit-question/new-edit.service';
import { AuthenticationService } from '../Services/authentication.service';
import { QuestionsService } from '../Services/questions.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  constructor(private questionService: QuestionsService, private newEditService: NewEditService, private router: Router, private authService: AuthenticationService) { 
    this.questionService.questionsSubj.subscribe(data => this.questions = data);
  }

  showNewEditComp = () => this.newEditService.showEditAddComp;
  questions: Question[];
  showPopup: boolean;
  currentQuestion: Question;
  ngOnInit(): void {
    if (!this.authService.checkToken()) {
      alert(`Access token didn't found!`);
      this.router.navigate(['/']);
    }
    this.questionService.GetQuestions();
  }

  OnCreateNewQuestion() {
    this.newEditService.setCurrentQuestion(undefined);
  }

  ngOnDestroy() {
    this.questionService.questionsSubj.unsubscribe();
  }
  onEditQuestion(question: Question) {
    this.newEditService.setCurrentQuestion(question);
  }

  onRemoveQuestion(question: Question) {
    this.currentQuestion = question;
    this.showPopup = true;
  }

  removeQuestion() {
    this.questionService.removeQuestion(this.currentQuestion);
    this.newEditService.reset();
    this.exitPopup();
  }
  exitPopup() {
    this.currentQuestion = null;
    this.showPopup = false;
  }

  orderBy(selected: string) {
    switch (selected) {
      case 'Id':
        this.questions.sort((ques1, quest2) => (ques1.id > quest2.id) ? 1 : -1);
        break;
      case 'Name':
        this.questions.sort((ques1, quest2) => (ques1.name.toLowerCase() > quest2.name.toLowerCase()) ? 1 : -1);
        break;
      case 'Date':
        this.questions.sort((ques1, quest2) => (ques1.creationDate > quest2.creationDate) ? 1 : -1);
        break;
      default:

        break;
    }
  }
  logout() {
    this.authService.removeCookie();
    this.router.navigate(['/']);
  }
  search(search: string) {
    this.questions = this.questionService.questions.filter(ques => ques.name.toLowerCase().includes(search.toLowerCase()));
  }

}
