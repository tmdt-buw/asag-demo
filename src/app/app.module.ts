import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { routes } from "./app-routes";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared.module";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { de_DE } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {FooterModule} from "./footer/footer.module";
import {DemonstratorModule} from "./demonstrator/demonstrator.module";

registerLocaleData(de);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {paramsInheritanceStrategy: 'always'}),
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    FooterModule,
    DemonstratorModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: de_DE }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
