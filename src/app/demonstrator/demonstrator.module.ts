import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { demonstratorRoutes } from "./demonstrator-routes";
import { SharedModule } from "../shared.module";
import { DemonstratorComponent } from './demonstrator/demonstrator.component';
import {NzRadioModule} from "ng-zorro-antd/radio";
import {FormsModule} from "@angular/forms";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzPopoverModule} from "ng-zorro-antd/popover";


@NgModule({
  declarations: [
    DemonstratorComponent
  ],
  imports: [
    RouterModule.forChild(demonstratorRoutes),
    CommonModule,
    SharedModule,
    NzRadioModule,
    FormsModule,
    NzSpinModule,
    NzButtonModule,
    NzLayoutModule,
    NzImageModule,
    NzPopoverModule
  ]
})
export class DemonstratorModule { }
