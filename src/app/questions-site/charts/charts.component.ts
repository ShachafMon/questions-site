import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  chartsData: any[];
  hoursAdded: number[];
  selectedDate : Date;
  constructor() {
   
  }

  ngOnInit(): void {
   
  }


}
