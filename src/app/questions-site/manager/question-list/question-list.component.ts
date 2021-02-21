import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IQuestion } from 'src/app/shared/models/question.model';
import * as fromApp from '../../../store/app.reducer'
import { Store } from '@ngrx/store';
import * as QuestionListActions from '../question-list/store/question-list.actions'
import { HttpService } from '../../Services/http.service';
import { FilterType } from '../../../shared/enums/filter-type.enum'

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  subsuribes: Subscription[] = [];
  filterTypesKeys = Object.values(FilterType).filter(val => isNaN(Number(val)) === false).map(key => FilterType[key]);
  selectedFilter: FilterType;
  showNewEditComp: boolean;
  questions: IQuestion[];
  deletePopup: boolean;
  infoPopup: boolean;
  currentQuestion: IQuestion;
  searchValue: string = '';
  removeQuesMsg = () => `Are you sure you want to remove ${this.currentQuestion.name}`;

  constructor(private store: Store<fromApp.AppState>, private httpService: HttpService) {
  }

  onFilter() {
    console.log(this.selectedFilter);

  }
  ngOnInit(): void {
    this.subsuribes.push(this.store.select('questionList').subscribe(data => {
      if (data) {
        this.questions = data.questions;
        this.currentQuestion = data.selectedQuestion;
      }
    }));
  }
  exitEdit() {
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
    this.httpService.DeleteQuestion(this.currentQuestion.id).subscribe(data => {
      this.store.dispatch(new QuestionListActions.RemoveQuestion(this.currentQuestion));
      this.exitPopup();
    },
      error => alert(error['message'])
    );
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


}
