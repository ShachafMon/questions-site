import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewEditService } from './new-edit-question/new-edit.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { QuestionsService } from '../../Services/questions.service';
import { IQuestion } from 'src/app/shared/models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  subsuribes: Subscription[] = [];
  showNewEditComp: boolean;
  questions: IQuestion[];
  deletePopup: boolean;
  infoPopup: boolean;
  currentQuestion: IQuestion;
  removeQuesMsg = () => `Are you sure you want to remove ${this.currentQuestion.name}`;

  constructor(private questionService: QuestionsService, private newEditService: NewEditService) {
  }

  ngOnInit(): void {
  
    this.subsuribes.push(this.questionService.questionsSubj.subscribe(data => {
      if (data)
        this.questions = data;
    }));
    this.subsuribes.push(this.newEditService.showEditAddCompSbj.subscribe(data => this.showNewEditComp = data));
  }

  OnCreateNewQuestion() {
    this.showNewEditComp = true;
    this.newEditService.setCurrentQuestion(undefined);
  }

  ngOnDestroy() {
    this.subsuribes.forEach((sub) => { sub.unsubscribe(); })
  }

  onEditQuestion(question: IQuestion) {
    this.newEditService.setCurrentQuestion(question);
    this.showNewEditComp = true;
  }

  onRemoveQuestion(question: IQuestion) {
    this.currentQuestion = question;
    this.deletePopup = true;
  }

  removeQuestion() {
    this.questionService.removeQuestion(this.currentQuestion);
    this.newEditService.reset();
    this.exitPopup();
  }

  exitPopup() {
    this.currentQuestion = null;
    this.deletePopup = false;
    this.infoPopup = false;
  }

  showInfo(question: IQuestion) {
    this.currentQuestion = question;
    this.infoPopup = true;
  }

  orderBy(selected: string) {
    switch (selected) {
      case 'Id':
        this.questions.sort((ques1, quest2) => (parseInt(ques1.id.slice(1)) > parseInt(quest2.id.slice(1))) ? 1 : -1);
        break;
      case 'Name':
        this.questions.sort((ques1, quest2) => (ques1.name.toLowerCase() > quest2.name.toLowerCase()) ? 1 : -1);
        break;
      case 'Date':
        this.questions.sort((ques1, quest2) => (ques1.creationDate > quest2.creationDate) ? 1 : -1);
        break;
      default:

        break;
    }
  }

  search(search: string) {
    this.questions = this.questionService.questions.filter(ques => ques.name.toLowerCase().includes(search.toLowerCase()));
  }

}
