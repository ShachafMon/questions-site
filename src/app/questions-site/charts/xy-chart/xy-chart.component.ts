import { Component, OnDestroy, OnInit } from '@angular/core';
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
  showPopular: boolean = false;;
  hoursCounterDic: { [hour: number]: number };
  popularHours: { [hour: string]: number } = { 'others': 0 };

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
    am4core.useTheme(am4themes_animated);
    this.chart = am4core.create("xy-chart-div", am4charts.XYChart);
    this.chart.data = data;
    this.createAxes();
    if (this.showPopular)
      this.createAllSeries(this.popularHours);
    else
      this.createAllSeries(this.hoursCounterDic);
    this.chart.legend = new am4charts.Legend();
  }

  getFivePopular() {
    this.popularHours = { 'others': 0 };
    let tempArr = Object.entries(this.hoursCounterDic).sort((a, b) => b[1] - a[1]).splice(0, 5);
    tempArr.forEach(element => {
      this.popularHours[element[0]] = element[1];
    });
    this.chartData.forEach(item => {
      Object.entries(item).forEach(inner => {
        if (!isNaN(parseInt(inner[0])) && !this.popularHours[inner[0]]) {
          item['others'] ? item['others'] += parseInt(`${inner[1]}`) : item['others'] = parseInt(`${inner[1]}`)
        }
      });
    })
    console.log(this.chartData);
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
    series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
    // series.columns.template.tooltipHTML = `
    // <div>
    //   <div>
    //     <center><strong>{categoryX}</strong></center>
    //   </div>
    //   <div class="space-setween">
    //     <div>
    //       test
    //     </div>
    //     <div>
    //     {valueY}
    //     </div>
    //   </div>
    // </div>
    // `

    // Add label
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    return series;
  }
}
