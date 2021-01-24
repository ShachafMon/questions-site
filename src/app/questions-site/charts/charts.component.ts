import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { QuestionListComponent } from '../question-list/question-list.component';
import { ChartsService } from './charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, OnDestroy {

  chartsData: any[];
  hoursAdded: number[];
  private subs: Subscription[] = [];
  constructor(private chartService: ChartsService) {

  }

  ngOnInit(): void {
    this.subs.push(this.chartService.chartdataSubj.subscribe(data => { this.chartsData = data; this.hoursAdded = this.chartService.hoursAdded; }));
  }
  ngOnDestroy() {
    this.subs.forEach((item) => item.unsubscribe());
  }

}
