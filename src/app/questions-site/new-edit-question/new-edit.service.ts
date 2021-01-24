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
  public showEditAddCompSbj: Subject<boolean> = new Subject<boolean>();

  setCurrentQuestion(currentQuestion: Question) {
    this.currentQuestion = currentQuestion;
    this.currentQuestionSbj.next(this.currentQuestion);
    if (currentQuestion)
      this.show();
  }
  getCurrentQuestion(): Question {
    return this.currentQuestion;
  }
  show() {
    this.showEditAddComp = true;
    this.showEditAddCompSbj.next(this.showEditAddComp);
  }
  checkIfSelectedCurrentQuestion(): boolean {
    return this.currentQuestion == null;
  }

  UpdateQuestion(question: Question) {
    this.questionService.UpdateQuestion(question);
    this.reset();
  }

  addQuestion(question: Question) {
    this.questionService.addQuestion(question);
    this.reset();
  }
  reset() {
    this.setCurrentQuestion(undefined);
    this.showEditAddComp = false;
    this.showEditAddCompSbj.next(this.showEditAddComp);
  }
}
