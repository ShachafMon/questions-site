import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITreeNode } from 'src/app/shared/models/treenode.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  constructor() { }
  @Input() node: ITreeNode;
  @Output() onChecked: EventEmitter<boolean> = new EventEmitter<boolean>();
  showChildren: boolean = true;

  ngOnInit(): void {
  }

  onShowChilderns() {
    this.showChildren = !this.showChildren;
  }

  onCheckedChange(value: boolean) {
    if (value)
      this.checkChildrens(this.node);
    else
      this.unCheckChildrens(this.node);
    this.onChecked.emit(value);
  }

  checkChildrens(node: ITreeNode) {
    if (node.childrens.length > 0) {
      node.childrens.forEach(element => {
        this.checkChildrens(element);
      });
    }
    node.checked = true;
  }

  unCheckChildrens(node: ITreeNode) {
    if (node.childrens.length > 0) {
      node.childrens.forEach(element => {
        this.unCheckChildrens(element);
      });
    }
    node.checked = false;

  }
  onChildChecked(value: boolean) {
    if (value) {
      if (this.isAllChildrensChecked()) {
        this.node.checked = true;
      } else {
        this.node.checked = false;
      }
    }
    else {
      this.node.checked = false;
    }
    this.onChecked.emit(value);
  }

  isAllChildrensChecked(): boolean {
    let res = true;
    for (let index = 0; index < this.node.childrens.length; index++) {
      if (!this.node.childrens[index].checked) {
        res = false;
        break;
      }
    }
    return res;
  }

}
