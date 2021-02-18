import { Action } from "@ngrx/store";
import { IQuestion } from "src/app/shared/models/question.model";

export const ADD_QUESTION = 'ADD_QUESTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const SET_SELECTED_QUESTION = 'SET_SELECTED_QUESTION';
export const SET_QUESTIONS = 'SET_QUESTIONS';

export class SetQuestions implements Action{
    readonly type = SET_QUESTIONS;

    constructor(public payload: IQuestion[]) { }

}
export class AddQuestion implements Action {
    readonly type = ADD_QUESTION;

    constructor(public payload: IQuestion) { }
}

export class RemoveQuestion implements Action {
    readonly type = REMOVE_QUESTION;

    constructor(public payload: IQuestion) { }
}

export class UpdateQuestion implements Action {
    readonly type = UPDATE_QUESTION;

    constructor(public payload: IQuestion) { }
}

export class SetSelectedQuestion implements Action {
    readonly type = SET_SELECTED_QUESTION;
    constructor(public payload: IQuestion) { }
}

export type QuestionListActions = AddQuestion | RemoveQuestion | UpdateQuestion | SetSelectedQuestion | SetQuestions;