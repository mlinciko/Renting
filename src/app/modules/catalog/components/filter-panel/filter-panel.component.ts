import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import * as _ from 'lodash';
import { IDxFormItems } from 'src/app/models/models';
import { IFilters, defaultFilters } from '../../models/filters.interface';
import { CommonService } from 'src/app/services/common.service';
import { rentTypes } from '../../models/rent-types';
import { AnnouncementRentType } from '../../models/announcement-rent-type';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  providers: [CommonService]
})
export class FilterPanelComponent implements OnInit {
  @ViewChild('form') form!: DxFormComponent;
  formItems!: IDxFormItems;
  formData: IFilters | any = _.cloneDeep(defaultFilters);
  starIcon = faStar;

  constructor(
    private common: CommonService,
    private filters: FilterService,
  ) { }

  ngOnInit(): void {
    this.initFormItems()
  }
 
  initFormItems(): void {
    const typeKeys = Object.keys(rentTypes) as AnnouncementRentType[]
    this.formItems = [
      {
        itemType: "group",
        colCount: 6,
        items: [
          {
            editorType: 'dxSelectBox',
            dataField: 'type',
            colSpan: 1,
            label: { text: 'Type', visible: false },
            editorOptions: {
              dataSource: typeKeys.map((key) => rentTypes[key]),
              labelMode: 'floating',
              maxLength: 60,
              valueExpr: "backendCode",
              displayExpr: "descr",
            },
          },
          {
            editorType: 'dxNumberBox',
            dataField: 'priceFrom',
            label: { text: 'Price from', visible: false },
            editorOptions: {
              labelMode: 'floating',
              onValueChanged: (e: any) => {
                if (e.value) {
                  this.form.instance.getEditor("priceTo")?.option("min", e.value);
                } else this.form.instance.getEditor("priceTo")?.option("min", undefined);
                
              }
            },
          },
          {
            editorType: 'dxNumberBox',
            dataField: 'priceTo',
            label: { text: 'Price to', visible: false },
            editorOptions: {
              labelMode: 'floating',
              onValueChanged: (e: any) => {
                if (e.value) {
                  this.form.instance.getEditor("priceFrom")?.option("max", e.value);
                } else this.form.instance.getEditor("priceFrom")?.option("max", undefined);
              }
            },
          },
          {
            editorType: 'dxSelectBox',
            dataField: 'city',
            colSpan: 2,
            label: { text: 'City', visible: false },
            editorOptions: {
              dataSource: this.common.createSelectSource("cities"),
              labelMode: 'floating',
              maxLength: 60,
              valueExpr: "id",
              displayExpr: "name",
            },
          },
          {
            editorType: 'dxSelectBox',
            dataField: 'rating',
            colSpan: 1,
            label: { text: 'Rating', visible: false },
            editorOptions: {
              dataSource: [1, 2, 3, 4, 5],
              labelMode: 'floating',
              maxLength: 60,
              itemTemplate: "ratingTemplate",
            },
          },
        ]
      },
      {
        itemType: "group",
        colCount: 4,
        cssClass: "buttons-panel",
        items: [
          {
            colSpan: 2,
            editorType: 'dxTextBox',
            dataField: 'search',
            label: { text: 'Serach', visible: false },
            editorOptions: {
              labelMode: 'floating',
              maxLength: 60,
            },
          },
          {
            itemType: 'button',
            colSpan: 1,
            buttonOptions: {
              text: "Reset",
              type: "normal",
              onClick: (e: any) => {
                this.formData = _.cloneDeep(defaultFilters);
                this.filters.currentFilters.next(defaultFilters);
              }
            }
          },
          {
            itemType: 'button',
            colSpan: 1,
            buttonOptions: {
              text: "Apply",
              type: "default",
              onClick: (e: any) => {
                this.submitForm();
              }
            }
          },
        ]
      }
    ]
  }

  submitForm(): void {
    if (this.form.instance.validate().isValid){
      this.filters.currentFilters.next(this.formData);
    } 
  }

}
