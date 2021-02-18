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

  private _searchValue: string;
  set searchValue(val: string) {
    this._searchValue = val;
    this.onSearch(val);
  }
  get searchValue() {
    return this._searchValue;
  }

  showAll: boolean = true;
  @Input() showAllBox: boolean = false;
  ngOnInit(): void {
  }

  onSearch(searchVal: string) {
    this.treeData.forEach(item => this.searchInChilds(searchVal, item));
  }

  searchInChilds(searchVal: string, node: ITreeNode): number {
    let count = 0;
    node.name.toLowerCase().includes(searchVal.toLowerCase()) ? node.show = true : node.show = false;
    if (node.childrens.length > 0) {
      node.childrens.forEach(item => count += this.searchInChilds(searchVal, item));
      count > 0 ? node.show = true : node.show = false;
    }
    if (node.show) count += 1;
    return count;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.showAllBox) {
      if (changes?.treeData?.currentValue)
        this.treeData = [{ name: 'All', childrens: [...changes?.treeData?.currentValue], show: true }]
    }
    else
      this.treeData = changes?.treeData?.currentValue;
  }


}
