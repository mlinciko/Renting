import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxAccordionModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFileUploaderModule, DxFormModule, DxGalleryModule, DxPopoverModule, DxRangeSliderModule, DxTabsModule, DxTextBoxModule } from 'devextreme-angular';



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
    DxRangeSliderModule,
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
    DxRangeSliderModule,
  ]
})
export class DevExtremeModule { }
