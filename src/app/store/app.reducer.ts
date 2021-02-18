import { ActionReducerMap } from '@ngrx/store';
import * as fromQuestionList from '../questions-site/manager/question-list/store/question-list.reducer'


export interface AppState {
    questionList: fromQuestionList.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    questionList: fromQuestionList.questionListReducer
};
