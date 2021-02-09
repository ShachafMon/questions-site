import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor() { }
  @Input() header: string;
  @Input() msg: string;
  @Input() btn1: string;
  @Input() btn2: string;
  @Output() onExitPopup: EventEmitter<undefined> = new EventEmitter<undefined>()
  @Output() onBtn1Clicked: EventEmitter<undefined> = new EventEmitter<undefined>()
  @Output() onBtn2Clicked: EventEmitter<undefined> = new EventEmitter<undefined>()
  ngOnInit(): void {
  }

  exitPopup() {
    this.onExitPopup.emit();
  }
  btn1Clicked() {
    this.onBtn1Clicked.emit();
  }
  btn2Clicked() {
    this.onBtn2Clicked.emit();
  }

}
