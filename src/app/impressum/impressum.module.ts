import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpressumComponent } from './impressum/impressum.component';
import { RouterModule } from '@angular/router';
import { impressumRoutes } from './impressum-routes';
import { SharedModule } from "../shared.module";
import { FooterModule } from "../footer/footer.module";



@NgModule({
  declarations: [
    ImpressumComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(impressumRoutes),
    FooterModule,
    SharedModule
  ]
})
export class ImpressumModule { }

