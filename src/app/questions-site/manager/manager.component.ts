import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/http.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { SetQuestions } from '../manager/question-list/store/question-list.actions'


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(private httpService: HttpService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.httpService.GetAllQuestions().subscribe(data => {
      this.store.dispatch(new SetQuestions(data['questions']));
    })
  }
}
