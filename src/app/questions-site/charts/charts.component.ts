import { Component, OnDestroy, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { QuestionsService } from '../Services/questions.service';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, OnDestroy{

  constructor(private questionService: QuestionsService) {
    this.questionService.questionsSubj.subscribe(data => {
      this.questions = data;
      this.logicInfo();
      am4core.useTheme(am4themes_animated);
      this.chart = am4core.create("xy-chart-div", am4charts.XYChart);
      this.chart.data = this.chartdata;
      this.createAxes();
      this.createAllSeries();
      this.chart.legend = new am4charts.Legend();
    });
   }

  chart: am4charts.XYChart;
  questions: Question[];

  hoursAdded: Number[] = [];
  chartdata = [{
    "day": "Sunday"
  }, {
    "day": "Monday"
  }, {
    "day": "Tuesday"
  }, {
    "day": "Wednesday"
  }, {
    "day": "Thursday"
  }, {
    "day": "Friday"
  }, {
    "day": "Saturday"
  }];

  ngOnInit(): void {
    this.chart = new am4charts.XYChart();
    this.questionService.GetQuestions();

  }
  ngOnDestroy()
  {
    this.questionService.questionsSubj.unsubscribe();
  }
  createAxes() {
    let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "day";
    categoryAxis.renderer.grid.template.location = 0;


    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;
  }

  createAllSeries() {
    this.hoursAdded = this.hoursAdded.sort();
    this.hoursAdded.forEach((item) => {
      console.log(item);
      this.createSeries(item, `${item}:00`);
    })
  }

  logicInfo() {
    this.questions.forEach(
      ques => {
        let currentDate = new Date(ques.creationDate);
        let hour = currentDate.getHours();
        if (!this.hoursAdded.includes(hour))
          this.hoursAdded.push(hour);
        switch (currentDate.getDay()) {
          case 0:
            this.chartdata[0][hour] ? this.chartdata[0][hour] += 1 : this.chartdata[0][hour] = 1;
            break;
          case 1:
            this.chartdata[1][hour] ? this.chartdata[1][hour] += 1 : this.chartdata[1][hour] = 1;
            break;
          case 2:
            this.chartdata[2][hour] ? this.chartdata[2][hour] += 1 : this.chartdata[2][hour] = 1;
            break;
          case 3:
            this.chartdata[3][hour] ? this.chartdata[3][hour] += 1 : this.chartdata[3][hour] = 1;
            break;
          case 4:
            this.chartdata[4][hour] ? this.chartdata[4][hour] += 1 : this.chartdata[4][hour] = 1;
            break;
          case 5:
            this.chartdata[5][hour] ? this.chartdata[5][hour] += 1 : this.chartdata[5][hour] = 1;
            break;
          case 6:
            this.chartdata[6][hour] ? this.chartdata[6][hour] += 1 : this.chartdata[6][hour] = 1;
            break;
          default:
            break;
        }
      }
    )
  }


  createSeries(field, name) {
    // Set up series
    let series = this.chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "day";
    series.sequencedInterpolation = true;

    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

    // Add label
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    return series;
  }
}
