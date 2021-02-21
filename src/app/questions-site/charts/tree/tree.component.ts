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
      this.markCheckBox(node);
    }
    if (node.show) count += 1;
    return count;
  }

  markCheckBox(node: ITreeNode) {
    let checkedCount = 0;
    let showedCount = 0;
    let indeterminateCount = 0;
    for (let index = 0; index < node.childrens.length; index++) {
      if (node.childrens[index].show) {
        showedCount += 1;
        if (node.childrens[index].checked) {
          checkedCount += 1;
        }
        else if (node.childrens[index].indeterminate)
          indeterminateCount += 1;
      }
    }
    if (indeterminateCount > 0) {
      node.indeterminate = true;
      node.checked = false;
    }
    else if (checkedCount == 0) {
      node.indeterminate = false;
      node.checked = false;
    }
    else if (checkedCount < showedCount) {
      node.indeterminate = true;
      node.checked = false;
    }
    else {
      node.indeterminate = false;
      node.checked = true;
    }
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
