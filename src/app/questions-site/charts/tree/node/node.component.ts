import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ITreeNode } from 'src/app/shared/models/treenode.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() node: ITreeNode;
  @Output() onChecked: EventEmitter<ITreeNode> = new EventEmitter<ITreeNode>();
  @ViewChild('checkBox') checkBox;

  showChildren: boolean = true;

  ngOnInit(): void {
  }

  onNameClicked() {
    this.onCheckedChange(!this.node.checked);
  }
  onShowChilderns() {
    this.showChildren = !this.showChildren;
  }

  onCheckedChange(value: boolean) {
    if (value)
      this.checkChildrens(this.node);
    else
      this.unCheckChildrens(this.node);
    this.onChecked.emit(this.node);
  }

  checkChildrens(node: ITreeNode) {
    if (node.show) {
      node.checked = true;
      node.indeterminate = false;
      this.checkBox.nativeElement.indeterminate = false;
    }
    if (node.childrens.length > 0) {
      node.childrens.forEach(element => {
        if (node.show)
          this.checkChildrens(element);
      });
    }
  }

  unCheckChildrens(node: ITreeNode) {
    if (node.show) {
      node.checked = false;
      this.checkBox.nativeElement.indeterminate = false;
      node.indeterminate = false;
    }
    if (node.childrens.length > 0) {
      node.childrens.forEach(element => {
        if (node.show)
          this.unCheckChildrens(element);
      });
    }
  }

  onChildChecked(value: ITreeNode) {
    this.markCheckBox();
    this.onChecked.emit(this.node);
  }

  markCheckBox() {
    let checkedCount = 0;
    let showedCount = 0;
    let indeterminateCount = 0;
    for (let index = 0; index < this.node.childrens.length; index++) {
      if (this.node.childrens[index].show) {
        showedCount += 1;
        if (this.node.childrens[index].checked) {
          checkedCount += 1;
        }
        else if (this.node.childrens[index].indeterminate)
          indeterminateCount += 1;
      }
    }
    if (indeterminateCount > 0) {
      this.checkBox.nativeElement.checked = false;
      this.checkBox.nativeElement.indeterminate = true;
      this.node.indeterminate = true;
      this.node.checked = false;
    }
    else if (checkedCount == 0) {
      this.checkBox.nativeElement.checked = false;
      this.checkBox.nativeElement.indeterminate = false;
      this.node.indeterminate = false;
      this.node.checked = false;
    }
    else if (checkedCount < showedCount) {
      this.checkBox.nativeElement.checked = false;
      this.checkBox.nativeElement.indeterminate = true;
      this.node.indeterminate = true;
      this.node.checked = false;
    }
    else {
      this.checkBox.nativeElement.checked = true;
      this.checkBox.nativeElement.indeterminate = false;
      this.node.indeterminate = false;
      this.node.checked = true;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    this.node = changes?.node?.currentValue;
  }
}
