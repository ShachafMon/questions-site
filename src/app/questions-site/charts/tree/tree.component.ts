import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FADE_CLASS_NAME_MAP } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { ITreeNode } from 'src/app/shared/models/treenode.model';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, OnChanges {
  showedTreeData: ITreeNode[];
  private _treeData: ITreeNode[];
  constructor() { }

  @Input()
  set treeData(val: ITreeNode[]) {
    if (val) {
      this._treeData = val;
      this.showedTreeData = [...val];
    }
  }
  get treeData(): ITreeNode[] {
    return this._treeData;
  }

  ngOnInit(): void {
  }

  resetShowed() {
    this.showedTreeData = [];
    this.showedTreeData = [...this.treeData];
  }
  onSearch(searchVal: string) {
    console.log(this.treeData);
    console.log(this.showedTreeData);

    this.showedTreeData.forEach(element => {
      this.filterNode(searchVal, element);
    });
    this.showedTreeData = this.showedTreeData.filter(item => item.childrens.length > 0);
  }

  filterNode(searchVal: string, currentNode: ITreeNode) {
    if (currentNode.childrens.length > 0) {
      currentNode.childrens.forEach(element => {
        if (element.childrens.length > 0)
          this.filterNode(searchVal, element)
      });
      currentNode.childrens = currentNode.childrens.filter(item => item.name.toLowerCase().includes(searchVal.toLowerCase()));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.treeData = changes?.treeData?.currentValue;
  }
}
