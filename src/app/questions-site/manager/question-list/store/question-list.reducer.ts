import { HttpErrorResponse } from "@angular/common/http";
import { IQuestion } from "src/app/shared/models/question.model";
import *  as QuestionListActions from "./question-list.actions";

export interface State {
    questions: IQuestion[];
    selectedQuestion: IQuestion;
    error: HttpErrorResponse;
}

const initialState = {
    questions: [],
    selectedQuestion: null,
    error: undefined
};

export function questionListReducer(state: State = initialState, action) {
    switch (action.type) {
        case QuestionListActions.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case QuestionListActions.ADD_QUESTION_SUCCESS:
            return {
                ...state,
                questions: [...state.questions, action.payload],
                error: undefined
            }
        case QuestionListActions.ADD_QUESTION_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        case QuestionListActions.REMOVE_QUESTION_SUCCESS:
            return {
                ...state,
                questions: state.questions.filter(item => item.id != action.payload.id),
                error: undefined
            }

        case QuestionListActions.REMOVE_QUESTION_FAILURE:
            return {
                ...state,
                questions: state.questions,
                error: action.payload
            }

        case QuestionListActions.UPDATE_QUESTION_SUCCESS:
            const index = state.questions.findIndex(item => item.id === action.payload.id);
            let updatedQuestions = [...state.questions];
            updatedQuestions[index] = action.payload;

            return {
                ...state,
                questions: updatedQuestions,
                error: undefined
            }


        case QuestionListActions.UPDATE_QUESTION_FAILURE:
            return {
                ...state,
                questions: state.questions,
                error: action.payload
            }

        case QuestionListActions.SET_SELECTED_QUESTION:
            return {
                ...state,
                selectedQuestion: action.payload,
                error: state.error
            }

        case QuestionListActions.LOAD_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: action.payload,
                error: undefined
            }

        case QuestionListActions.LOAD_QUESTIONS_FAILURE:
            return {
                ...state,
                questions: state.questions,
                error: action.payload
            }


        default:
            return {
                ...state
            }
    }
}


