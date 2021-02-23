import { HttpErrorResponse } from "@angular/common/http";
import { Action } from "@ngrx/store";
import { IQuestion } from "src/app/shared/models/question.model";

export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_SUCCESS = 'ADD_QUESTION_SUCCESS';
export const ADD_QUESTION_FAILURE = 'ADD_QUESTION_FAILURE';

export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const REMOVE_QUESTION_SUCCESS = 'REMOVE_QUESTION_SUCCESS';
export const REMOVE_QUESTION_FAILURE = 'REMOVE_QUESTION_FAILURE';

export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS';
export const UPDATE_QUESTION_FAILURE = 'UPDATE_QUESTION_FAILURE';

export const SET_SELECTED_QUESTION = 'SET_SELECTED_QUESTION';
export const SET_ERROR = 'SET_ERROR';

export const LOAD_QUESTIONS = 'LOAD_QUESTIONS';
export const LOAD_QUESTIONS_SUCCESS = 'LOAD_QUESTIONS_SUCCESS';
export const LOAD_QUESTIONS_FAILURE = 'LOAD_QUESTIONS_FAILURE';

export class SetError implements Action {
    readonly type = SET_ERROR
    constructor(public payload : HttpErrorResponse) { }
}

export class LoadQuestions implements Action {
    readonly type = LOAD_QUESTIONS;
}
export class LoadQuestionsSuccess implements Action {
    readonly type = LOAD_QUESTIONS_SUCCESS;
    constructor(public payload: IQuestion[]) { }
}

export class LoadQuestionsFailure implements Action {
    readonly type = LOAD_QUESTIONS_FAILURE;
    constructor(public payload: string = "Oops... Probably server is not running!") { }
}

export class AddQuestion implements Action {
    readonly type = ADD_QUESTION;
    constructor(public payload: IQuestion) { }
}
export class AddQuestionSuccess implements Action {
    readonly type = ADD_QUESTION_SUCCESS;
    constructor(public payload: IQuestion) { }
}
export class AddQuestionFailure implements Action {
    readonly type = ADD_QUESTION_FAILURE;
    constructor(public payload: HttpErrorResponse) { }
}


export class RemoveQuestion implements Action {
    readonly type = REMOVE_QUESTION;

    constructor(public payload: IQuestion) { }
}
export class RemoveQuestionSuccess implements Action {
    readonly type = REMOVE_QUESTION_SUCCESS;

    constructor(public payload: string) { }
} export class RemoveQuestionFailure implements Action {
    readonly type = REMOVE_QUESTION_FAILURE;

    constructor(public payload: HttpErrorResponse) { }
}

export class UpdateQuestion implements Action {
    readonly type = UPDATE_QUESTION;

    constructor(public payload: IQuestion) { }
}
export class UpdateQuestionSuccess implements Action {
    readonly type = UPDATE_QUESTION_SUCCESS;

    constructor(public payload: IQuestion) { }
} export class UpdateQuestionFailure implements Action {
    readonly type = UPDATE_QUESTION_FAILURE;

    constructor(public payload: HttpErrorResponse) { }
}

export class SetSelectedQuestion implements Action {
    readonly type = SET_SELECTED_QUESTION;
    constructor(public payload: IQuestion) { }
}

export type QuestionListActions =
    | AddQuestion
    | AddQuestionSuccess
    | AddQuestionFailure
    | RemoveQuestion
    | RemoveQuestionSuccess
    | RemoveQuestionFailure
    | UpdateQuestion
    | UpdateQuestionSuccess
    | UpdateQuestionFailure
    | SetSelectedQuestion
    | LoadQuestions
    | LoadQuestionsSuccess
    | LoadQuestionsFailure;