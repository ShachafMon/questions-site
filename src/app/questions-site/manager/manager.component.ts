import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { NewEditService } from '../new-edit-question/new-edit.service';
import { AuthenticationService } from '../Services/authentication.service';
import { QuestionsService } from '../Services/questions.service';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }
}
