import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../shared/guards/login-guard.guard';
import { ChartsComponent } from './charts/charts.component';
import { ManagerComponent } from './manager/manager.component';
import { QuestionListComponent } from './manager/question-list/question-list.component';


const routes: Routes = [
  {
    path: 'manager', component: ManagerComponent, children:
      [
        { path: '', redirectTo: 'questions', pathMatch: 'full' },
        { path: 'questions', component: QuestionListComponent },
        { path: 'charts', component: ChartsComponent }
      ],canActivate:[LoginGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
