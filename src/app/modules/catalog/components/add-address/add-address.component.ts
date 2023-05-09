import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AddAnnouncementService } from '../../services/add-announcement.service';
import { IDxFormItems } from 'src/app/models/models';
import { DxFormComponent } from 'devextreme-angular';
import { Utils } from 'src/app/utils/ulits.class';
import { propertyType } from '../../models/property.type';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
  providers: [CommonService],
})
export class AddAddressComponent implements OnInit {
  @Input() set type(value: propertyType) {
    if (value) {
      this.propertyType = value;
      this.initAddressFormItems();
    }
  }
  propertyType!: propertyType;
  @ViewChild('formAddress') formAddress!: DxFormComponent;
  addressFormItems!: IDxFormItems;
  addressFormData: any;

  regionModal: boolean = false;
  cityModal: boolean = false;
  streetModal: boolean = false;

  isFormDisaled: boolean = false;

  name: string = "address";

  constructor(
    private common: CommonService,
    private addAnnService: AddAnnouncementService,
  ) { }

  ngOnInit(): void {
    this.initAddressFormItems();

    this.disableBehavior();
  }

  initAddressFormItems(): void {
    this.addressFormData = {};
    this.addressFormItems = [
      {
        itemType: 'group',
        caption: 'Address',
        items: [
          {
            itemType: 'group',
            colCount: 3,
            items: [
              {
                editorType: 'dxSelectBox',
                dataField: 'region',
                colSpan: 2,
                label: { text: 'Region', visible: false },
                validationRules: [Utils.requiredRule()],
                editorOptions: {
                  dataSource: this.common.createSelectSource("regions"),
                  labelMode: 'floating',
                  maxLength: 60,
                  valueExpr: "id",
                  displayExpr: "name",
                  onSelectionChanged: (e: any): void => {
                    if (e.selectedItem) {
                      this.formAddress.instance.getEditor("city")?.option("dataSource", this.common.createSelectSource(`regions/${e.selectedItem.id}/cities`));
                      this.formAddress.instance.getEditor("city")?.option("disabled", false);
      
                      this.formAddress.instance.getEditor("city")?.option("value", null);
                      this.formAddress.instance.getEditor("street")?.option("value", null);
                    }
                    
                  }
                },
              },
              {
                itemType: 'button',
                colSpan: 1,
                buttonOptions: {
                  icon: "add",
                  type: "default",
                  onClick: (e: any) => {
                    this.regionModal = true;
                  }
                }
              },
            ]
          },
          {
            itemType: 'group',
            colCount: 3,
            items: [
              {
                editorType: 'dxSelectBox',
                dataField: 'city',
                colSpan: 2,
                label: { text: 'City', visible: false },
                validationRules: [Utils.requiredRule()],
                editorOptions: {
                  dataSource: [],
                  labelMode: 'floating',
                  maxLength: 60,
                  valueExpr: "id",
                  displayExpr: "name",
                  disabled: true,
                  onSelectionChanged: (e: any): void => {
                    if (e.selectedItem) {
                      this.formAddress.instance.getEditor("street")?.option("dataSource", this.common.createSelectSource(`regions/${this.addressFormData.region}/cities/${e.selectedItem.id}/streets`));
                      this.formAddress.instance.getEditor("street")?.option("disabled", false);
    
                      this.formAddress.instance.getEditor("street")?.option("value", null);
                    } else {
                      this.formAddress.instance.getEditor("street")?.option("value", null);
                      this.formAddress.instance.getEditor("street")?.option("disabled", true);
                    }
                  }
                },
              },
              {
                itemType: 'button',
                colSpan: 1,
                buttonOptions: {
                  icon: "add",
                  type: "default",
                  onClick: (e: any) => {
                    this.cityModal = true;
                  }
                }
              },
            ]
          },
          {
            itemType: 'group',
            colCount: 3,
            items: [
              {
                editorType: 'dxSelectBox',
                dataField: 'street',
                colSpan: 2,
                label: { text: 'Street', visible: false },
                validationRules: [Utils.requiredRule()],
                editorOptions: {
                  dataSource: [],
                  labelMode: 'floating',
                  maxLength: 60,
                  valueExpr: "id",
                  displayExpr: "name",
                  disabled: true,
                },
              },
              {
                itemType: 'button',
                colSpan: 1,
                buttonOptions: {
                  icon: "add",
                  type: "default",
                  onClick: (e: any) => {
                    this.streetModal = true;
                  }
                }
              },
            ]
          },
          {
            itemType: 'group',
            colCount: 3,
            cssClass: "buttons-panel",
            items: [
              {
                editorType: 'dxNumberBox',
                colSpan: 2,
                dataField: 'houseNumber',
                label: { text: 'House number', visible: false },
                editorOptions: {
                  labelMode: 'floating',
                },
                validationRules: [Utils.requiredRule()],
              },
              {
                itemType: 'button',
                colSpan: 1,
                buttonOptions: {
                  text: "Save address",
                  type: "default",
                  width: "150",
                  onClick: (e: any) => {
                    this.addAddress();
                  }
                }
              },
            ]
          }
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

  addAddress(): void {
    if (this.formAddress.instance.validate().isValid){
      this.addAnnService.streetId.next(this.addressFormData.street);

      const payload = {
        houseNumber: this.addressFormData.houseNumber,
        streetId: this.addressFormData.street,
      }
      this.addAnnService.createAddress(payload)
      .subscribe(
        (address) => {
          console.log(address);
          this.addAnnService.addressId.next(address.id);
          if (this.propertyType === "LAND")
            this.addAnnService.activeForm.next("property");
          else this.addAnnService.activeForm.next("house");
        }
      )
    } 
  }

  closeRegionModal(): void {
    this.regionModal = false;
    this.initAddressFormItems();
  }

  closeCityModal(): void {
    this.cityModal = false;
    this.initAddressFormItems();
  }

  closeStreetModal(): void {
    this.streetModal = false;
    this.initAddressFormItems();
  }
}
