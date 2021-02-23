import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { LoadQuestions, SetError } from '../manager/question-list/store/question-list.actions'
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }
  error: HttpErrorResponse = undefined;
  showError: boolean = false;
  ngOnInit() {
    this.store.select('questionList').subscribe(store => {
      if (store.error) {
        this.error = store.error;
        this.showError = true;
      }
    });
    this.store.dispatch(new LoadQuestions());

  }

  onOkClicked() {
    this.showError = false;
    this.store.dispatch(new SetError(undefined));
  }
}
