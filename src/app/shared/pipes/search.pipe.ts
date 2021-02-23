import { Pipe, PipeTransform } from '@angular/core'
import { IQuestion } from '../models/question.model'

@Pipe({ name: 'searchpipe' })
export class SearchPipe implements PipeTransform {
    transform(questions: IQuestion[], searchVal: string): IQuestion[] {
        if (questions && searchVal) {
            return questions.filter(ques => ques.name.toLowerCase().includes(searchVal.toLowerCase()));
        }
        else return questions;
    }
}