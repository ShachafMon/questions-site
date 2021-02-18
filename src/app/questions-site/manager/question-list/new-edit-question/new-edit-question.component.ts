import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IQuestion } from 'src/app/shared/models/question.model';
import * as fromApp from '../../../../store/app.reducer';
import { AddQuestion, UpdateQuestion } from '../store/question-list.actions';

@Component({
  selector: 'app-new',
  templateUrl: './new-edit-question.component.html',
  styleUrls: ['./new-edit-question.component.css']
})
export class NewComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder, private store: Store<fromApp.AppState>) { }
  subs: Subscription[] = [];
  currentQuestion: IQuestion;
  newQuestionForm: FormGroup;
  @Output() onExit : EventEmitter<null> = new EventEmitter<null>();

  ngOnInit(): void {
    this.subs.push(this.store.select('questionList').subscribe(data => {
      this.currentQuestion = data.selectedQuestion;
      this.makeForm();
    }));
  }

  ngOnDestroy() {
    this.subs.forEach((item) => item.unsubscribe());
  }

  makeForm() {
    this.newQuestionForm = this.formBuilder.group({
      name: [this.currentQuestion?.name, [Validators.required, Validators.minLength(3)]],
      description: [this.currentQuestion?.description, [Validators.required, Validators.minLength(3)]],
      id: [''],
      creationDate: ''
    });
  }

  submitQuestion() {
    debugger;
    if (!this.currentQuestion) {
      this.newQuestionForm.controls['creationDate'].setValue(new Date());
      this.store.dispatch(new AddQuestion(this.newQuestionForm.value));
    } else {
      this.newQuestionForm.controls['id'].setValue(this.currentQuestion.id);
      this.newQuestionForm.controls['creationDate'].setValue(new Date(this.currentQuestion.creationDate));
      this.store.dispatch(new UpdateQuestion(this.newQuestionForm.value));
    }
  }

  exit() {
    
    this.onExit.emit();
  }

  get description() { return this.newQuestionForm.get('description') }
  get name() { return this.newQuestionForm.get('name') }
}
