import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { demonstratorRoutes } from "./demonstrator-routes";
import { SharedModule } from "../shared.module";
import { DemonstratorComponent } from './demonstrator/demonstrator.component';
import { HomeComponent } from './home/home.component';
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  declarations: [
    DemonstratorComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(demonstratorRoutes),
    CommonModule,
    SharedModule,
    NzIconModule
  ]
})
export class DemonstratorModule { }
