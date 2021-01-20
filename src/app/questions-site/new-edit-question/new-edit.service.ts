import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { QuestionsService } from '../Services/questions.service';

@Injectable({
  providedIn: 'root'
})
export class NewEditService {

  constructor(private questionService: QuestionsService) { }
  private currentQuestion: Question;
  public currentQuestionSbj: Subject<Question> = new Subject<Question>();
  showEditAddComp = false;

  setCurrentQuestion(currentQuestion: Question) {
    this.currentQuestion = currentQuestion;
    this.currentQuestionSbj.next(this.currentQuestion);
    this.showEditAddComp = true;
  }
  getCurrentQuestion(): Question {
    return this.currentQuestion;
  }

  checkIfSelectedCurrentQuestion(): boolean {
    return this.currentQuestion == null;
  }

  UpdateQuestion(question: Question) {
    this.questionService.UpdateQuestion(question);
    this.reset();
  }

  addQuestion(question: Question) {
    console.log(question);
    this.questionService.addQuestion(question);
    this.reset();
  }
  reset() {
    this.setCurrentQuestion(undefined);
    this.showEditAddComp = false;
  }

}
