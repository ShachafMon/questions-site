import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IQuestion } from 'src/app/shared/models/question.model';
import * as fromApp from '../../../store/app.reducer'
import { Store } from '@ngrx/store';
import * as QuestionListActions from '../question-list/store/question-list.actions'

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  subsuribes: Subscription[] = [];
  showNewEditComp: boolean;
  questions: IQuestion[];
  deletePopup: boolean;
  infoPopup: boolean;
  currentQuestion: IQuestion;
  removeQuesMsg = () => `Are you sure you want to remove ${this.currentQuestion.name}`;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.subsuribes.push(this.store.select('questionList').subscribe(data => {
      if (data) {
        this.questions = data.questions;
        this.currentQuestion = data.selectedQuestion;
      }
    }));
  }
  exitEdit()
  {
    this.showNewEditComp = false;
    this.setCurrentQuestion(null);
  }
  OnCreateNewQuestion() {
    this.setCurrentQuestion(null);
    this.showNewEditComp = true;
  }

  ngOnDestroy() {
    this.subsuribes.forEach((sub) => { sub.unsubscribe(); })
  }

  onEditQuestion(question: IQuestion) {
    this.setCurrentQuestion(question);
    this.showNewEditComp = true;
  }

  onRemoveQuestion(question: IQuestion) {
    this.setCurrentQuestion(question);
    this.deletePopup = true;
  }

  removeQuestion() {
    this.store.dispatch(new QuestionListActions.RemoveQuestion(this.currentQuestion));
    this.exitPopup();
  }

  setCurrentQuestion(question: IQuestion) {
    this.store.dispatch(new QuestionListActions.SetSelectedQuestion(question));
  }

  exitPopup() {
    this.setCurrentQuestion(null);
    this.deletePopup = false;
    this.infoPopup = false;
  }

  showInfo(question: IQuestion) {
    this.currentQuestion = question;
    this.infoPopup = true;
  }

  orderBy(selected: string) {
    switch (selected) {
      case 'Id':
        this.questions.sort((ques1, quest2) => (parseInt(ques1.id.slice(1)) > parseInt(quest2.id.slice(1))) ? 1 : -1);
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

  search(search: string) {
    this.questions = this.questions.filter(ques => ques.name.toLowerCase().includes(search.toLowerCase()));
  }


}
