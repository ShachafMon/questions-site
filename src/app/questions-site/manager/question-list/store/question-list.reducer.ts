import { IQuestion } from "src/app/shared/models/question.model";
import *  as QuestionListActions from "./question-list.actions";

export interface State {
    questions: IQuestion[];
    selectedQuestion: IQuestion;

}

const initialState = {
    questions: [],
    selectedQuestion: null
};

export function questionListReducer(state = initialState, action) {
    switch (action.type) {
        case QuestionListActions.ADD_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload]
            }
        case QuestionListActions.REMOVE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(item => item !== action.payload)
            }
        case QuestionListActions.UPDATE_QUESTION:
            const index = state.questions.findIndex(item => item.id === action.payload.id);
            let updatedQuestions = [...state.questions];
            updatedQuestions[index] = action.payload;

            return {
                ...state,
                questions: updatedQuestions
            }

        case QuestionListActions.SET_SELECTED_QUESTION:
            return {
                ...state,
                selectedQuestion: action.payload
            }

        case QuestionListActions.SET_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            }

        default:
            return {
                ...state
            }
    }
}


