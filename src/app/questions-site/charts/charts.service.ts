import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { QuestionsService } from '../Services/questions.service';

@Injectable({
    providedIn: 'root'
})
export class ChartsService {
    constructor(private questionService : QuestionsService) {
        
    }
}