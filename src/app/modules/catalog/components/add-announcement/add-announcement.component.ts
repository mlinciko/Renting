import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { IDxFormItems } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { Utils } from 'src/app/utils/ulits.class';
import { AddAnnouncementService } from '../../services/add-announcement.service';
import { AnnouncementService } from '../../services/announcement.service';
import { Router } from '@angular/router';
import { DefaultAnnouncementService } from '../../services/announcement-init';
import { AddAddressComponent } from '../add-address/add-address.component';
import { AddHouseComponent } from '../add-house/add-house.component';
import { AddPropertyComponent } from '../add-property/add-property.component';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss'],
  providers: [CommonService, DefaultAnnouncementService],
})
export class AddAnnouncementComponent implements OnInit {
  @ViewChild('address') address!: AddAddressComponent;
  @ViewChild('house') house!: AddHouseComponent;
  @ViewChild('property') property!: AddPropertyComponent;
  
  propertyTypeSource!: DataSource
  propertyType = null;

  @ViewChild('form') form!: DxFormComponent;
  formItems!: IDxFormItems;
  formData: any;
  isFormDisaled: boolean = true;
  types: string[] = [];

  name: string = "announcement";

  constructor(
    private common: CommonService,
    private addAnnService: AddAnnouncementService,
    private announcement: AnnouncementService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.propertyTypeSource = this.common.createSelectSource("enums/property-types");

    
    this.common.getEnum("housing-announcement-types")
    .subscribe(
      (types) => {
        this.types = types;
        this.initFormItems()
      }
    )
    this.initFormItems();
    this.disableBehavior();
  }

  initFormItems(): void {
    if (this.propertyType === "LAND") {
      this.formData = {
        type: "SELL"
      };
    } else {
      this.formData = {};
    }
    this.formItems = [
      {
        itemType: 'group',
        caption: 'Announcement',
        items: [
          {
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
            colSpan: 2,
            dataField: 'price',
            label: { text: 'Price', visible: false },
            editorOptions: {
              labelMode: 'floating',
            },
            validationRules: [Utils.requiredRule()],
          },
          {
            editorType: 'dxSelectBox',
            dataField: 'type',
            colSpan: 2,
            label: { text: 'Type', visible: false },
            validationRules: [Utils.requiredRule()],
            editorOptions: {
              dataSource: this.types,
              disabled: this.propertyType === "LAND" ? true : false,
              labelMode: 'floating',
              maxLength: 60,
            },
          },
          {
            itemType: 'button',
            colSpan: 1,
            buttonOptions: {
              text: "Save announcement",
              type: "default",
              width: "150",
              onClick: (e: any) => {
                this.addAnnouncement();
              }
            }
          },
        ]
      }
    ]
  }

  addAnnouncement(): void {
    if (this.form.instance.validate().isValid) {
      const isHousing = this.propertyType !== "LAND";
      const typeUrl = 
        this.propertyType === "LAND" ? "lands" :
        this.propertyType === "APARTMENT" ? "apartments" :
        this.propertyType === "FAMILY_HOUSE" ? "family-houses" : "";
      const payload = {
        ...this.formData,
        propertyId: this.addAnnService.propertyId.value,
      }
      this.announcement.createCommonAnnouncement(payload, isHousing, typeUrl)
      .subscribe(
        (ann) => {
          this.addAnnService.announcement.next(ann);
          this.addAnnService.activeForm.next("images");
          // this.unsetIds();
          // this.router.navigate([`/announcement/view/${ann.id}/${ann.status}`])
        }
      )
    }
  }

  disableBehavior(): void {
    this.addAnnService.activeForm.subscribe(
      (name) => {
        if (name === this.name) {
          this.isFormDisaled = false;
        } else this.isFormDisaled = true;
      }
    )
  }

  propertyTypeChanged(e: any): void {
    this.addAnnService.unsetIds();
    this.initFormItems();
  }
}
