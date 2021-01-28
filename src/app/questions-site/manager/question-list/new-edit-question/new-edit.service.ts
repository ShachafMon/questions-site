import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IQuestion } from 'src/app/models/question.model';
import { QuestionsService } from '../../../Services/questions.service';

@Injectable({
  providedIn: 'root'
})
export class NewEditService {

  constructor(private questionService: QuestionsService) { }
  private currentQuestion: IQuestion;
  public currentQuestionSbj: Subject<IQuestion> = new Subject<IQuestion>();
  showEditAddComp = false;
  public showEditAddCompSbj: Subject<boolean> = new Subject<boolean>();

  setCurrentQuestion(currentQuestion: IQuestion) {
    this.currentQuestion = currentQuestion;
    this.currentQuestionSbj.next(this.currentQuestion);
    if (currentQuestion)
      this.show();
  }

  getCurrentQuestion(): IQuestion {
    return this.currentQuestion;
  }

  show() {
    this.showEditAddComp = true;
    this.showEditAddCompSbj.next(this.showEditAddComp);
  }
  
  checkIfSelectedCurrentQuestion(): boolean {
    return this.currentQuestion == null;
  }

  UpdateQuestion(question: IQuestion) {
    this.questionService.UpdateQuestion(question);
    this.reset();
  }

  addQuestion(question: IQuestion) {
    this.questionService.addQuestion(question);
    this.reset();
  }

  reset() {
    this.setCurrentQuestion(undefined);
    this.showEditAddComp = false;
    this.showEditAddCompSbj.next(this.showEditAddComp);
  }
}
