import { Pipe, PipeTransform } from '@angular/core'
import { FilterType } from '../enums/filter-type.enum';
import { IQuestion } from '../models/question.model'

@Pipe({ name: 'filterpipe' })
export class FilterPipe implements PipeTransform {
    transform(questions: IQuestion[], filterType: FilterType): IQuestion[] {
        if (questions && filterType) {
            switch (Number(filterType)) {
                case FilterType.Date:
                    return questions.sort((ques1, quest2) => (ques1.creationDate > quest2.creationDate) ? 1 : -1);
                case FilterType.Id:
                    return questions.sort((ques1, quest2) => (parseInt(ques1.id.slice(1)) > parseInt(quest2.id.slice(1))) ? 1 : -1);
                case FilterType.Name:
                    let sorted = questions.sort((ques1, quest2) => (ques1.name.toLowerCase() > quest2.name.toLowerCase()) ? 1 : -1);
                    return sorted;
                default:
                   
            }
        }
        else return questions;
        

    }
}
