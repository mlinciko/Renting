import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxAccordionModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFileUploaderModule, DxFormModule, DxGalleryModule, DxLoadIndicatorModule, DxPopoverModule, DxRangeSliderModule, DxTabsModule, DxTextBoxModule } from 'devextreme-angular';



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
    DxLoadIndicatorModule,
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
    DxLoadIndicatorModule,
  ]
})
export class DevExtremeModule { }
