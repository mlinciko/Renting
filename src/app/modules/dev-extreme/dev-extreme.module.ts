import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxAccordionModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFileUploaderModule, DxFormModule, DxGalleryModule, DxPopoverModule, DxTabsModule, DxTextBoxModule } from 'devextreme-angular';



@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxGalleryModule,
    DxFormModule,
    DxTextBoxModule,
    DxCheckBoxModule,
    DxFileUploaderModule,
    DxPopoverModule,
    DxTabsModule,
    DxAccordionModule,
  ],
  exports: [
    DxDataGridModule,
    DxButtonModule,
    DxGalleryModule,
    DxFormModule,
    DxTextBoxModule,
    DxCheckBoxModule,
    DxFileUploaderModule,
    DxPopoverModule,
    DxTabsModule,
    DxAccordionModule,
  ]
})
export class DevExtremeModule { }
