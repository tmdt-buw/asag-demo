import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import {SharedModule} from "../shared.module";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
