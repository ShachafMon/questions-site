import { identifierModuleUrl } from '@angular/compiler';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { QuestionsService } from '../Services/questions.service';

@Injectable({
    providedIn: 'root'
})
export class ChartsService implements OnDestroy {
    subs: Subscription[] = [];
    chartdata : any[];
    public chartdataSubj: BehaviorSubject<any[]>;
    public hoursAdded: number[] = [];
    questions: Question[];
    constructor(private questionService: QuestionsService) {
        console.log('new Charts Serive');
        this.chartdataSubj = new BehaviorSubject<any[]>(undefined);
        this.subs.push(this.questionService.questionsSubj.subscribe(data => {
            if (data) {
                this.resetChartData();
                this.questions = data;
                this.logicInfo();
                this.chartdataSubj.next(this.chartdata);
            }
        }));
    }

    ngOnDestroy() {
        this.subs.forEach((item) => item.unsubscribe());
    }

    resetChartData() {
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

    logicInfo() {
        this.questions.forEach(
            ques => {
                if (ques.creationDate && ques.description && ques.id && ques.name) {
                    let currentDate = new Date(ques.creationDate);
                    let hour = currentDate.getHours();
                    if (!this.hoursAdded.includes(hour))
                        this.hoursAdded.push(hour);
                    let day = currentDate.getDay()
                    this.chartdata[day][hour] ? this.chartdata[day][hour] += 1 : this.chartdata[day][hour] = 1;
                    this.chartdata[day].count += 1;
                }
            }
        )
    }
}