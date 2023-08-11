import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgOptimizedImage } from "@angular/common";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { FormsModule } from "@angular/forms";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzPopoverModule } from "ng-zorro-antd/popover";
import { NzModalModule } from "ng-zorro-antd/modal";

@NgModule({
  imports: [
    NgOptimizedImage
  ],
  exports: [
    FlexLayoutModule,
    NgOptimizedImage,
    NzDividerModule,
    NzRadioModule,
    FormsModule,
    NzSpinModule,
    NzButtonModule,
    NzLayoutModule,
    NzImageModule,
    NzPopoverModule,
    NzModalModule
  ]
})
export class SharedModule {

}
