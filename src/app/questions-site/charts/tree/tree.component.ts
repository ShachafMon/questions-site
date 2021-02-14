import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITreeNode } from 'src/app/shared/models/treenode.model';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() treeData: ITreeNode[];

  ngOnInit(): void {
   
  }
  ngOnChanges(changes: SimpleChanges) {
    debugger;
    this.treeData = changes?.treeData?.currentValue;
  }
}
