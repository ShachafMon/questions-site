import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartsService } from './charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  chartsData: any[];
  hoursAdded: number[];
  selectedDate: Date[];
  constructor(private chartsService: ChartsService) {

  }

  ngOnInit(): void {

  }
  dateSelected() {
    this.chartsService.getByDateRange(this.selectedDate);

  }


}
