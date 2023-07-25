import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { demonstratorRoutes } from "./demonstrator-routes";
import { SharedModule } from "../shared.module";
import { DemonstratorComponent } from './demonstrator/demonstrator.component';


@NgModule({
  declarations: [
    DemonstratorComponent
  ],
  imports: [
    RouterModule.forChild(demonstratorRoutes),
    CommonModule,
    SharedModule
  ]
})
export class DemonstratorModule { }
