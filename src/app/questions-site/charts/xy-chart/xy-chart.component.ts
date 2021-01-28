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
  chartData: any[];
  showPopular: boolean;

  ngOnInit(): void {
    this.subs.push(this.chartService.chartdataSubj.subscribe(data => {
      if (data) {
        this.chartData = data;
        this.makeChart(this.chartData);
      }
    }));
  };

  makeChart(data) {
    am4core.useTheme(am4themes_animated);
    this.chart = am4core.create("xy-chart-div", am4charts.XYChart);
    this.chart.data = data;
    this.createAxes();
    this.createAllSeries(this.chartService.hoursCounterDic);
    this.chart.legend = new am4charts.Legend();
  }

  onPopularChanged() {
    if (this.showPopular) {
      //this.chart.dispose();


    } else {

    }
  }

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

  createAllSeries(hours) {
    for (const [key, value] of Object.entries(hours)) {
      this.createSeries(key, `${key}:00`);
    }
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
    // series.columns.template.tooltipHTML = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
    series.columns.template.tooltipHTML = `
    <div>
      <div>
        <center><strong>{categoryX}</strong></center>
      </div>
      <div class="space-setween">
        <div>
          test
        </div>
        <div>
        {valueY}
        </div>
      </div>
    </div>
    `

    // Add label
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    return series;
  }
}
