import { Actions, Effect, ofType } from '@ngrx/effects'
import * as QuestionListActions from './question-list.actions';
import { map, mergeMap, catchError } from 'rxjs/operators'
import { HttpService } from 'src/app/questions-site/Services/http.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class QuestionListEffects {

    constructor(private actions: Actions, private http: HttpService) { }

    @Effect() loadQuestions = this.actions.pipe(
        ofType<QuestionListActions.LoadQuestions>(QuestionListActions.LOAD_QUESTIONS),
        mergeMap(() =>
            this.http.GetAllQuestions().pipe(
                map(data => new QuestionListActions.LoadQuestionsSuccess(data['questions'])),
                catchError(error => of(new QuestionListActions.LoadQuestionsFailure(error)))
            )
        )
    )

    @Effect() removeQuestion = this.actions.pipe(
        ofType<QuestionListActions.RemoveQuestion>(QuestionListActions.REMOVE_QUESTION),
        mergeMap(
            (data) => this.http.DeleteQuestion(data.payload.id).pipe(
                map(res => {debugger; return new QuestionListActions.RemoveQuestionSuccess(res['question'])}),
                catchError(error => of(new QuestionListActions.RemoveQuestionFailure(error)))
            )
        )
    )

    @Effect() addQuestion = this.actions.pipe(
        ofType<QuestionListActions.AddQuestion>(QuestionListActions.ADD_QUESTION),
        mergeMap(
            (data) => this.http.CreateQuestion(data.payload).pipe(
                map(res => new QuestionListActions.AddQuestionSuccess(res['qa'])),
                catchError(error => of(new QuestionListActions.AddQuestionFailure(error)))
            )
        )
    )
    @Effect() updateQuestion = this.actions.pipe(
        ofType<QuestionListActions.UpdateQuestion>(QuestionListActions.UPDATE_QUESTION),
        mergeMap(
            (data) => this.http.UpdateQuestion(data.payload).pipe(
                map(res => new QuestionListActions.UpdateQuestionSuccess(res['newQuestion'])),
                catchError(error => of(new QuestionListActions.UpdateQuestionFailure(error)))
            )
        )
    )



}