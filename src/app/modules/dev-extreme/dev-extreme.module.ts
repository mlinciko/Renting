import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxGalleryModule, DxTextBoxModule } from 'devextreme-angular';



@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxGalleryModule,
    DxFormModule,
    DxTextBoxModule,
  ],
  exports: [
    DxDataGridModule,
    DxButtonModule,
    DxGalleryModule,
    DxFormModule,
    DxTextBoxModule,
  ]
})
export class DevExtremeModule { }
