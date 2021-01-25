import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NewComponent } from './new-edit-question/new-edit-question.component';
import { RouterModule } from '@angular/router';
import { SiteRoutingModule } from './site-routing.module';
import { ChartsComponent } from './charts/charts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { XyChartComponent } from './charts/xy-chart/xy-chart.component';
import { QuestionsService } from './Services/questions.service';



@NgModule({
  declarations: [LoginComponent, ManagerComponent, NewComponent, ChartsComponent, NavbarComponent, QuestionListComponent, PieChartComponent, XyChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule,
    SiteRoutingModule
  ],
  providers:[QuestionsService],
  exports: [ManagerComponent, LoginComponent, NavbarComponent]
})
export class QuestionSiteModule { }
