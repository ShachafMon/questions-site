import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XyChartComponent } from './xy-chart.component';

describe('XyChartComponent', () => {
  let component: XyChartComponent;
  let fixture: ComponentFixture<XyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XyChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
