import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ChartsService } from './charts.service';
import * as am4core from "@amcharts/amcharts4/core";
import { ITreeNode } from 'src/app/shared/models/treenode.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, OnDestroy {

  chartsData: any[];
  hoursAdded: number[];
  selectedDate: Date[];
  emptyError: boolean;
  subs: Subscription[] = [];

  monthQuestionTree: ITreeNode[];

  constructor(private chartsService: ChartsService) {

  }

  ngOnInit(): void {
    this.subs.push(this.chartsService.emptyArraySubj.subscribe(res => this.emptyError = res));
    this.subs.push(this.chartsService.monthQuestionTreeDataSubj.subscribe(res => this.monthQuestionTree = res));
    am4core.useTheme(am4themes_animated);

  }
  ngOnDestroy() {
    this.subs.forEach(item => item.unsubscribe());
  }
  dateSelected() {
    this.chartsService.getByDateRange(this.selectedDate);
  }
  resetCharts() {
    this.selectedDate = [];
    this.chartsService.getByDateRange(this.selectedDate);
  }
}
