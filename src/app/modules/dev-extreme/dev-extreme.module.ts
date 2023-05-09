import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxAccordionModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFileUploaderModule, DxFormModule, DxGalleryModule, DxLoadIndicatorModule, DxPopoverModule, DxPopupModule, DxRangeSliderModule, DxSelectBoxModule, DxTabsModule, DxTextBoxModule, DxToolbarModule } from 'devextreme-angular';



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
    DxSelectBoxModule,
    DxToolbarModule,
    DxPopupModule,
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
    DxSelectBoxModule,
    DxToolbarModule,
    DxPopupModule,
  ]
})
export class DevExtremeModule { }
