import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { IDxFormItems } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { Utils } from 'src/app/utils/ulits.class';
import { IAnnouncement } from '../../models/announcement';
import { combineLatest } from 'rxjs';
import { IAnnouncementPayload } from '../../models/announcement-payload.interface';
import { AnnouncementService } from '../../services/announcement.service';
import { DefaultAnnouncementService } from '../../services/announcement-init';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [CommonService, DefaultAnnouncementService]
})
export class DashboardComponent implements OnInit {
  @Input() announcement!: IAnnouncement;
  @Output() onReloadEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild('form') form!: DxFormComponent;
  formItems!: IDxFormItems;
  formData: IAnnouncementPayload = {} as IAnnouncementPayload;

  statuses: string[] = [];
  types: string[] = [];

  constructor(
    private common: CommonService,
    private annService: AnnouncementService,
  ) { }

  ngOnInit(): void {
    combineLatest(
      this.common.getEnum("rent-announcement-statuses"),
      this.common.getEnum("housing-announcement-types")
    )
    .subscribe(
      ([statuses, types]) => {
        this.statuses = statuses;
        this.types = types;
        this.initFormItems()
      }
    )
  }

  initFormItems(): void {
    this.formData = {
      description: this.announcement.description,
      price: this.announcement.price,
      status: this.announcement.status,
      type: this.announcement.type,
    }
    this.formItems = [ 
      {
        itemType: 'group',
        colCount: 5,
        items: [
          {
            colSpan: 1,
            editorType: 'dxTextBox',
            dataField: 'description',
            label: { text: 'Description', visible: false },
            editorOptions: {
              labelMode: 'floating',
              maxLength: 2000,
            },
            validationRules: [Utils.requiredRule()],
          }, 
          {
            editorType: 'dxNumberBox',
            colSpan: 1,
            dataField: 'price',
            label: { text: 'Price', visible: false },
            editorOptions: {
              labelMode: 'floating',
            },
            validationRules: [Utils.requiredRule()],
          },
          {
            editorType: 'dxSelectBox',
            dataField: 'status',
            label: { text: 'Status', visible: false },
            validationRules: [Utils.requiredRule()],
            editorOptions: {
              dataSource: this.statuses,
              labelMode: 'floating',
              maxLength: 60,
            },
          }, 
          {
            editorType: 'dxSelectBox',
            dataField: 'type',
            colSpan: 1,
            label: { text: 'Type', visible: false },
            validationRules: [Utils.requiredRule()],
            editorOptions: {
              dataSource: this.types,
              disabled: this.announcement.propertyType === "LAND" ? true : false,
              labelMode: 'floating',
              maxLength: 60,
            },
          },
          {
            itemType: 'button',
            colSpan: 1,
            buttonOptions: {
              text: "Save",
              type: "default",
              width: "150",
              onClick: (e: any) => {
                this.changeData();
              }
            }
          },
        ]
      }
    ]
  }

  changeData(): void {
    const payload = {
      description: this.formData.description,
      price: this.formData.price,
      propertyId: this.announcement.property.id,
      status: this.formData.status,
      type: this.formData.type
    }
    const isHousing = this.announcement.propertyType !== "LAND";
    const typeUrl = 
      this.announcement.propertyType === "LAND" ? "lands" :
      this.announcement.propertyType === "APARTMENT" ? "apartments" :
      this.announcement.propertyType === "FAMILY_HOUSE" ? "family-houses" : "";
    this.annService.changeCommonAnnouncement(this.announcement.id, payload, isHousing, typeUrl)
    .subscribe(
      (res) => {
        this.onReloadEvent.emit();
      }
    )
  }

}
