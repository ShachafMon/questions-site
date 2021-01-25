import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ChartsService } from '../charts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-xy-chart',
  templateUrl: './xy-chart.component.html',
  styleUrls: ['./xy-chart.component.css']
})
export class XyChartComponent implements OnInit, OnDestroy {

  constructor(private chartService: ChartsService) {

  }
  private subs: Subscription[] = [];
  chart: am4charts.XYChart;

  ngOnInit(): void {
    this.subs.push(this.chartService.chartdataSubj.subscribe(data => {
      if (data) {
        am4core.useTheme(am4themes_animated);
        this.chart = am4core.create("xy-chart-div", am4charts.XYChart);
        this.chart.data = data;
        this.createAxes();
        this.createAllSeries(this.chartService.hoursAdded);
        this.chart.legend = new am4charts.Legend();
      }
    }));

  };

  ngOnDestroy() {
    this.chart?.dispose();
    this.subs.forEach((item) => item.unsubscribe());
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

  createAllSeries(hoursAdded) {
    hoursAdded.forEach((item) => {
      this.createSeries(item, `${item}:00`);
    })
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
