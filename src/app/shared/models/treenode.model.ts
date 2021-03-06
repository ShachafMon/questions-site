export interface ITreeNode {
    name: string;
    childrens: ITreeNode[];
    checked?: boolean;
    indeterminate?: boolean;
    show: boolean;
}