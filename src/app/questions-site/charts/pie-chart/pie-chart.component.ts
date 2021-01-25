import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ChartsService } from '../charts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnDestroy {

  chart: am4charts.PieChart;
  private subs: Subscription[] = [];

  constructor(private chartService: ChartsService) {
  }

  ngOnInit(): void {
    this.subs.push(this.chartService.chartdataSubj.subscribe(data => {
      if (data) {
        am4core.useTheme(am4themes_animated);
        this.chart = am4core.create("pie-chart-div", am4charts.PieChart);
        this.chart.data = data;
        this.createAllSeries();
        this.chart.legend = new am4charts.Legend();
      }
    }));
  }

  ngOnDestroy() {
    this.chart?.dispose();
    this.subs.forEach((item) => item.unsubscribe());
  }
  createAllSeries() {
    let pieSeries = this.chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "day";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
  }

}
