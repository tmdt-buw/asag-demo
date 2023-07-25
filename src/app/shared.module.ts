import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgOptimizedImage } from "@angular/common";
import {NzDividerModule} from "ng-zorro-antd/divider";

@NgModule({
  imports: [
    NgOptimizedImage
  ],
  exports: [
    FlexLayoutModule,
    NgOptimizedImage,
    NzDividerModule
  ]
})
export class SharedModule {

}
