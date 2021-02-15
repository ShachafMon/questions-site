import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IQuestion } from 'src/app/shared/models/question.model';
import { ITreeNode } from 'src/app/shared/models/treenode.model';
import { QuestionsService } from '../Services/questions.service';

@Injectable({
    providedIn: 'root'
})
export class ChartsService implements OnDestroy {
    subs: Subscription[] = [];
    chartdata: any[];
    public chartdataSubj: BehaviorSubject<any[]>;
    public monthQuestionTreeDataSubj: BehaviorSubject<ITreeNode[]>;
    public emptyArraySubj: BehaviorSubject<boolean>;
    hoursCounterDic: { [hour: number]: number } = {};

    treeData: ITreeNode[] = [];

    questions: IQuestion[];
    constructor(private questionService: QuestionsService) {
        this.chartdataSubj = new BehaviorSubject<any[]>(undefined);
        this.monthQuestionTreeDataSubj = new BehaviorSubject<ITreeNode[]>(undefined);
        this.emptyArraySubj = new BehaviorSubject<boolean>(false);
        this.subs.push(this.questionService.questionsSubj.subscribe(data => {
            if (data) {
                this.resetChartData();
                this.questions = data;
                this.logicInfo(this.questions);
            }
        }));
    }

    getByDateRange(dateRange: Date[]) {
        if (dateRange[0] && dateRange[1]) {
            this.resetChartData();
            let tempArr = this.questions.filter(a => new Date(a.creationDate) > dateRange[0] && new Date(a.creationDate) < dateRange[1]);
            if (tempArr.length == 0)
                this.emptyArraySubj.next(true);
            else
                this.logicInfo(tempArr);
        }
        else {
            this.emptyArraySubj.next(false);
            this.resetChartData();
            this.logicInfo(this.questions)
        }
    }

    ngOnDestroy() {
        this.subs.forEach((item) => item.unsubscribe());
    }

    resetChartData() {
        this.hoursCounterDic = {};
        this.chartdata = [{
            "day": "Sunday",
            "count": 0
        }, {
            "day": "Monday",
            "count": 0
        }, {
            "day": "Tuesday",
            "count": 0
        }, {
            "day": "Wednesday",
            "count": 0
        }, {
            "day": "Thursday",
            "count": 0
        }, {
            "day": "Friday",
            "count": 0
        }, {
            "day": "Saturday",
            "count": 0
        }];
    }

    logicInfo(questions: IQuestion[]) {
        questions.forEach(
            ques => {
                if (ques.creationDate && ques.description && ques.id && ques.name) {
                    let currentDate = new Date(ques.creationDate);

                    let month = currentDate.toLocaleString('en-US', { month: 'long' });
                    let data = this.treeData.find(item => item.name == month);
                    if (data) {
                        data.childrens.push({ name: ques.name, checked: false, childrens: [] });
                    }
                    else {
                        this.treeData.push({ name: month, checked: false, childrens: [{ name: ques.name, childrens: [], checked: false }] });
                    }
                    
                    let hour = currentDate.getHours();
                    let dicHour = this.hoursCounterDic[hour];
                    dicHour ? this.hoursCounterDic[hour] = dicHour + 1 : this.hoursCounterDic[hour] = 1;
                    let day = currentDate.getDay()
                    this.chartdata[day][hour] ? this.chartdata[day][hour] += 1 : this.chartdata[day][hour] = 1;
                    this.chartdata[day].count += 1;
                }
            }
        )
        this.chartdataSubj.next(this.chartdata);
        this.monthQuestionTreeDataSubj.next(this.treeData);
    }
}