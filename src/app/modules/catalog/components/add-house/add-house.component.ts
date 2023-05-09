import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { IDxFormItems } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
import { AddAnnouncementService } from '../../services/add-announcement.service';
import { propertyType } from '../../models/property.type';
import { Utils } from 'src/app/utils/ulits.class';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.scss']
})
export class AddHouseComponent implements OnInit {
  @Input() set type(value: propertyType) {
    if (value) {
      this.propertyType = value;
      this.initHouseFormItems();
    }
  }
  propertyType!: propertyType;
  @ViewChild('formHouse') formHouse!: DxFormComponent;
  houseFormItems!: IDxFormItems;
  houseFormData: any;

  houseMaterialModal: boolean = false;
  isFormDisaled: boolean = true;

  name: string = "house";

  constructor(
    private common: CommonService,
    protected addAnnService: AddAnnouncementService,
  ) { }

  ngOnInit(): void {
    this.initHouseFormItems();

    this.disableBehavior();
  }

  initHouseFormItems(): void {
    this.houseFormData = {};
    this.houseFormItems = [
      {
        itemType: 'group',
        caption: 'House',
        items: [
          {
            editorType: 'dxNumberBox',
            colSpan: 2,
            dataField: 'buildingYear',
            label: { text: 'Building year', visible: false },
            editorOptions: {
              labelMode: 'floating',
            },
            validationRules: [Utils.requiredRule()],
          },
          {
            editorType: 'dxCheckBox',
            colSpan: 2,
            dataField: 'elevator',
            label: { text: 'Elevator', visible: true },
            visible: this.propertyType === "APARTMENT",
            editorOptions: {
              labelMode: 'floating',
            },
            validationRules: [Utils.requiredRule()],
          },
          {
            editorType: 'dxCheckBox',
            colSpan: 2,
            dataField: 'swimmingPool',
            label: { text: 'Swimming Pool', visible: true },
            visible: this.propertyType === "FAMILY_HOUSE",
            editorOptions: {
              labelMode: 'floating',
            },
            validationRules: [Utils.requiredRule()],
          },
          {
            itemType: 'group',
            colCount: 3,
            items: [
              {
                editorType: 'dxSelectBox',
                dataField: 'houseMaterialId',
                colSpan: 2,
                label: { text: 'House material', visible: false },
                validationRules: [Utils.requiredRule()],
                editorOptions: {
                  dataSource: this.common.createSelectSource("house-materials"),
                  labelMode: 'floating',
                  maxLength: 60,
                  valueExpr: "id",
                  displayExpr: "name",
                },
              },
              {
                itemType: 'button',
                colSpan: 1,
                buttonOptions: {
                  icon: "add",
                  type: "default",
                  onClick: (e: any) => {
                    this.houseMaterialModal = true;
                  }
                }
              },
            ]
          },
          {
            editorType: 'dxSelectBox',
            dataField: 'housingType',
            colSpan: 2,
            label: { text: 'Housing type', visible: false },
            validationRules: [Utils.requiredRule()],
            editorOptions: {
              dataSource: this.common.createSelectSource("enums/housing-types"),
              labelMode: 'floating',
              maxLength: 60,
            },
          },
          {
            editorType: 'dxNumberBox',
            colSpan: 2,
            dataField: 'numberOfFloors',
            label: { text: 'Number of floors', visible: false },
            editorOptions: {
              labelMode: 'floating',
            },
            validationRules: [Utils.requiredRule()],
          },
          {
            itemType: 'button',
            colSpan: 1,
            buttonOptions: {
              text: "Save house",
              type: "default",
              width: "150",
              onClick: (e: any) => {
                this.addHouse();
              }
            }
          },
        ]
      }
    ]
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

  addHouse(): void {
    if (this.formHouse.instance.validate().isValid) {
      const type = this.propertyType === "APARTMENT" ? "apartment-houses" : "family-houses";
      const payload = {
        ...this.houseFormData,
        addressId: this.addAnnService.addressId.value
      }
      this.addAnnService.createHouse(payload, type)
      .subscribe(
        (house) => {
          console.log(house);
          this.addAnnService.houseId.next(house.id);
          this.addAnnService.activeForm.next("property");
        }
      )
    }
  }

  closeMaterialModal(): void {
    this.houseMaterialModal = false;
    this.initHouseFormItems();
  }

}
