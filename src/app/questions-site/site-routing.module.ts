import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../shared/guards/login-guard.guard';
import { ChartsComponent } from './charts/charts.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { QuestionListComponent } from './manager/question-list/question-list.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent }
  ,
  {
    path: 'manager', component: ManagerComponent, children:
      [
        { path: '', redirectTo: 'questions', pathMatch: 'full' },
        { path: 'questions', component: QuestionListComponent },
        { path: 'charts', component: ChartsComponent },
        { path: '**', redirectTo: 'questions', pathMatch: 'full' }
      ], canActivate: [LoginGuardGuard]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
