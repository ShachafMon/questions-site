import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuestionSiteModule } from './questions-site/question-site.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { he_IL } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import he from '@angular/common/locales/he';
import { StoreModule } from '@ngrx/store';
import * as fromApp from '../app/store/app.reducer'
registerLocaleData(he);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(fromApp.appReducer),
    AppRoutingModule,
    QuestionSiteModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
  ],
  providers: [CookieService, { provide: NZ_I18N, useValue: he_IL }],
  bootstrap: [AppComponent]
})
export class AppModule { }
