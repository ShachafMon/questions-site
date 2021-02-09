import { Component, OnDestroy, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
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
  showPopular: boolean = false;;
  hoursCounterDic: { [hour: number]: number };
  popularHours: { [hour: string]: number } = {};

  ngOnInit(): void {
    this.subs.push(this.chartService.chartdataSubj.subscribe(data => {
      if (data) {
        this.chartData = data;
        this.hoursCounterDic = this.chartService.hoursCounterDic;
        if (this.chart)
          this.chart.dispose();
        this.getFivePopular();
        this.makeChart(data);
      }
    }));
  };

  makeChart(data) {
    if (this.chart)
      this.chart.dispose();
    this.chart = am4core.create("xy-chart-div", am4charts.XYChart);
    this.chart.data = data;
    this.createAxes();
    if (this.showPopular)
      this.createAllSeries(this.popularHours);
    else
      this.createAllSeries(this.hoursCounterDic);
    this.chart.legend = new am4charts.Legend();
  }

  //Define hoursCounterDic as sorter key,value[], slice top 5, return [] into a dictionary, check if "hour" is a real hour and add value to "others" hour
  getFivePopular() {
    Object.entries(this.hoursCounterDic).length > 5 ? this.popularHours = { 'others': 0 } : this.popularHours = {};
    let tempArr = Object.entries(this.hoursCounterDic).sort((a, b) => b[1] - a[1]).slice(0, 5);
    tempArr.forEach(element => {
      this.popularHours[element[0]] = element[1];
    });
    this.chartData.forEach(chartDataItem => {
      Object.entries(chartDataItem).forEach(inner => {
        if (!isNaN(parseInt(inner[0])) && !this.popularHours[inner[0]]) {
          chartDataItem['others'] ? chartDataItem['others'] += parseInt(`${inner[1]}`) : chartDataItem['others'] = parseInt(`${inner[1]}`)
        }
      });
    })
  }

  onPopularChanged() {
    if (this.popularHours)
      this.makeChart(this.chartData);
    else
      this.showPopular = !this.showPopular;
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
      this.createSeries(key, key);
    }
  }

  createSeries(field, name) {
    // Set up series
    let series = this.chart.series.push(new am4charts.ColumnSeries());
    if (name == 'others') {
      series.name = name;
    } else
      series.name = `${name}:00`;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "day";
    series.sequencedInterpolation = true;


    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    //series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
    series.columns.template.tooltipHTML = `
    <div id="tooltip-item">
      <div class="center">
        {categoryX}
      </div>
      <div class="flex space-between">
        <div>
          {name}
        </div>
        <div>
        {valueY} Questions
        </div>
      </div>
    </div>
    `
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color('#ffffff');

    // Add label
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    return series;
  }
}
